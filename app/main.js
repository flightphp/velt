import App from './views/App.svelte'

export default new App({
  props: {
    name: 'World',
    // If public/ is in a subdirectory
    // root: '/plantillas/velt/public'
  },
  target: document.body
})
