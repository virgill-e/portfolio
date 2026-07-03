const ASSET_EXTENSIONS = /\.(js|css|map|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|json|txt|xml)$/i

export default defineEventHandler((event) => {
  const path = event.path.split('?')[0]

  if (event.method !== 'GET' || path.startsWith('/_nuxt') || path.startsWith('/api') || ASSET_EXTENSIONS.test(path)) {
    return
  }

  const ip = getRequestIP(event, { xForwardedFor: true })
  console.log(`[visit] ${new Date().toISOString()} ${ip} ${path}`)
})
