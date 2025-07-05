<template>
  <div class="min-h-screen flex transition-colors duration-300"
       :class="[
         themeStore.isDarkMode 
           ? 'bg-dark-bg text-dark-text dark' 
           : 'bg-[#f5f6f7] text-gray-900'
       ]">
    <!-- 左侧导航 -->
    <div class="relative">
      <Sidebar class="z-10" />
      <div class="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200/50 dark:via-gray-700/30 to-transparent"></div>
    </div>
    
    <!-- 主内容区 -->
    <div class="flex-1 relative">
      <!-- 顶部导航 -->
      <Navbar class="z-20" />
      
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
import { useThemeStore } from '@/stores/theme'
import { useSiteStore } from '@/stores/site'
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
const themeStore = useThemeStore()
const siteStore = useSiteStore()
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
// 提供主题状态
provide('themeStore', themeStore)

const checkUserStatus = async () => {
  // initAuth 会从 localStorage 加载，updateUserInfo 会从服务器更新
  if (userStore.initAuth()) {
    await userStore.updateUserInfo()
  }
}

watch(() => userStore.isAnnouncementEnabled, (isEnabled) => {
  console.log('公告启用状态变化', { 
    isEnabled, 
    hasRef: !!announcementDialogRef.value, 
    announcement: userStore.announcement,
    path: route.path
  });
  
  if (isEnabled && announcementDialogRef.value && userStore.announcement) {
    // 检查是否是从路由跳转到分站创建页面
    if (route.path === '/subsite-create') {
      console.log('当前在分站创建页面，不显示公告');
      return; // 如果是跳转到分站创建页面，不显示公告
    }
    console.log('尝试显示公告', { announcement: userStore.announcement });
    announcementDialogRef.value.showDialog();
  } else if (isEnabled && announcementDialogRef.value) {
    console.log('公告启用但内容为空或组件未就绪', { 
      hasAnnouncement: !!userStore.announcement, 
      hasRef: !!announcementDialogRef.value 
    });
  }
}, { deep: true, immediate: true });

// 监听登录成功事件，显示公告
const handleLoginSuccess = () => {
  console.log('登录成功事件触发', {
    hasSubsite: userStore.subsite && userStore.subsite.id,
    path: route.path,
    announcement: userStore.announcement,
    isEnabled: userStore.isAnnouncementEnabled
  });
  
  try {
  // 给更长的延迟确保subsite信息已经设置好
  setTimeout(() => {
      try {
    console.log('延迟后检查分站信息', {
      subsite: userStore.subsite,
      hasAnnouncementRef: !!announcementDialogRef.value,
      isEnabled: userStore.isAnnouncementEnabled,
          announcement: userStore.announcement
    });
    
        if (userStore.isAnnouncementEnabled && announcementDialogRef.value && userStore.announcement) {
      // 检查是否是从路由跳转到分站创建页面
      if (route.path === '/subsite-create') {
        console.log('当前在分站创建页面，不显示公告');
        return; // 如果是跳转到分站创建页面，不显示公告
      }
      console.log('准备显示公告', {
        announcement: userStore.announcement,
        enableAnnouncement: userStore.isAnnouncementEnabled
      });
          try {
      announcementDialogRef.value.showDialog();
          } catch (dialogError) {
            console.error('显示公告对话框失败:', dialogError);
          }
    } else {
      console.log('无法显示公告', {
        hasSubsite: !!userStore.subsite,
        hasSubsiteId: userStore.subsite && userStore.subsite.id,
        isEnabled: userStore.isAnnouncementEnabled,
            hasAnnouncement: !!userStore.announcement,
        hasAnnouncementRef: !!announcementDialogRef.value
      });
        }
      } catch (timeoutError) {
        console.error('处理登录成功延迟回调时出错:', timeoutError);
    }
  }, 300); // 增加到300ms
  } catch (error) {
    console.error('处理登录成功事件时出错:', error);
  }
};

// 监听主题配置加载完成事件
const handleThemeConfigLoaded = () => {
  console.log('主题配置已加载，重新初始化主题')
  themeStore.reinit()
}

onMounted(async () => {
  console.log('App组件挂载，初始化用户状态和站点信息');
  
  // 初始化站点信息
  await siteStore.fetchSiteInfo();
  
  // 初始化用户状态
  await checkUserStatus();
  
  // 初始化主题
  themeStore.init();
  
  // 检查是否已经加载了主题配置
  if (window.THEME_CONFIG && window.THEME_CONFIG.defaultTheme) {
    handleThemeConfigLoaded();
  } else {
    // 监听主题配置加载完成事件
    window.addEventListener('theme-config-loaded', handleThemeConfigLoaded);
  }
  
  // 添加登录成功事件监听
  window.addEventListener('login-success', handleLoginSuccess);
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('login-success', handleLoginSuccess);
  window.removeEventListener('theme-config-loaded', handleThemeConfigLoaded);
})
</script> 

