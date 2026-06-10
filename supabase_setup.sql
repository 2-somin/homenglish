-- ============================================================
-- homenglish — Supabase DB 초기 설정
-- Supabase Dashboard > SQL Editor 에서 실행하세요.
-- ============================================================

-- posts 테이블 생성
create table if not exists posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) on delete cascade not null,
  author_email text not null,
  views integer default 0,
  created_at timestamptz default now()
);

-- RLS 활성화
alter table posts enable row level security;

-- 누구나 읽기 가능
create policy "select_all"
  on posts for select
  using (true);

-- 로그인한 사용자만 본인 글 작성 가능
create policy "insert_own"
  on posts for insert
  with check (auth.uid() = author_id);

-- 업데이트는 모두 허용 (조회수 업데이트 포함, 본인 글 수정은 앱단에서 제어)
create policy "update_own"
  on posts for update
  using (true);

-- 본인 글만 삭제 가능
create policy "delete_own"
  on posts for delete
  using (auth.uid() = author_id);
