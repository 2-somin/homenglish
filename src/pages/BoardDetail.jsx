import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function BoardDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) throw new Error('게시글을 찾을 수 없습니다.')

      setPost(data)


      // 조회수 증가
      await supabase
        .from('posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id)
    } catch (err) {
      setError(err.message || '게시글을 불러오는 데 실패했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return
    setDeleting(true)
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      navigate(post?.board_type ? `/board/${post.board_type}` : '/board/free', { replace: true })
    } catch (err) {
      alert('삭제에 실패했습니다: ' + (err.message || ''))
      setDeleting(false)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getAuthorDisplay = (post) => {
    if (post.author_name) return post.author_name
    if (post.author_email) return post.author_email.split('@')[0]
    return '익명'
  }

  const boardPath = `/board/${post?.board_type || 'free'}`
  const isOwner = user && post && user.id === post.author_id

  // 로딩
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-bg dark:bg-bg-dark">
        <p className="text-neutral-400 dark:text-neutral-500 text-sm">불러오는 중...</p>
      </div>
    )
  }

  // 에러
  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4 bg-bg dark:bg-bg-dark px-4">
        <p className="text-red-500 text-sm">{error}</p>
        <button
          onClick={() => navigate('/board/free')}
          className="px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition"
        >
          목록으로
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg dark:bg-bg-dark py-10 px-4">
      <div className="mx-auto max-w-3xl">
        {/* 목록으로 */}
        <button
          onClick={() => navigate(boardPath)}
          className="mb-6 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand dark:hover:text-brand-light transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          목록으로
        </button>

        {/* 게시글 카드 */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
          {/* 헤더 */}
          <div className="px-8 py-6 border-b border-neutral-100 dark:border-neutral-700">
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 leading-relaxed">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {getAuthorDisplay(post)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                조회 {(post.views || 0) + 1}
              </span>
            </div>
          </div>

          {/* 본문 */}
          <div className="px-8 py-8">
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* 하단 버튼 */}
          {isOwner && (
            <div className="px-8 py-5 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-end gap-3">
              <button
                onClick={() => navigate(`/board/write?edit=${post.id}&type=${post.board_type || 'free'}`)}
                className="px-4 py-2 rounded-xl border border-brand dark:border-brand-light text-brand dark:text-brand-light text-sm font-semibold hover:bg-brand/5 dark:hover:bg-brand-light/10 transition"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
