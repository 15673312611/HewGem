<template>
  <div class="min-h-screen bg-[#f5f6f7] flex">
    <!-- 左侧导航 -->
    <Sidebar />
    
    <!-- 主内容区 -->
    <div class="flex-1">
      <!-- 顶部导航 -->
      <Navbar />
      
      <!-- 主要内容 -->
      <main class="max-w-[1440px] mx-auto px-4 py-4">
        <router-view />
      </main>
    </div>
  </div>
  <!-- 全局消息提示 -->
  <div v-if="showMessage" 
       class="fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white rounded-lg shadow-lg transition-all duration-300 z-50"
       :class="[
         messageType === 'error' ? 'bg-red-500' : 'bg-green-500',
         { 'opacity-0': !showMessage }
       ]">
    {{ messageText }}
  </div>
  <InviteDialog />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { ref, provide, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import request from '@/utils/request'
import InviteDialog from '@/components/InviteDialog.vue'
import { useLoginModal } from '@/composables/useLoginModal'
import { useRegisterModal } from '@/composables/useRegisterModal'

const showMessage = ref(false)
const messageText = ref('')
const messageType = ref('success')
const userStore = useUserStore()
const userInfo = ref(null)
const route = useRoute()
const { showLoginModal } = useLoginModal()
const { registerModalVisible, showRegisterModal, hideRegisterModal } = useRegisterModal()

const showGlobalMessage = (text, type = 'success', duration = 2000) => {
  messageText.value = text
  messageType.value = type
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, duration)
}

provide('showGlobalMessage', showGlobalMessage)
provide('userInfo', userInfo)

// 监听路由变化
watch(() => route.query, (query) => {
  if (query.inviteCode) {
    showRegisterModal()
  }
}, { immediate: true })

// 初始化应用时检查登录状态
const initAuth = async () => {
  // 如果本地有token和用户信息，验证token有效性
  if (userStore.token && Object.keys(userStore.user).length > 0) {
    try {
      // 验证token有效性
      const response = await request.get('/api/auth/check')
      console.log('Check response:', response)
      
      if (response && response.id) { // 检查返回的用户信息是否有效
        // 更新用户信息
        userStore.setUser(response)
        userInfo.value = response
        console.log('登录状态已恢复')
      } else {
        console.log('Token验证失败，清除登录状态')
        userStore.logout()
        userInfo.value = null
      }
    } catch (error) {
      console.error('验证token失败:', error)
      userStore.logout()
      userInfo.value = null
    }
  } else {
    console.log('本地没有token或用户信息，未登录状态')
    userInfo.value = null
  }
}

onMounted(() => {
  initAuth()
})
</script> 