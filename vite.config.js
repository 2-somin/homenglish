import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포 시 base 경로를 리포명으로 설정 (2-somin.github.io/rest04/)
export default defineConfig({
  plugins: [react()],
  base: '/rest04/',
})
