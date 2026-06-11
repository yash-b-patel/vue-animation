import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import { MotionPlugin } from '@vueuse/motion'

import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)

app.use(Particles, {
  init: async (engine: Engine) => {
    await loadSlim(engine)
  },
})

app.mount('#app')
