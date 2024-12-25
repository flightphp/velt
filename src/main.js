import { mount } from 'svelte'
import App from './views/App.svelte'

mount(App, { target: document.body, props: { name: 'World' } })
