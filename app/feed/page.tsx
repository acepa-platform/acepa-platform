"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Profile = {
  full_name: string;
  avatar_url: string;
};

type FeedPost = {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar_url: string | null;
  post_type: "update" | "opportunity_insight" | "business_update";
  content: string;
  created_at: string;
};

type FeedComment = {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  author_avatar_url: string | null;
  content: string;
  created_at: string;
};

const filters = [
  ["all", "For You"],
  ["opportunity_insight", "Opportunity Insights"],
  ["business_update", "Business Updates"],
] as const;

function initials(name: string) {
  return (name || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function timeAgo(value: string) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return seconds + "s";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h";
  const days = Math.floor(hours / 24);
  if (days < 7) return days + "d";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function FeedPage() {
  const [profile, setProfile] = useState<Profile>({ full_name: "", avatar_url: "" });
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [openComments, setOpenComments] = useState<Set<string>>(new Set());
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const [message, setMessage] = useState("");
  const [demoLiked, setDemoLiked] = useState(false);
  const [demoLikeCount, setDemoLikeCount] = useState(24);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/sign-in?next=/feed";
      return;
    }

    setUserId(user.id);
    setEmail(user.email ?? "");

    const [{ data: profileData, error: profileError }, { data: postData, error: postError }] = await Promise.all([
      supabase.from("profiles").select("full_name,avatar_url").eq("id", user.id).maybeSingle(),
      supabase
        .from("feed_posts")
        .select("id,author_id,author_name,author_avatar_url,post_type,content,created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    if (profileError || postError) {
      setMessage(profileError?.message ?? postError?.message ?? "Unable to load your feed.");
      setLoading(false);
      return;
    }

    setProfile({
      full_name: profileData?.full_name ?? "",
      avatar_url: profileData?.avatar_url ?? "",
    });
    setPosts((postData ?? []) as FeedPost[]);

    const postIds = (postData ?? []).map((post) => post.id);
    if (postIds.length > 0) {
      const [{ data: likeData, error: likeError }, { data: commentData, error: commentError }] = await Promise.all([
        supabase.from("feed_likes").select("post_id,user_id").in("post_id", postIds),
        supabase
          .from("feed_comments")
          .select("id,post_id,author_id,author_name,author_avatar_url,content,created_at")
          .in("post_id", postIds)
          .order("created_at", { ascending: true }),
      ]);

      if (likeError || commentError) {
        setMessage(likeError?.message ?? commentError?.message ?? "Some Feed interactions could not be loaded.");
      }

      const nextLikeCounts: Record<string, number> = {};
      const nextLiked = new Set<string>();
      for (const like of likeData ?? []) {
        nextLikeCounts[like.post_id] = (nextLikeCounts[like.post_id] ?? 0) + 1;
        if (like.user_id === user.id) nextLiked.add(like.post_id);
      }

      const nextCommentCounts: Record<string, number> = {};
      for (const comment of commentData ?? []) {
        nextCommentCounts[comment.post_id] = (nextCommentCounts[comment.post_id] ?? 0) + 1;
      }

      setLikeCounts(nextLikeCounts);
      setLikedPostIds(nextLiked);
      setComments((commentData ?? []) as FeedComment[]);
      setCommentCounts(nextCommentCounts);
    } else {
      setLikeCounts({});
      setLikedPostIds(new Set());
      setComments([]);
      setCommentCounts({});
    }

    setLoading(false);
  }

  async function toggleLike(post: FeedPost) {
    if (!userId || actionId) return;

    setActionId(post.id);
    setMessage("");
    const supabase = createClient();
    const liked = likedPostIds.has(post.id);

    const result = liked
      ? await supabase.from("feed_likes").delete().eq("post_id", post.id).eq("user_id", userId)
      : await supabase.from("feed_likes").insert({ post_id: post.id, user_id: userId });

    if (result.error) {
      setMessage(result.error.message);
      setActionId("");
      return;
    }

    setLikedPostIds((current) => {
      const next = new Set(current);
      if (liked) next.delete(post.id);
      else next.add(post.id);
      return next;
    });

    setLikeCounts((current) => ({
      ...current,
      [post.id]: Math.max(0, (current[post.id] ?? 0) + (liked ? -1 : 1)),
    }));

    setActionId("");
  }

  async function sharePost(postId: string) {
    setMessage("");
    const url = window.location.origin + "/feed/" + postId;
    const title = "ACEPA Feed";
    const text = "Take a look at this company update on ACEPA.";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Post link copied to your clipboard.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Unable to share this post right now.");
    }
  }

  async function addComment(post: FeedPost) {
    const content = (commentDrafts[post.id] ?? "").trim();
    if (!content || !userId || actionId) return;

    setActionId(post.id);
    setMessage("");
    const supabase = createClient();
    const authorName = profile.full_name || email.split("@")[0] || "ACEPA Member";

    const { data, error } = await supabase
      .from("feed_comments")
      .insert({
        post_id: post.id,
        author_id: userId,
        author_name: authorName,
        author_avatar_url: profile.avatar_url || null,
        content,
      })
      .select("id,post_id,author_id,author_name,author_avatar_url,content,created_at")
      .single();

    if (error) {
      setMessage(error.message);
      setActionId("");
      return;
    }

    setComments((current) => [...current, data as FeedComment]);
    setCommentCounts((current) => ({ ...current, [post.id]: (current[post.id] ?? 0) + 1 }));
    setCommentDrafts((current) => ({ ...current, [post.id]: "" }));
    setOpenComments((current) => new Set(current).add(post.id));
    setActionId("");
  }

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      if (filter === "opportunity_insight") return post.post_type === "opportunity_insight";
      if (filter === "business_update") return post.post_type === "business_update";
      return true;
    });
  }, [posts, filter]);

  const currentName = profile.full_name || email.split("@")[0] || "ACEPA Member";
  const showDemoPost = posts.length === 0 && filter === "all";

  return (
    <UserAccountShell>
      <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-950">
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute right-[-90px] top-10 h-80 w-80 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-200/20 blur-3xl" />
        </div>
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-semibold text-slate-400">ACEPA COMMUNITY</p>
              <p className="mt-1 text-sm font-bold">Feed</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1180px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_310px]">
            <section>
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">PEOPLE • OPPORTUNITIES • PROGRESS</p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-4xl">What companies are sharing on ACEPA</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Follow company updates, opportunity insights and business progress. You can like and comment on company posts.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {filters.map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={"rounded-full px-4 py-2 text-xs font-bold transition " + (filter === value ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {message && (
                <div className="mt-4 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-800">
                  {message}
                </div>
              )}

              {loading ? (
                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                  Loading your feed...
                </div>
              ) : showDemoPost ? (
                <div className="mt-5 space-y-4">
                  <article className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
                    <div
                      onClick={() => {
                        window.location.href = "/feed/demo";
                      }}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          window.location.href = "/feed/demo";
                        }
                      }}
                      className="grid cursor-pointer lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                    >
                      <div className="relative min-h-[210px] overflow-hidden bg-slate-950 p-4 sm:min-h-[235px]">
                        <div className="relative flex h-full min-h-[178px] flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950 p-5 sm:min-h-[203px]">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/75">Opportunity visual</span>
                            <span className="rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-[9px] font-black tracking-[0.14em] text-white/70">ACEPA</span>
                          </div>
                          <div>
                            <p className="max-w-sm text-2xl font-black tracking-[-0.045em] text-white">Build visibility. Discover opportunity. Make progress.</p>
                            <p className="mt-2 text-xs leading-5 text-white/60">Company image or video preview</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex min-h-[210px] flex-col p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">NV</div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-black">Nexa Ventures</p>
                              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">Verified company</span>
                            </div>
                            <p className="mt-1 text-[11px] text-slate-400">Opportunity Insight · Demo</p>
                          </div>
                        </div>

                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">A polished company post can lead with the visual while keeping the Feed compact. Click to open the full post page with the complete story, company details and discussion.</p>

                        <p className="mt-3 text-xs font-bold text-purple-700">View full post →</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">
                      <button
                        onClick={() => {
                          setDemoLiked((current) => !current);
                          setDemoLikeCount((current) => current + (demoLiked ? -1 : 1));
                        }}
                        className={"rounded-xl px-3 py-2 text-xs font-bold transition " + (demoLiked ? "bg-purple-50 text-purple-700" : "bg-slate-50 text-slate-500 hover:bg-slate-100")}
                      >
                        {demoLiked ? "♥ Liked" : "♡ Like"} · {demoLikeCount}
                      </button>

                      <button
                        onClick={() => {
                          window.location.href = "/feed/demo#discussion";
                        }}
                        className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
                      >
                        ◌ Comment · 6
                      </button>

                      <button
                        onClick={() => sharePost("demo")}
                        className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
                      >
                        ↗ Share
                      </button>
                    </div>
                  </article>

                  <div className="rounded-3xl border border-dashed border-slate-300 bg-white/85 p-7 text-center backdrop-blur">
                    <p className="text-sm font-black">No live company posts yet.</p>
                    <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-500">This demo is only a visual preview. Real company posts will appear here when companies publish them.</p>
                  </div>
                </div>
              ) : visiblePosts.length === 0 ? (
                <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-lg">✦</div>
                  <p className="mt-4 text-sm font-black">No company posts in this category yet.</p>
                  <p className="mt-2 mx-auto max-w-md text-sm leading-6 text-slate-500">
                    Company profiles will publish updates, opportunity insights and business progress here.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-5">
                  {visiblePosts.map((post) => {
                    const postComments = comments.filter((comment) => comment.post_id === post.id);
                    const liked = likedPostIds.has(post.id);

                    return (
                      <article id={"post-" + post.id} key={post.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                          <a href={"/feed/" + post.id} className="relative min-h-[210px] overflow-hidden bg-slate-950 p-4 sm:min-h-[235px]">
                            <div className="flex h-full min-h-[178px] flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950 p-5 sm:min-h-[203px]">
                              <div className="flex items-center justify-between">
                                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/75">{post.post_type === "opportunity_insight" ? "Opportunity insight" : post.post_type === "business_update" ? "Business update" : "Company update"}</span>
                                <span className="rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-[9px] font-black tracking-[0.14em] text-white/70">ACEPA</span>
                              </div>
                              <div>
                                <p className="max-w-sm text-2xl font-black tracking-[-0.04em] text-white">Company media</p>
                                <p className="mt-2 text-[11px] leading-5 text-white/60">Actual company image or video will appear here when media is connected.</p>
                              </div>
                            </div>
                          </a>

                          <div className="flex min-h-[210px] flex-col p-5 sm:p-6">
                            <a href={"/feed/" + post.id} className="group">
                              <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-black text-white">
                                  {post.author_avatar_url ? <img src={post.author_avatar_url} alt="" className="h-full w-full object-cover" /> : initials(post.author_name)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-black group-hover:text-purple-700">{post.author_name}</p>
                                  <p className="mt-1 text-[11px] text-slate-400">
                                    {post.post_type === "opportunity_insight" ? "Opportunity Insight" : post.post_type === "business_update" ? "Business Update" : "General Update"} · {timeAgo(post.created_at)}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">{post.content}</p>
                              <p className="mt-3 text-xs font-bold text-purple-700">View full post →</p>
                            </a>

                            <div className="mt-auto pt-4">
                              <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                                <button
                                  onClick={() => toggleLike(post)}
                                  disabled={actionId === post.id}
                                  className={"rounded-xl px-2.5 py-2 text-xs font-bold transition " + (liked ? "bg-purple-50 text-purple-700" : "text-slate-500 hover:bg-slate-50")}
                                >
                                  {liked ? "♥ Liked" : "♡ Like"} · {likeCounts[post.id] ?? 0}
                                </button>

                                <button
                                  onClick={() => setOpenComments((current) => {
                                    const next = new Set(current);
                                    if (next.has(post.id)) next.delete(post.id);
                                    else next.add(post.id);
                                    return next;
                                  })}
                                  className="rounded-xl px-2.5 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
                                >
                                  ◌ Comment · {commentCounts[post.id] ?? 0}
                                </button>

                                <button onClick={() => sharePost(post.id)} className="rounded-xl px-2.5 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50">
                                  ↗ Share
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {openComments.has(post.id) && (
                          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                            <div className="space-y-4">
                              {postComments.length === 0 ? (
                                <p className="text-xs text-slate-400">No comments yet. Start the conversation.</p>
                              ) : (
                                postComments.map((comment) => (
                                  <div key={comment.id} className="flex gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[10px] font-black text-slate-700 shadow-sm">
                                      {comment.author_avatar_url ? (
                                        <img src={comment.author_avatar_url} alt="" className="h-full w-full object-cover" />
                                      ) : (
                                        initials(comment.author_name)
                                      )}
                                    </div>
                                    <div className="min-w-0 rounded-2xl bg-white px-4 py-3">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-xs font-black">{comment.author_name}</p>
                                        <span className="text-[10px] text-slate-400">{timeAgo(comment.created_at)}</span>
                                      </div>
                                      <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600">{comment.content}</p>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>

                            <div className="mt-4 flex gap-2">
                              <input
                                value={commentDrafts[post.id] ?? ""}
                                onChange={(event) =>
                                  setCommentDrafts((current) => ({
                                    ...current,
                                    [post.id]: event.target.value,
                                  }))
                                }
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" && !event.shiftKey) {
                                    event.preventDefault();
                                    addComment(post);
                                  }
                                }}
                                maxLength={2000}
                                placeholder="Write a comment..."
                                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-purple-500"
                              />
                              <button
                                onClick={() => addComment(post)}
                                disabled={actionId === post.id}
                                className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700 disabled:opacity-50"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">COMPANY FEED</p>
                <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">Company updates, in one place.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Companies publish to Feed. Members can like and comment on company posts while participation in opportunities stays inside the relevant activity.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">YOUR PROFILE</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-xs font-black text-white">
                    {profile.avatar_url ? <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" /> : initials(currentName)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black">{currentName}</p>
                    <p className="truncate text-xs text-slate-500">{email}</p>
                  </div>
                </div>
                <a href="/profile" className="mt-4 inline-flex rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">
                  View Profile →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </UserAccountShell>
  );
}
