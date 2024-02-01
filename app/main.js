import App from './views/App.svelte'

// biome-ignore lint/style/noDefaultExport:
export default new App({
  props: {
    name: 'World',
    // If public/ is in a subdirectory
    // root: '/plantillas/velt/public'
  },
  target: document.body
})
