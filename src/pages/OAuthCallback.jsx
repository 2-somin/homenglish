import SimplePage from './SimplePage'

// PKCE 방식 전환 후 이 컴포넌트는 매칭되지 않는 경로의 404 처리용
export default function OAuthCallback() {
  return <SimplePage title="페이지를 찾을 수 없습니다" />
}
