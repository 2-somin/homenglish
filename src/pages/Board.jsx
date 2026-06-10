import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const PAGE_SIZE = 10

const BOARD_META = {
  free: {
    title: '자유게시판',
    desc: '홈글리시 회원들과 자유롭게 이야기를 나눠보세요',
  },
  qna: {
    title: 'Q&A 게시판',
    desc: '영어 홈스쿨 관련 궁금한 점을 질문하고 답변해 보세요',
  },
}

export default function Board({ type = 'free' }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [posts, setPosts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const meta = BOARD_META[type] || BOARD_META.free
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  // 탭 전환 시 페이지 리셋
  useEffect(() => {
    setPage(1)
  }, [type])

  useEffect(() => {
    fetchPosts()
  }, [page, type])

  const fetchPosts = async () => {
    setLoading(true)
    setError('')
    try {
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('board_type', type)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error
      setPosts(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      setError('게시글을 불러오는 데 실패했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now - d
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    if (mins < 1) return '방금 전'
    if (mins < 60) return `${mins}분 전`
    if (hours < 24) return `${hours}시간 전`
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  const getAuthorDisplay = (post) => {
    if (post.author_name) return post.author_name
    if (post.author_email) return post.author_email.split('@')[0]
    return '익명'
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg dark:bg-bg-dark py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {/* 탭 */}
        <div className="flex gap-1 mb-6 border-b border-neutral-200 dark:border-neutral-700">
          <Link
            to="/board/free"
            className={[
              'px-5 py-3 text-sm font-semibold border-b-2 transition',
              type === 'free'
                ? 'border-brand text-brand dark:text-brand-light dark:border-brand-light'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200',
            ].join(' ')}
          >
            자유게시판
          </Link>
          <Link
            to="/board/qna"
            className={[
              'px-5 py-3 text-sm font-semibold border-b-2 transition',
              type === 'qna'
                ? 'border-brand text-brand dark:text-brand-light dark:border-brand-light'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200',
            ].join(' ')}
          >
            Q&A 게시판
          </Link>
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{meta.title}</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{meta.desc}</p>
          </div>
          {user ? (
            <button
              onClick={() => navigate(`/board/write?type=${type}`)}
              className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition"
            >
              글쓰기
            </button>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl border border-brand text-brand dark:border-brand-light dark:text-brand-light text-sm font-semibold hover:bg-brand/5 dark:hover:bg-brand-light/10 transition"
            >
              로그인 후 글쓰기
            </Link>
          )}
        </div>

        {/* 에러 */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* 테이블 */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            <span>제목</span>
            <span className="text-center w-24">작성자</span>
            <span className="text-center w-28">작성일</span>
            <span className="text-center w-16">조회</span>
          </div>

          {/* 로딩 */}
          {loading && (
            <div className="py-20 text-center text-neutral-400 dark:text-neutral-500 text-sm">
              불러오는 중...
            </div>
          )}

          {/* 빈 목록 */}
          {!loading && posts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-neutral-400 dark:text-neutral-500 text-sm">아직 게시글이 없습니다.</p>
              {user && (
                <button
                  onClick={() => navigate(`/board/write?type=${type}`)}
                  className="mt-4 px-5 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition"
                >
                  첫 글을 작성해보세요
                </button>
              )}
            </div>
          )}

          {/* 게시글 목록 */}
          {!loading && posts.map((post, idx) => (
            <div
              key={post.id}
              className={[
                'grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-1 sm:gap-4 px-6 py-4 cursor-pointer transition-colors',
                'hover:bg-neutral-50 dark:hover:bg-neutral-700/30',
                idx < posts.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-700/50' : '',
              ].join(' ')}
              onClick={() => navigate(`/board/${post.id}`)}
            >
              {/* 제목 */}
              <div className="min-w-0">
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:text-brand dark:hover:text-brand-light transition line-clamp-1">
                  {post.title}
                </span>
              </div>

              {/* 모바일: 작성자·날짜·조회 한 줄 */}
              <div className="flex items-center gap-3 sm:contents text-xs text-neutral-400 dark:text-neutral-500">
                <span className="sm:text-center sm:w-24 truncate">
                  {getAuthorDisplay(post)}
                </span>
                <span className="sm:text-center sm:w-28 whitespace-nowrap">
                  {formatDate(post.created_at)}
                </span>
                <span className="sm:text-center sm:w-16">
                  조회 {post.views ?? 0}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={[
                  'w-9 h-9 rounded-lg text-sm font-medium transition',
                  p === page
                    ? 'bg-brand text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700',
                ].join(' ')}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              다음
            </button>
          </div>
        )}

        {/* 총 게시글 수 */}
        {!loading && (
          <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
            총 {totalCount}개의 게시글
          </p>
        )}
      </div>
    </div>
  )
}
