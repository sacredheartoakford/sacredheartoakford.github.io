import path from "path"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy middleware for Google Drive downloads (avoids CORS issues)
function driveProxy(): Plugin {
  return {
    name: 'drive-proxy',
    configureServer(server) {
      server.middlewares.use('/api/drive-proxy', (req: any, res: any, next: any) => {
        // Only handle GET requests
        if (req.method !== 'GET') {
          return next()
        }

        const url = req.url || ''
        const params = new URLSearchParams(url.split('?')[1] || '')
        const fileId = params.get('id')

        if (!fileId) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Missing id parameter' }))
          return
        }

        // Fetch from Google Drive server-side (no CORS restrictions)
        const driveUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download`

        fetch(driveUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          }
        })
          .then(async (driveRes) => {
            const contentType = driveRes.headers.get('content-type') || 'application/octet-stream'
            const disposition = driveRes.headers.get('content-disposition') || ''
            const body = await driveRes.arrayBuffer()

            res.writeHead(driveRes.status, {
              'Content-Type': contentType,
              'Content-Disposition': disposition,
              'Content-Length': body.byteLength.toString(),
              'Access-Control-Allow-Origin': '*',
            })
            res.end(Buffer.from(body))
          })
          .catch((err) => {
            res.writeHead(502, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: `Proxy failed: ${err.message}` }))
          })
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // Required for GitHub Pages hosting
  plugins: [react(), driveProxy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  // Enable SPA fallback for GitHub Pages
  appType: 'spa'
})
