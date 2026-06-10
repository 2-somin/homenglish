import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const PAGE_SIZE = 10

export default function Board() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [posts, setPosts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  useEffect(() => {
    fetchPosts()
  }, [page])

  const fetchPosts = async () => {
    setLoading(true)
    setError('')
    try {
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
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

  const getAuthorDisplay = (email) => {
    if (!email) return '익명'
    return email.split('@')[0]
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg dark:bg-bg-dark py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">자유게시판</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              홈글리시 회원들과 자유롭게 이야기를 나눠보세요
            </p>
          </div>
          {user && (
            <button
              onClick={() => navigate('/board/write')}
              className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition"
            >
              글쓰기
            </button>
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
                  onClick={() => navigate('/board/write')}
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
                  {getAuthorDisplay(post.author_email)}
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
