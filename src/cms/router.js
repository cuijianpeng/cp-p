import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/login'),hidden:true },
  { path: '/403', component: () => import('@/views/403'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/', redirect: '/dashboard/index', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态路由表
export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { hideInMenu: true }
      }
    ]
  }
]
