<template>
  <div v-if="announcement && isVisible" class="announcement-container">
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6 relative">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          系统公告
        </h2>
        <button 
          @click="closeAnnouncement" 
          class="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="关闭公告">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="text-gray-700" v-html="sanitizedAnnouncement"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import request from '@/utils/request'
import DOMPurify from 'dompurify'

const announcement = ref('')
const isVisible = ref(true)

// 净化HTML内容，防止XSS攻击
const sanitizedAnnouncement = computed(() => {
  if (!announcement.value) return ''
  try {
    return DOMPurify.sanitize(announcement.value)
  } catch (error) {
    console.error('公告内容净化出错:', error)
    return '<p class="text-red-500">内容显示出错</p>'
  }
})

// 获取系统公告
const fetchAnnouncement = async () => {
  try {
    // 检查是否已关闭公告
    const hiddenUntil = localStorage.getItem('announcementHiddenUntil')
    if (hiddenUntil && parseInt(hiddenUntil) > Date.now()) {
      return
    }
    
    // 获取系统公告信息
    const response = await request.get('/api/subsite/info')
    if (response.code === 0 && response.data && response.data.announcement) {
      announcement.value = response.data.announcement
    }
  } catch (error) {
    console.error('获取系统公告失败:', error)
  }
}

// 关闭公告
const closeAnnouncement = () => {
  isVisible.value = false
  announcement.value = ''
  
  // 设置24小时内不再显示
  const tomorrow = Date.now() + 24 * 60 * 60 * 1000
  localStorage.setItem('announcementHiddenUntil', tomorrow.toString())
}

onMounted(() => {
  fetchAnnouncement()
})
</script>

<style scoped>
.announcement-container {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 