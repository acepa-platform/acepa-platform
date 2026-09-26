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

      return next;
    });
    setCommentCounts((current) => {
      const next = { ...current };
      delete next[post.id];
      return next;
    });
    setOpenComments((current) => {
      const next = new Set(current);
      next.delete(post.id);
      return next;
    });
    setMessage("Post deleted.");
    setActionId("");
  }

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => {
      if (filter === "opportunity_insight") return post.post_type === "opportunity_insight";
      if (filter === "business_update") return post.post_type === "business_update";
      return true;
    });
  }, [posts, filter, userId]);

  const currentName = profile.full_name || email.split("@")[0] || "ACEPA Member";

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
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

              {message && <div className="mt-4 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-800">{message}</div>}

              {loading ? (
                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading your feed...</div>
              ) : visiblePosts.length === 0 ? (
                <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-lg">✦</div>
                  <p className="mt-4 text-sm font-black">No company posts yet.</p>
                  <p className="mt-2 mx-auto max-w-md text-sm leading-6 text-slate-500">Company profiles will publish updates, opportunity insights and business progress here.</p>
                </div>
              ) : (
                <div className="mt-5 space-y-5">
                  {visiblePosts.map((post) => {
                    const postComments = comments.filter((comment) => comment.post_id === post.id);
                    const liked = likedPostIds.has(post.id);
                    const isMine = post.author_id === userId;
                    return (
                      <article key={post.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-950 text-sm font-black text-white">
                            {post.author_avatar_url ? <img src={post.author_avatar_url} alt="" className="h-full w-full object-cover" /> : initials(post.author_name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-black">{post.author_name}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                  {post.post_type === "opportunity_insight" ? "Opportunity Insight" : post.post_type === "business_update" ? "Business Update" : "General Update"} · {timeAgo(post.created_at)}
                                </p>
                              </div>
                            </div>
                            <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700">{post.content}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                          <button
                            onClick={() => toggleLike(post)}
                            disabled={actionId === post.id}
                            className={"rounded-xl px-3 py-2 text-xs font-bold transition " + (liked ? "bg-purple-50 text-purple-700" : "text-slate-500 hover:bg-slate-50")}
                          >
                            {liked ? "♥ Liked" : "♡ Like"} · {likeCounts[post.id] ?? 0}
                          </button>
                          <button
                            onClick={() => setOpenComments((current) => {
                              const next = new Set(current);
                              if (next.has(post.id)) next.delete(post.id); else next.add(post.id);
                              return next;
                            })}
                            className="rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
                          >
                            ◌ Comment · {commentCounts[post.id] ?? 0}
                          </button>
                        </div>

                        {openComments.has(post.id) && (
                          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                            <div className="space-y-4">
                              {postComments.length === 0 ? (
                                <p className="text-xs text-slate-400">No comments yet. Start the conversation.</p>
                              ) : postComments.map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[10px] font-black text-slate-700 shadow-sm">
                                    {comment.author_avatar_url ? <img src={comment.author_avatar_url} alt="" className="h-full w-full object-cover" /> : initials(comment.author_name)}
                                  </div>
                                  <div className="min-w-0 rounded-2xl bg-white px-4 py-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="text-xs font-black">{comment.author_name}</p>
                                      <span className="text-[10px] text-slate-400">{timeAgo(comment.created_at)}</span>
                                    </div>
                                    <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex gap-2">
                              <input
                                value={commentDrafts[post.id] ?? ""}
                                onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))}
                                onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); addComment(post); } }}
                                maxLength={2000}
                                placeholder="Write a comment..."
                                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-purple-500"
                              />
                              <button onClick={() => addComment(post)} disabled={actionId === post.id} className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700 disabled:opacity-50">
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
                <p className="mt-3 text-sm leading-6 text-slate-500">Companies publish to Feed. Members can follow the conversation through likes and comments while participation in opportunities stays inside the relevant activity.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Your profile</p>
                <p className="mt-3 text-sm font-black">{currentName}</p>
                <p className="mt-1 text-xs text-slate-500">{email}</p>
                <a href="/profile" className="mt-4 inline-flex rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">Edit Profile →</a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </UserAccountShell>
  );
}
