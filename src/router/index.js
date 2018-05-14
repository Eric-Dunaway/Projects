import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/Catalog'
import Authors from '@/components/Authors'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Catalog
    },
    {
      path: '/authors',
      name: 'authors',
      component: Authors
    }
  ]
})
