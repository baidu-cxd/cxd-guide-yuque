import Vue from 'vue'
import Router from 'vue-router'
import Docs from './views/Docs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/docs/:id?',
      name: 'docs',
      component: Docs,
    },
    {
      path: '/test/docs/:id?',
      name: 'docs-test',
      component: Docs,
    }
  ]
})
