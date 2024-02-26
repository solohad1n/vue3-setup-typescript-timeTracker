import { createApp } from 'vue'
import { syncState } from './module/storage'
import { startCurrentDateTimer } from './module/time'
import App from './App.vue'

import './assets/main.css'

syncState()

startCurrentDateTimer()

document.addEventListener('visibilitychange', () =>
  syncState(document.visibilityState === 'visible')
)

createApp(App).mount('#app')
