import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const BOARD_LABELS = { free: '자유게시판', qna: 'Q&A 게시판' }

export default function BoardWrite() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, loading: authLoading } = useAuth()

  const editId = searchParams.get('edit')
  const boardType = searchParams.get('type') || 'free'
  const isEditMode = Boolean(editId)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingPost, setLoadingPost] = useState(isEditMode)
  const [error, setError] = useState('')

  const boardLabel = BOARD_LABELS[boardType] || BOARD_LABELS.free
  const boardPath = `/board/${boardType}`

  // 비로그인 시 리다이렉트
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', {
        replace: true,
        state: { from: isEditMode ? `/board/write?edit=${editId}&type=${boardType}` : `/board/write?type=${boardType}` },
      })
    }
  }, [user, authLoading, navigate, isEditMode, editId, boardType])

  // 수정 모드: 기존 내용 로드
  useEffect(() => {
    if (!isEditMode) return
    const fetchPost = async () => {
      setLoadingPost(true)
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', editId)
          .single()

        if (error) throw error
        if (!data) throw new Error('게시글을 찾을 수 없습니다.')

        if (user && data.author_id !== user.id) {
          alert('수정 권한이 없습니다.')
          navigate(`/board/${editId}`, { replace: true })
          return
        }

        setTitle(data.title)
        setContent(data.content)
      } catch (err) {
        setError(err.message || '게시글을 불러오는 데 실패했습니다.')
      } finally {
        setLoadingPost(false)
      }
    }

    if (user) fetchPost()
  }, [isEditMode, editId, user, navigate])

  const getAuthorName = () => {
    if (!user) return ''
    return (
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      '사용자'
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) { setError('제목을 입력해주세요.'); return }
    if (!content.trim()) { setError('내용을 입력해주세요.'); return }

    setLoading(true)
    setError('')

    try {
      if (isEditMode) {
        const { error } = await supabase
          .from('posts')
          .update({ title: title.trim(), content: content.trim() })
          .eq('id', editId)

        if (error) throw error
        navigate(`/board/${editId}`, { replace: true })
      } else {
        const { data, error } = await supabase
          .from('posts')
          .insert({
            title: title.trim(),
            content: content.trim(),
            author_id: user.id,
            author_email: user.email || '',
            author_name: getAuthorName(),
            board_type: boardType,
          })
          .select()
          .single()

        if (error) throw error
        navigate(`/board/${data.id}`, { replace: true })
      }
    } catch (err) {
      setError(err.message || '저장에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/board/${editId}`)
    } else {
      navigate(boardPath)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-bg dark:bg-bg-dark">
        <p className="text-neutral-400 dark:text-neutral-500 text-sm">로딩 중...</p>
      </div>
    )
  }

  if (!user) return null

  if (loadingPost) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-bg dark:bg-bg-dark">
        <p className="text-neutral-400 dark:text-neutral-500 text-sm">게시글 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg dark:bg-bg-dark py-10 px-4">
      <div className="mx-auto max-w-3xl">
        {/* 헤더 */}
        <div className="mb-6">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-1">{boardLabel}</p>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            {isEditMode ? '게시글 수정' : '글쓰기'}
          </h1>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                placeholder="제목을 입력해주세요"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:focus:ring-brand-light/30 focus:border-brand dark:focus:border-brand-light transition"
              />
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                placeholder="내용을 입력해주세요"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:focus:ring-brand-light/30 focus:border-brand dark:focus:border-brand-light transition resize-y min-h-[200px]"
              />
            </div>

            {/* 에러 */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* 버튼 */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? '저장 중...' : (isEditMode ? '수정 완료' : '등록')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
