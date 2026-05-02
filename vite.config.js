import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Plugin to serve busads folder as static
function serveBusAds() {
  return {
    name: 'serve-busads',
    configureServer(server) {
      server.middlewares.use('/busads', (req, res, next) => {
        const filePath = resolve('busads', decodeURIComponent(req.url).replace(/^\//, ''))
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'image/jpeg')
          fs.createReadStream(filePath).pipe(res)
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), serveBusAds()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})

