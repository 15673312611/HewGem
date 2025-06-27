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
  <AnnouncementDialog
    v-if="userStore.isAnnouncementEnabled"
    ref="announcementDialogRef"
    :announcement="userStore.announcement"
  />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { ref, provide, onMounted, watch, computed, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import request from '@/utils/request'
import InviteDialog from '@/components/InviteDialog.vue'
import AnnouncementDialog from '@/components/AnnouncementDialog.vue'
import { useLoginModal } from '@/composables/useLoginModal'
import { useRegisterModal } from '@/composables/useRegisterModal'
import axios from 'axios'

const showMessage = ref(false)
const messageText = ref('')
const messageType = ref('success')
const userStore = useUserStore()
const route = useRoute()
const { showLoginModal } = useLoginModal()
const { registerModalVisible, showRegisterModal, hideRegisterModal } = useRegisterModal()
const announcementDialogRef = ref(null)

const showGlobalMessage = (text, type = 'success', duration = 2000) => {
  messageText.value = text
  messageType.value = type
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, duration)
}

provide('showGlobalMessage', showGlobalMessage)
// 通过 computed 提供响应式的 userInfo
provide('userInfo', computed(() => userStore.user))

const checkUserStatus = async () => {
  // initAuth 会从 localStorage 加载，updateUserInfo 会从服务器更新
  if (userStore.initAuth()) {
    await userStore.updateUserInfo()
  }
}

watch(() => userStore.isAnnouncementEnabled, (isEnabled) => {
  if (isEnabled && announcementDialogRef.value) {
    // 检查是否是从路由跳转到分站创建页面
    if (route.path === '/subsite-create') {
      return; // 如果是跳转到分站创建页面，不显示公告
    }
    announcementDialogRef.value.showDialog();
  }
}, { deep: true, immediate: true });

// 监听路由变化，当用户点击开通分站按钮时不显示公告
watch(() => route.path, (newPath) => {
  if (newPath === '/subsite-create' && announcementDialogRef.value) {
    // 如果是分站创建页面，不显示公告
    return;
  }
}, { immediate: true });

// 监听登录成功事件，显示公告
const handleLoginSuccess = () => {
  console.log('登录成功事件触发', {
    hasSubsite: userStore.subsite && userStore.subsite.id,
    path: route.path
  });
  
  // 给更长的延迟确保subsite信息已经设置好
  setTimeout(() => {
    console.log('延迟后检查分站信息', {
      subsite: userStore.subsite,
      hasAnnouncementRef: !!announcementDialogRef.value,
      isEnabled: userStore.isAnnouncementEnabled,
    });
    
    if (userStore.isAnnouncementEnabled && announcementDialogRef.value) {
      // 检查是否是从路由跳转到分站创建页面
      if (route.path === '/subsite-create') {
        console.log('当前在分站创建页面，不显示公告');
        return; // 如果是跳转到分站创建页面，不显示公告
      }
      console.log('准备显示公告', {
        announcement: userStore.announcement,
        enableAnnouncement: userStore.isAnnouncementEnabled
      });
      announcementDialogRef.value.showDialog();
    } else {
      console.log('无法显示公告', {
        hasSubsite: !!userStore.subsite,
        hasSubsiteId: userStore.subsite && userStore.subsite.id,
        isEnabled: userStore.isAnnouncementEnabled,
        hasAnnouncementRef: !!announcementDialogRef.value
      });
    }
  }, 300); // 增加到300ms
};

onMounted(async () => {
  await checkUserStatus()
  
  // 添加登录成功事件监听
  window.addEventListener('login-success', handleLoginSuccess);
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('login-success', handleLoginSuccess);
})
</script> 