import cors from 'cors'
import express from 'express'
import {createProxyMiddleware} from 'http-proxy-middleware'

const app = express()

app.use(cors({}))

// Serve the Vue.js app as static files
app.use('/', express.static('dist'))

const apiProxy = createProxyMiddleware('/', {
  target: 'https://api.foodics.dev/v5', // Replace with the URL of your backend server
  changeOrigin: true,
})

app.use(apiProxy)

app.listen(8080, () => {
  console.log('Proxy server listening on port 8080')
})
