import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/19OZePpKPi2UfKhER4Nunqf187hwDXE7EKYVBqMKC6aU/export?format=csv&gid=1048248898'

let _cache = null
let _promise = null

function toTypes(형태, 가격) {
  const parts = (형태 || '').split(',').map((s) => s.trim())
  const price = (가격 || '').trim()
  const result = []

  if (price === '무료') result.push('free')
  else if (price && price !== '' && price !== 'n/a') result.push('paid')

  for (const p of parts) {
    if ((p.includes('교재') || p === '원서') && !result.includes('book')) result.push('book')
    if (p.includes('시트') && !result.includes('worksheet')) result.push('worksheet')
    if (p.includes('영상') && !result.includes('video')) result.push('video')
    if ((p === '앱' || p.includes('게임') || p === '참고사이트') && !result.includes('app'))
      result.push('app')
  }
  return result
}

function toCategory(영역, 형태) {
  const typeParts = (형태 || '').split(',').map((s) => s.trim())
  if (typeParts.some((t) => t === '앱' || t.includes('게임') || t === '참고사이트'))
    return 'app'

  const domains = (영역 || '').split(',').map((s) => s.trim())
  for (const d of domains) {
    if (d.includes('문해') || d.includes('이해') || d.includes('독해')) return 'reading'
    if (d.includes('문법')) return 'grammar'
    if (d.includes('어휘')) return 'vocabulary'
    if (d.includes('소통') || d.includes('듣기')) return 'listening'
    if (d.toLowerCase().includes('phonics') || d.includes('파닉스')) return 'phonics'
  }
  return 'reading'
}

function toGrade(학형) {
  if (!학형 || 학형 === 'n/a' || !학형.trim()) return 'all'
  const first = 학형.split(',')[0].trim()
  if (first.includes('유아')) return 'preschool'
  if (first.includes('초')) {
    const n = parseInt(first.replace(/[^0-9]/g, ''), 10)
    return n <= 2 ? 'early' : 'late'
  }
  if (first.includes('중')) return 'middle'
  return 'all'
}

function shortGrade(raw) {
  if (!raw || raw === 'n/a') return ''
  const parts = raw.split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return `${parts[0]}~${parts[parts.length - 1]}`
}

function findKey(row, ...candidates) {
  for (const c of candidates) {
    const key = Object.keys(row).find((k) => k.includes(c))
    if (key && row[key] !== undefined) return row[key]
  }
  return ''
}

function transform(rows) {
  return rows
    .filter((r) => {
      const title = (r['학습소스명'] || '').trim()
      return !!title
    })
    .map((r) => {
      const idKey = Object.keys(r).find((k) => k.includes('Softr Record ID'))
      return {
        id: (idKey ? r[idKey] : '') || r['학습소스명'],
        title: r['학습소스명'] || '',
        image: r['image'] || '',
        description: r['설명'] || '',
        gradeRaw: r['학형'] || '',
        gradeShort: shortGrade(r['학형']),
        grade: toGrade(r['학형']),
        ar: r['AR 지수'] || '',
        lexile: r['렉사일 레벨'] || '',
        domainRaw: r['영역'] || '',
        category: toCategory(r['영역'], r['형태']),
        typeRaw: r['형태'] || '',
        types: toTypes(r['형태'], r['가격']),
        purchaseUrl: r['구매처/활용처'] || '',
        price: r['가격'] || '',
        publisher: findKey(r, '저자', '출판') || '',
        rating: r['이용연령별이름'] || '',
        notionUrl: r['Notion Url'] || '',
        notionEmbed: r['Notion embed'] || '',
        powrComment: r['powr comment'] || '',
      }
    })
}

export function useSheetData() {
  const [state, setState] = useState({
    contents: _cache || [],
    loading: !_cache,
    error: null,
  })

  useEffect(() => {
    if (_cache) return

    if (!_promise) {
      _promise = new Promise((resolve, reject) => {
        Papa.parse(SHEET_CSV, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (result) => resolve(transform(result.data)),
          error: (err) => reject(err),
        })
      })
    }

    _promise
      .then((data) => {
        _cache = data
        setState({ contents: data, loading: false, error: null })
      })
      .catch(() => {
        setState({
          contents: [],
          loading: false,
          error: '데이터를 불러오지 못했습니다. 구글 시트 공개 설정을 확인해주세요.',
        })
      })
  }, [])

  return state
}
