// Nuxt's renderer hardcodes `x-powered-by: Nuxt` with no option to turn it off,
// so strip it from every response right before it is sent.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event) => {
    removeResponseHeader(event, 'x-powered-by')
  })
})
