import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Market from '@/views/Market.vue'
import DigitalHuman from '@/views/DigitalHuman.vue'
import VoiceClone from '@/views/VoiceClone.vue'
import VoiceCreation from '@/views/VoiceCreation.vue'

// 分站相关路由
const subsiteRoutes = [
  {
    path: '/subsite-create',
    name: 'SubsiteCreate',
    component: () => import('@/views/subsite/SubsiteCreate.vue'),
    meta: {
      title: '创建分站',
      requireAuth: true
    }
  },
  {
    path: '/subsite-admin',
    name: 'SubsiteAdmin',
    component: () => import('@/views/subsite/SubsiteAdmin.vue'),
    meta: {
      title: '分站管理',
      requireAuth: true
    }
  },
  {
    path: '/subsite-users',
    name: 'SubsiteUsers',
    component: () => import('@/views/subsite/SubsiteUsers.vue'),
    meta: {
      title: '分站用户管理',
      requireAuth: true
    }
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import('../views/Market.vue'),
    meta: {
      requiresAuth: true,
      title: '形象市场'
    }
  },
  {
    path: '/subsite-create',
    name: 'SubsiteCreate',
    component: () => import('@/views/subsite/SubsiteCreate.vue'),
    meta: {
      requiresAuth: true,
      title: '开通分站'
    }
  },
  {
    path: '/subsite-admin',
    name: 'SubsiteAdmin',
    component: () => import('@/views/subsite/SubsiteAdmin.vue'),
    meta: {
      requiresAuth: true,
      title: '分站管理'
    }
  },
  {
    path: '/s/:domain',
    name: 'SubsiteView',
    component: () => import('@/views/subsite/SubsiteView.vue'),
    meta: {
      title: '分站首页'
    }
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('@/views/Works.vue')
  },
  {
    path: '/ai-copywriting',
    name: 'AiCopywriting',
    component: () => import('@/views/AiCopywriting.vue'),
    meta: {
      requiresAuth: true,
      title: 'AI文案创作'
    }
  },
  {
    path: '/digital-human',
    name: 'DigitalHuman',
    component: DigitalHuman
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue')
  },
  {
    path: '/voice-clone',
    name: 'VoiceClone',
    component: VoiceClone,
    meta: {
      title: '声音克隆',
      requiresAuth: true
    }
  },
  {
    path: '/voice-clone/upload',
    name: 'VoiceCloneUpload',
    component: () => import('@/views/VoiceCloneUpload.vue')
  },
  {
    path: '/voice-create',
    name: 'VoiceCreation',
    component: VoiceCreation,
    meta: {
      title: '声音创作',
      requiresAuth: true
    }
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: () => import('../views/UserCenter.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true
    }
  },
  // 添加分站路由
  ...subsiteRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 