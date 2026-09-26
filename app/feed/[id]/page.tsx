"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

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
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function postTypeLabel(postType: FeedPost["post_type"]) {
  if (postType === "opportunity_insight") return "Opportunity Insight";
  if (postType === "business_update") return "Business Update";
  return "General Update";
}

export default function FeedPostDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<FeedPost | null>(null);
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("ACEPA Member");
  const [userAvatar, setUserAvatar] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [commentDraft, setCommentDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isDemo = id === "demo";

  useEffect(() => {
    loadPost();
  }, [id]);

  async function loadPost() {
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/sign-in?next=/feed/" + id;
      return;
    }

    setUserId(user.id);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name,avatar_url")
      .eq("id", user.id)
      .maybeSingle();

    setUserName(profileData?.full_name || user.email?.split("@")[0] || "ACEPA Member");
    setUserAvatar(profileData?.avatar_url || "");

    if (isDemo) {
      setPost({
        id: "demo",
        author_id: "demo-company",
        author_name: "Nexa Ventures",
        author_avatar_url: null,
        post_type: "opportunity_insight",
        content:
          "A polished company post can lead with the visual while the full page gives members the complete story. On ACEPA, the Feed is the discovery layer; this page is where the member gets the deeper context before taking the next step.",
        created_at: new Date().toISOString(),
      });
      setLikeCount(24);
      setComments([
        {
          id: "demo-comment-1",
          post_id: "demo",
          author_id: "demo-member-1",
          author_name: "Jordan Okafor",
          author_avatar_url: null,
          content: "The full-page layout makes the company information much easier to understand.",
          created_at: new Date(Date.now() - 36 * 60 * 1000).toISOString(),
        },
        {
          id: "demo-comment-2",
          post_id: "demo",
          author_id: "demo-member-2",
          author_name: "Amara Nwosu",
          author_avatar_url: null,
          content: "This is the kind of detail page I would expect after opening a Feed post.",
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
      ]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("feed_posts")
      .select("id,author_id,author_name,author_avatar_url,post_type,content,created_at")
      .eq("id", id)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      setMessage(error?.message ?? "This post could not be found.");
      setLoading(false);
      return;
    }

    setPost(data as FeedPost);

    const [{ data: likeData, error: likeError }, { data: commentData, error: commentError }] = await Promise.all([
      supabase.from("feed_likes").select("user_id").eq("post_id", id),
      supabase
        .from("feed_comments")
        .select("id,post_id,author_id,author_name,author_avatar_url,content,created_at")
        .eq("post_id", id)
        .order("created_at", { ascending: true }),
    ]);

    if (likeError || commentError) {
      setMessage(likeError?.message ?? commentError?.message ?? "Some post interactions could not be loaded.");
    }

    setLikeCount((likeData ?? []).length);
    setLiked((likeData ?? []).some((like) => like.user_id === user.id));
    setComments((commentData ?? []) as FeedComment[]);
    setLoading(false);
  }

  async function toggleLike() {
    if (!post || actionLoading) return;

    if (isDemo) {
      setLiked((current) => !current);
      setLikeCount((current) => current + (liked ? -1 : 1));
      return;
    }

    setActionLoading(true);
    setMessage("");

    const supabase = createClient();
    const result = liked
      ? await supabase.from("feed_likes").delete().eq("post_id", post.id).eq("user_id", userId)
      : await supabase.from("feed_likes").insert({ post_id: post.id, user_id: userId });

    if (result.error) {
      setMessage(result.error.message);
      setActionLoading(false);
      return;
    }

    setLiked(!liked);
    setLikeCount((current) => Math.max(0, current + (liked ? -1 : 1)));
    setActionLoading(false);
  }

  async function addComment() {
    const content = commentDraft.trim();
    if (!post || !content || actionLoading) return;

    if (isDemo) {
      setComments((current) => [
        ...current,
        {
          id: "demo-comment-" + Date.now(),
          post_id: "demo",
          author_id: userId,
          author_name: userName,
          author_avatar_url: userAvatar || null,
          content,
          created_at: new Date().toISOString(),
        },
      ]);
      setCommentDraft("");
      setMessage("Demo comment added — this is only a preview.");
      return;
    }

    setActionLoading(true);
    setMessage("");

    const supabase = createClient();
    const { data, error } = await supabase
      .from("feed_comments")
      .insert({
        post_id: post.id,
        author_id: userId,
        author_name: userName,
        author_avatar_url: userAvatar || null,
        content,
      })
      .select("id,post_id,author_id,author_name,author_avatar_url,content,created_at")
      .single();

    if (error) {
      setMessage(error.message);
      setActionLoading(false);
      return;
    }

    setComments((current) => [...current, data as FeedComment]);
    setCommentDraft("");
    setActionLoading(false);
  }

  async function sharePost() {
    setMessage("");
    const url = window.location.origin + "/feed/" + id;

    try {
      if (navigator.share) {
        await navigator.share({
          title: post ? post.author_name + " on ACEPA" : "ACEPA Feed",
          text: "Take a look at this company update on ACEPA.",
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Post link copied to your clipboard.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Unable to share this post right now.");
    }
  }

  const commentsCount = useMemo(() => comments.length, [comments]);

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <button
                onClick={() => router.push("/feed")}
                className="text-xs font-bold text-slate-500 transition hover:text-purple-700"
              >
                ← Back to Feed
              </button>
              <p className="mt-1 text-sm font-black">Post Details</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[900px] px-4 py-6 sm:px-6 lg:py-9">
          {message && (
            <div className="mb-5 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-800">
              {message}
            </div>
          )}

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              Loading post...
            </div>
          ) : !post ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-sm font-black">Post unavailable.</p>
              <button
                onClick={() => router.push("/feed")}
                className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700"
              >
                Return to Feed
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="relative min-h-[340px] overflow-hidden bg-slate-950 sm:min-h-[470px]">
                  <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
                  <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
                  <div className="relative flex h-full min-h-[340px] flex-col justify-between bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950 p-6 sm:min-h-[470px] sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                        {postTypeLabel(post.post_type)}
                      </span>
                      <span className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black tracking-[0.14em] text-white/70 backdrop-blur">
                        ACEPA
                      </span>
                    </div>

                    <div className="max-w-3xl">
                      <div className="mb-5 grid h-20 w-20 place-items-center rounded-[24px] border border-white/15 bg-white/10 text-3xl font-black text-white shadow-2xl backdrop-blur sm:h-24 sm:w-24 sm:text-4xl">
                        ✦
                      </div>
                      <p className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                        {isDemo ? "Build visibility. Discover opportunity. Make progress." : "Company media"}
                      </p>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                        {isDemo
                          ? "A company can combine a strong visual with a focused message, then direct members to the complete post details."
                          : "Actual company image or video will appear here when post media is connected."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      <span>{isDemo ? "Demo image" : "Image / Video"}</span>
                      <span>•</span>
                      <span>Company media</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black text-white shadow-sm">
                      {post.author_avatar_url ? (
                        <img src={post.author_avatar_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        initials(post.author_name)
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-black">{post.author_name}</p>
                        {isDemo && (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                            Verified company
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {postTypeLabel(post.post_type)} · {isDemo ? "Demo preview" : timeAgo(post.created_at)}
                      </p>
                    </div>

                    <button
                      onClick={sharePost}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-purple-200 hover:text-purple-700"
                    >
                      ↗ Share
                    </button>
                  </div>

                  <div className="mt-7 border-t border-slate-100 pt-7">
                    <p className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                      {isDemo
                        ? "A polished company post can lead with the visual while the full page gives members the deeper context."
                        : post.content.split("\n")[0]}
                    </p>
                    <p className="mt-5 whitespace-pre-wrap text-sm leading-8 text-slate-700">{post.content}</p>
                  </div>

                  <div className="mt-7 rounded-3xl bg-slate-50 p-5 sm:p-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Company details</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400">Company</p>
                        <p className="mt-1 text-sm font-black text-slate-800">{post.author_name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400">Post category</p>
                        <p className="mt-1 text-sm font-black text-slate-800">{postTypeLabel(post.post_type)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400">Company profile</p>
                        <p className="mt-1 text-sm font-bold text-purple-700">{isDemo ? "View company profile →" : "Company profile connection coming next"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400">Opportunity</p>
                        <p className="mt-1 text-sm font-bold text-purple-700">{isDemo ? "Open opportunity details →" : "Linked opportunity details will appear here"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
                    <button
                      onClick={toggleLike}
                      disabled={actionLoading}
                      className={"rounded-xl px-3 py-2 text-xs font-bold transition " + (liked ? "bg-purple-50 text-purple-700" : "bg-slate-50 text-slate-500 hover:bg-slate-100")}
                    >
                      {liked ? "♥ Liked" : "♡ Like"} · {likeCount}
                    </button>
                    <button
                      onClick={() => document.getElementById("discussion")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
                    >
                      ◌ Comment · {commentsCount}
                    </button>
                    <button
                      onClick={sharePost}
                      className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
                    >
                      ↗ Share
                    </button>
                  </div>
                </div>
              </article>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Discussion</p>
                    <h2 className="mt-1 text-xl font-black tracking-[-0.03em]">What members are saying</h2>
                  </div>
                  <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500">{commentsCount} comments</span>
                </div>

                <div className="mt-6 space-y-4">
                  {comments.length === 0 ? (
                    <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No comments yet. Start the conversation.</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-[10px] font-black text-white">
                          {comment.author_avatar_url ? (
                            <img src={comment.author_avatar_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            initials(comment.author_name)
                          )}
                        </div>
                        <div className="min-w-0 rounded-2xl bg-slate-50 px-4 py-3.5">
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

                <div className="mt-6 flex gap-2">
                  <input
                    value={commentDraft}
                    onChange={(event) => setCommentDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        addComment();
                      }
                    }}
                    maxLength={2000}
                    placeholder="Write a comment..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={addComment}
                    disabled={actionLoading}
                    className="rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white hover:bg-purple-700 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </section>

              <div className="rounded-3xl border border-purple-100 bg-purple-50/70 p-5 text-sm leading-7 text-purple-900">
                <p className="font-black">What this page is for</p>
                <p className="mt-2">
                  The Feed stays compact for discovery. This page is the deeper view where members can read the complete post, inspect company context, share it and join the discussion.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
