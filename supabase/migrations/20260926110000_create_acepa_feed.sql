-- ACEPA Feed: posts, likes and comments.
create table if not exists public.feed_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  author_avatar_url text,
  post_type text not null default 'update',
  content text not null,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint feed_posts_type_check check (post_type in ('update','opportunity_insight','business_update')),
  constraint feed_posts_status_check check (status in ('published','hidden')),
  constraint feed_posts_content_check check (char_length(btrim(content)) between 1 and 5000)
);
create index if not exists feed_posts_created_at_idx on public.feed_posts (created_at desc);
create index if not exists feed_posts_author_idx on public.feed_posts (author_id, created_at desc);
alter table public.feed_posts enable row level security;
drop policy if exists "Authenticated users can view published feed posts" on public.feed_posts;
create policy "Authenticated users can view published feed posts" on public.feed_posts for select to authenticated using (status = 'published' or (select auth.uid()) = author_id);
drop policy if exists "Users can create their own feed posts" on public.feed_posts;
create policy "Users can create their own feed posts" on public.feed_posts for insert to authenticated with check ((select auth.uid()) = author_id);
drop policy if exists "Users can update their own feed posts" on public.feed_posts;
create policy "Users can update their own feed posts" on public.feed_posts for update to authenticated using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id);
drop policy if exists "Users can delete their own feed posts" on public.feed_posts;
create policy "Users can delete their own feed posts" on public.feed_posts for delete to authenticated using ((select auth.uid()) = author_id);

create table if not exists public.feed_likes (
  post_id uuid not null references public.feed_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);
create index if not exists feed_likes_user_idx on public.feed_likes (user_id, created_at desc);
alter table public.feed_likes enable row level security;
drop policy if exists "Authenticated users can view feed likes" on public.feed_likes;
create policy "Authenticated users can view feed likes" on public.feed_likes for select to authenticated using (true);
drop policy if exists "Users can like feed posts as themselves" on public.feed_likes;
create policy "Users can like feed posts as themselves" on public.feed_likes for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Users can remove their own feed likes" on public.feed_likes;
create policy "Users can remove their own feed likes" on public.feed_likes for delete to authenticated using ((select auth.uid()) = user_id);

create table if not exists public.feed_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.feed_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  author_avatar_url text,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint feed_comments_content_check check (char_length(btrim(content)) between 1 and 2000)
);
create index if not exists feed_comments_post_idx on public.feed_comments (post_id, created_at asc);
alter table public.feed_comments enable row level security;
drop policy if exists "Authenticated users can view feed comments" on public.feed_comments;
create policy "Authenticated users can view feed comments" on public.feed_comments for select to authenticated using (true);
drop policy if exists "Users can create their own feed comments" on public.feed_comments;
create policy "Users can create their own feed comments" on public.feed_comments for insert to authenticated with check ((select auth.uid()) = author_id);
drop policy if exists "Users can update their own feed comments" on public.feed_comments;
create policy "Users can update their own feed comments" on public.feed_comments for update to authenticated using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id);
drop policy if exists "Users can delete their own feed comments" on public.feed_comments;
create policy "Users can delete their own feed comments" on public.feed_comments for delete to authenticated using ((select auth.uid()) = author_id);
