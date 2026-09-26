-- ACEPA Feed is company-published only.
-- Normal authenticated users may read published posts and interact with them through likes/comments,
-- but they have no INSERT/UPDATE/DELETE policy on feed_posts.
drop policy if exists "Users can create their own feed posts" on public.feed_posts;
drop policy if exists "Users can update their own feed posts" on public.feed_posts;
drop policy if exists "Users can delete their own feed posts" on public.feed_posts;
