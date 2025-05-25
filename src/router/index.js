import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Market from '@/views/Market.vue'
import DigitalHuman from '@/views/DigitalHuman.vue'
import VoiceClone from '@/views/VoiceClone.vue'
import VoiceCreation from '@/views/VoiceCreation.vue'

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
    path: '/works',
    name: 'Works',
    component: () => import('@/views/Works.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 