<style>
/* Element Plus 组件样式优化 */
:deep(.el-button) {
  @apply transition-all duration-300;
  @apply rounded-lg;
}

:deep(.el-button--primary) {
  @apply shadow-[0_2px_5px_rgba(14,165,233,0.2)];
  @apply hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)];
  @apply hover:translate-y-[-1px];
}

:deep(.el-button--primary:active) {
  @apply translate-y-[1px];
  @apply shadow-[0_1px_3px_rgba(14,165,233,0.2)];
}

:deep(.el-input__wrapper) {
  @apply transition-all duration-300 rounded-lg;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset !important;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2) inset !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px rgba(14, 165, 233, 0.6) inset !important;
}

.dark :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
  @apply bg-dark-card3;
}

.dark :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15) inset !important;
}

.dark :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.6) inset !important;
}

/* 优化卡片边缘 */
.card, .el-card {
  border-radius: 1rem;
  overflow: hidden;
  @apply shadow-soft;
}

/* 优化滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark ::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.dark ::-webkit-scrollbar-thumb {
  background: #444;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Element Plus 深色模式样式覆盖 */
.dark .el-button {
  --el-button-bg-color: var(--el-color-primary);
  --el-button-text-color: var(--el-color-white);
  --el-button-border-color: var(--el-color-primary);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-primary-light-3);
  --el-button-hover-border-color: var(--el-color-primary-light-3);
  --el-button-active-bg-color: var(--el-color-primary-dark-2);
  --el-button-active-border-color: var(--el-color-primary-dark-2);
}

.dark .el-dialog {
  --el-dialog-bg-color: #1e1e1e;
  --el-dialog-text-color: #e0e0e0;
  --el-dialog-border-color: #333;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.dark .el-dialog__title {
  color: #e0e0e0;
}

.dark .el-dialog__headerbtn .el-dialog__close {
  color: #a0a0a0;
}

.dark .el-dialog__headerbtn:hover .el-dialog__close {
  color: #e0e0e0;
}

.dark .el-dialog__body {
  color: #c0c0c0;
}

.dark .el-dialog__header {
  background-color: #252525;
  border-bottom: 1px solid #333;
}

.dark .el-dialog__footer {
  background-color: #252525;
  border-top: 1px solid #333;
}

.dark .el-empty__description {
  color: #a0a0a0;
}

.dark .el-empty__image {
  opacity: 0.6;
}

.dark .el-input__wrapper {
  background-color: #2d2d2d;
  box-shadow: 0 0 0 1px #444 inset;
}

.dark .el-input__inner {
  color: #e0e0e0;
}

.dark .el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
}

.dark .el-select-dropdown {
  background-color: #252525;
  border: 1px solid #333;
}

.dark .el-select-dropdown__item {
  color: #c0c0c0;
}

.dark .el-select-dropdown__item.hover, 
.dark .el-select-dropdown__item:hover {
  background-color: #333;
}

.dark .el-select-dropdown__item.selected {
  color: var(--el-color-primary);
  background-color: #333;
}

.dark .el-message-box {
  background-color: #1e1e1e;
  border: 1px solid #333;
}

.dark .el-message-box__title {
  color: #e0e0e0;
}

.dark .el-message-box__content {
  color: #c0c0c0;
}

.dark .el-message-box__headerbtn .el-message-box__close {
  color: #a0a0a0;
}

.dark .el-message-box__headerbtn:hover .el-message-box__close {
  color: #e0e0e0;
}

.dark .el-message {
  background-color: #252525;
  border-color: #333;
}

.dark .el-message--success {
  background-color: rgba(0, 128, 0, 0.1);
  border-color: rgba(0, 128, 0, 0.2);
}

.dark .el-message--error {
  background-color: rgba(255, 0, 0, 0.1);
  border-color: rgba(255, 0, 0, 0.2);
}

.dark .el-message--warning {
  background-color: rgba(255, 165, 0, 0.1);
  border-color: rgba(255, 165, 0, 0.2);
}

.dark .el-message--info {
  background-color: rgba(0, 100, 255, 0.1);
  border-color: rgba(0, 100, 255, 0.2);
}
</style> 