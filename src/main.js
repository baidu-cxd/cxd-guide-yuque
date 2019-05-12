import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from "nprogress"
import axios from 'axios'
import qs from 'qs'
import {token} from './token.js'

// 加载进度条控制

router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


Vue.config.productionTip = false

var cxdAxios = axios.create({
  baseURL: '/api/',
  timeout: 30000,
  headers: {
      'X-Auth-Token' : token,
      'Access-Control-Allow-Headers':'Content-Type, api_key, Authorization'
  }
});


Vue.prototype.$axios = cxdAxios
Vue.prototype.qs = qs   

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
