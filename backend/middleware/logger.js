const loggerMiddleware = (req, res, next) => {
  const start = Date.now()
  const now = new Date()
  
  const pad = (n) => String(n).padStart(2, '0')
  const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${formattedDate}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`)
  })
  
  next()
}

export default loggerMiddleware
