import cors from 'cors'
import path from 'path'
import express from 'express'
import {fileURLToPath} from 'url'
import {createProxyMiddleware} from 'http-proxy-middleware'

const app = express()

app.use(cors())

// define the absolute path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve the Vue.js app as a static file directory
app.use(express.static('dist'))

const apiProxy = createProxyMiddleware('/', {
  target: 'https://api.foodics.dev/v5', // Replace with the URL of your backend server
  changeOrigin: true,
})

// Catch-all route for API requests
app.use('/', apiProxy)

// Handle all other routes by serving the index.html file
// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })

app.listen(8080, () => {
  console.log('Proxy server listening on port 8080')
})
