import { mount } from 'svelte'
import App from './views/App.svelte'

export default mount(App, {
  props: {
    name: 'World'
  },
  target: document.body
})
