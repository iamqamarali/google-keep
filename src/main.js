import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// import styles
import './styles/app.sass'


createApp(App).use(store).mount('#app')
