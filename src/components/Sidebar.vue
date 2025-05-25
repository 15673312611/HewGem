<template>
  <div class="w-[240px] bg-white border-r border-gray-100 h-screen flex flex-col sticky top-0 shadow-sm">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b border-gray-100 bg-white">
      <div class="flex items-center space-x-3">
        <!-- <img src="../static/images/logo1.png" alt="数字人" class="h-8 w-8" /> -->
        <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">数字人平台</span>
      </div>
    </div>

    <!-- 导航菜单 -->
    <nav class="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 relative group"
        :class="[
          isActive(item.path)
            ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <component 
          :is="item.icon" 
          class="w-5 h-5 mr-3 transition-colors"
          :class="isActive(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'" 
        />
        <span>{{ item.name }}</span>
        <div
          v-if="isActive(item.path)"
          class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-full"
        ></div>
      </router-link>

      <!-- 个人中心 -->
      <router-link
        to="/user-center"
        class="flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 relative group"
        :class="[
          isActive('/user-center')
            ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <UserIcon 
          class="w-5 h-5 mr-3 transition-colors"
          :class="isActive('/user-center') ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'" 
        />
        <span>个人中心</span>
        <div
          v-if="isActive('/user-center')"
          class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-full"
        ></div>
      </router-link>
    </nav>

    <!-- 邀请有礼按钮 -->
    <div class="p-4 border-t border-gray-100">
      <button @click="handleInviteClick"
              class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md">
        <GiftIcon class="w-5 h-5" />
        <span>邀请有礼</span>
      </button>
    </div>

    <!-- 底部 ICP -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  SquaresPlusIcon,
  VideoCameraIcon,
  UserIcon,
  MicrophoneIcon,
  GiftIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()

const menuItems = [
  {
    name: '首页',
    path: '/',
    icon: HomeIcon
  },
  {
    name: '形象市场',
    path: '/market',
    icon: SquaresPlusIcon
  },
  {
    name: '我的作品',
    path: '/works',
    icon: VideoCameraIcon
  },
  {
    name: '我的数字人',
    path: '/digital-human',
    icon: UserIcon
  },
  {
    name: '声音克隆',
    path: '/voice-clone',
    icon: MicrophoneIcon
  }
]

const isActive = (path) => {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}

const handleInviteClick = () => {
  window.dispatchEvent(new CustomEvent('show-invite-dialog'))
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d0d0d0;
}
</style> 