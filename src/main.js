import App from './views/App.svelte'

export default new App({
  props: {
    name: 'World'
  },
  target: document.body
})
