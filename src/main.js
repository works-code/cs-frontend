import './assets/common.css'

import { createApp } from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueCookies from 'vue-cookies';

const app = createApp(App)
// 전역 변수 선언
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverIP = '//127.0.0.1:8080'
app.use(router).use(vueCookies).mount("#app")

