import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人信息', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '公司信息导入', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '公司岗位信息', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '公司信息 ', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '投递信息处理', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'authorityManagement',
      name: 'authorityManagement',
      component: () => import('@/views/authorityManagement/index'),
      meta: { title: '权限管理', icon: 'nested' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'showExame',
      name: 'showExame',
      component: () => import('@/views/showExame/index'),
      meta: { title: '试题查看', icon: 'eye-open' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'myExame',
      name: 'myExame',
      component: () => import('@/views/myExame/index'),
      meta: { title: '我的试题', icon: 'link' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'setExame',
      name: 'setExame',
      component: () => import('@/views/setExame/index'),
      meta: { title: '试题组卷', icon: 'link' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
