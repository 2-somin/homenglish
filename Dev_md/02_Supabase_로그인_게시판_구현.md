# 02. Supabase 연동 — 로그인 & 게시판 구현

작업일: 2026-06-10

## 목표

홈글리시 플랫폼에 회원 인증(이메일/비밀번호 + 카카오 소셜 로그인)과 커뮤니티 자유게시판 기능을 추가한다.

## 기술 스택 추가

| 항목 | 내용 |
|---|---|
| Backend-as-a-Service | Supabase (PostgreSQL + Auth) |
| 패키지 | @supabase/supabase-js ^2.108.1 |
| 인증 방식 | 이메일+비밀번호, 카카오 OAuth 2.0 |

## 구현 내용

### 1. Supabase 클라이언트 설정
- `src/lib/supabase.js` — `createClient()`로 싱글턴 인스턴스 생성
- 환경변수 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 사용

### 2. 인증 컨텍스트
- `src/contexts/AuthContext.jsx` 신규 생성
- `onAuthStateChange` 구독으로 세션 실시간 동기화
- `useAuth()` 훅으로 `user`, `session`, `loading`, `signOut()` 제공
- `main.jsx`에 `<AuthProvider>` 적용

### 3. 로그인 / 회원가입 페이지 (`/login`)
- 카카오 로그인 버튼 (FEE500 배경, 카카오 공식 스타일)
- 이메일+비밀번호 로그인 / 회원가입 탭 전환
- 회원가입 시 이메일 인증 링크 발송 안내
- 이미 로그인 상태면 `/`로 자동 리다이렉트

### 4. 게시판 (`/board`)
- 목록: 10개씩 페이지네이션, 제목·작성자·날짜·조회수 표시
- 상세(`/board/:id`): 조회수 자동 증가, 본인 글 수정/삭제 버튼
- 글쓰기/수정(`/board/write`): 비로그인 시 `/login`으로 redirect, `?edit=id`로 수정 모드 진입

### 5. 헤더 업데이트
- 비로그인: 우측 상단 **로그인** 버튼
- 로그인: 이메일 앞부분 + **로그아웃** 버튼
- 데스크탑·모바일 패널 모두 적용

### 6. 네비게이션 추가
- `site.js` nav에 **커뮤니티 > 자유게시판** 항목 추가

## DB 스키마 (Supabase)

```sql
create table posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) on delete cascade not null,
  author_email text not null,
  views integer default 0,
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "select_all"  on posts for select using (true);
create policy "insert_own"  on posts for insert with check (auth.uid() = author_id);
create policy "update_own"  on posts for update using (true);
create policy "delete_own"  on posts for delete using (auth.uid() = author_id);
```

## 카카오 OAuth 설정 체크리스트

- [x] 카카오 개발자 콘솔 앱 생성
- [x] Web 플랫폼 도메인 등록 (`https://2-somin.github.io`)
- [x] 카카오 로그인 활성화
- [x] Redirect URI 등록 (`https://xbcttwrqsepxvytjcjft.supabase.co/auth/v1/callback`)
- [x] 이메일 동의항목 설정
- [ ] Supabase Dashboard → Authentication → Providers → Kakao 활성화

## GitHub Actions 배포

- `.env`는 `.gitignore`에 포함 → GitHub Repository Secrets으로 관리
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- `deploy.yml`의 build step에 secrets 환경변수 주입

## 파일 변경 목록

| 파일 | 변경 내용 |
|---|---|
| `package.json` | @supabase/supabase-js 의존성 추가 |
| `src/lib/supabase.js` | 신규 — Supabase 클라이언트 |
| `src/contexts/AuthContext.jsx` | 신규 — 인증 컨텍스트 |
| `src/pages/Login.jsx` | 신규 — 로그인/회원가입 |
| `src/pages/Board.jsx` | 신규 — 게시판 목록 |
| `src/pages/BoardDetail.jsx` | 신규 — 게시글 상세 |
| `src/pages/BoardWrite.jsx` | 신규 — 글쓰기/수정 |
| `src/App.jsx` | 라우트 추가 |
| `src/main.jsx` | AuthProvider 추가 |
| `src/components/Header.jsx` | 로그인/로그아웃 버튼 추가 |
| `src/data/site.js` | 커뮤니티 nav 추가 |
| `.github/workflows/deploy.yml` | Secrets 환경변수 주입 추가 |
| `supabase_setup.sql` | 신규 — DB 초기화 SQL |
