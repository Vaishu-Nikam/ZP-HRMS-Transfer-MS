// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { API_PROXY_TARGET } from './src/config/appConfig'

// // https://vite.dev/config/
// export default defineConfig(() => {
//   const apiProxyTarget = API_PROXY_TARGET || 'http://localhost:3001'
  
//   return {
//     base: '/admin/',
//     plugins: [react()],
//     server: {
//       host: true,
//       port: 5173,
//       proxy: {
//         '/api': {
//           target: apiProxyTarget,
//           changeOrigin: true,
//         },
//       },
//     },
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
