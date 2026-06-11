import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin) //VueUse Motion plugin for composable-based animations
app.mount('#app')
