<template>
  <div class="min-h-screen bg-[#F7F8FA] dark:bg-dark-bg p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-6">我的数字人</h1>
      
      <!-- 操作按钮 -->
      <div class="flex items-center gap-4 mb-8">
        <button 
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 bg-primary dark:bg-blue-600 text-white rounded-lg hover:bg-primary/90 dark:hover:bg-blue-700 transition-colors"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          创建数字人
        </button>
      </div>

      <!-- 数字人列表 -->
      <div v-if="digitalHumans.length > 0" class="grid grid-cols-5 gap-4">
        <div v-for="item in digitalHumans" :key="item.id" 
             class="bg-white dark:bg-dark-card rounded-lg p-4 cursor-pointer hover:shadow-md dark:hover:shadow-dark-md transition-all duration-300 group">
          <div class="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-dark-card2">
            <img 
              :src="item.coverUrl" 
              alt="" 
              class="object-cover w-full h-full"
              @error="handleImageError($event, item)"
              @load="handleImageLoad($event, item)"
            />
            <div v-if="item.imageLoading" class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 border-4 border-primary dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div v-if="item.imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-card2">
              <PhotoIcon class="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <!-- 仅在未播放状态下显示黑色半透明遮罩 -->
            <div v-if="!item.isPlaying" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button @click="playVideo(item)" 
                      class="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                <div class="w-12 h-12 rounded-full bg-white/90 dark:bg-dark-card/90 flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-900 dark:text-gray-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="currentColor"/>
                  </svg>
                </div>
              </button>
            </div>
            <!-- 播放状态下仅显示暂停按钮，无黑色遮罩 -->
            <div v-else class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button @click="playVideo(item)" 
                      class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                <div class="w-10 h-10 rounded-full bg-white/90 dark:bg-dark-card/90 flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-900 dark:text-gray-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor"/>
                  </svg>
                </div>
              </button>
            </div>
            <video v-if="item.isPlaying" 
                   :src="item.videoUrl" 
                   class="absolute inset-0 w-full h-full object-cover"
                   autoplay
                   controls></video>
          </div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-gray-800 dark:text-gray-200 font-medium truncate">{{ item.name }}</h3>
            <span class="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">{{ item.status }}</span>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-3">创建时间：{{ formatDate(item.createTime) }}</div>
          <div class="mt-3 flex items-center space-x-2">
            <button 
              @click="handleUseDigitalHuman(item)"
              class="flex-1 px-3 py-2 bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-sm rounded hover:bg-primary/20 dark:hover:bg-blue-900/50">
              使用此数字人
            </button>
            <button 
              @click="handleDelete(item.id)"
              class="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态展示 -->
      <div v-else class="bg-white dark:bg-dark-card rounded-lg p-20">
        <div class="flex flex-col items-center justify-center text-center">
          <div class="w-20 h-20 bg-gray-100 dark:bg-dark-card2 rounded-full flex items-center justify-center mb-4">
            <UserCircleIcon class="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <div class="text-xl text-gray-800 dark:text-gray-200 font-medium mb-2">还没有数字人</div>
          <div class="text-gray-500 dark:text-gray-400">点击上方按钮开始创建吧</div>
        </div>
      </div>
    </div>

    <!-- 创建数字人弹窗 -->
    <CreateDigitalHuman 
      v-model:visible="showCreateModal"
      @created="handleCreated"
    />

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 w-96">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-200 mb-4">确认删除</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">确定要删除这个数字人吗？此操作不可恢复。</p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="showDeleteConfirm = false"
            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            :disabled="deleteLoading"
          >
            取消
          </button>
          <button 
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="deleteLoading"
          >
            <span v-if="deleteLoading">删除中...</span>
            <span v-else>确认删除</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useDigitalHumanStore } from '@/stores/digitalHuman'
import { PlusIcon, UserCircleIcon, TrashIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import CreateDigitalHuman from '@/components/CreateDigitalHuman.vue'
import dayjs from 'dayjs'
import request from '@/utils/request'

const router = useRouter()
const userStore = useUserStore()
const digitalHumanStore = useDigitalHumanStore()
const showGlobalMessage = inject('showGlobalMessage')
const digitalHumans = ref([])
const loading = ref(false)
const showCreateModal = ref(false)
const showDeleteConfirm = ref(false)
const deleteId = ref(null)
const deleteLoading = ref(false)

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const handleCreated = (data) => {
  if (data) {
    digitalHumans.value.unshift(data)
  }
}

// 处理图片加载错误
const handleImageError = (event, item) => {
  item.imageError = true
  item.imageLoading = false
  console.error('图片加载失败:', item.coverUrl)
}

// 处理图片加载成功
const handleImageLoad = (event, item) => {
  item.imageError = false
  item.imageLoading = false
}

// 获取数字人列表
const fetchDigitalHumans = async () => {
  try {
    loading.value = true
    console.log('开始获取数字人列表...')
    const response = await request.get('/api/digital-human/list', {
      params: {
        userId: userStore.userId || 1
      }
    })
    console.log('获取到的数字人列表响应:', response)
    
    // 为每个数字人添加图片加载状态，初始设置为 false
    digitalHumans.value = (Array.isArray(response) ? response : []).map(item => ({
      ...item,
      imageLoading: false,
      imageError: false
    }))
    console.log('设置后的digitalHumans:', digitalHumans.value)
  } catch (error) {
    console.error('获取数字人列表失败:', error)
    digitalHumans.value = []
  } finally {
    loading.value = false
  }
}

// 处理删除
const handleDelete = (id) => {
  deleteId.value = id
  showDeleteConfirm.value = true
}

// 确认删除
const confirmDelete = async () => {
  try {
    deleteLoading.value = true
    const response = await request.delete(`/api/digital-human/${deleteId.value}`)
    
    if (response.code === 200) {
      // 删除成功，刷新列表
      await fetchDigitalHumans()
      showDeleteConfirm.value = false
      showGlobalMessage('删除成功')
    } else {
      throw new Error(response.message || '删除失败')
    }
  } catch (error) {
    console.error('删除数字人失败:', error)
    showGlobalMessage(error.message || '删除失败，请重试', 'error')
  } finally {
    deleteLoading.value = false
  }
}

const playVideo = (human) => {
  // 先暂停所有视频
  digitalHumans.value.forEach(h => {
    if (h.id !== human.id) {
      h.isPlaying = false
    }
  })
  // 切换当前视频的播放状态
  human.isPlaying = !human.isPlaying
}

// 处理使用数字人
const handleUseDigitalHuman = (item) => {
  digitalHumanStore.setCurrentDigitalHuman(item.id, item.videoUrl)
  router.push('/create')
}

onMounted(() => {
  fetchDigitalHumans()
  
  // 添加事件监听器，监听登录成功后的刷新事件
  window.addEventListener('refresh-digital-humans', fetchDigitalHumans)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('refresh-digital-humans', fetchDigitalHumans)
})
</script>

<style scoped>
/* 视频播放器深色模式 */
video::-webkit-media-controls {
  @apply bg-transparent dark:bg-transparent;
}

video::-webkit-media-controls-panel {
  @apply bg-transparent dark:bg-transparent;
}

video::-webkit-media-controls-play-button {
  @apply dark:text-blue-400;
}

video::-webkit-media-controls-timeline {
  @apply dark:bg-dark-card3;
}

video::-webkit-media-controls-current-time-display,
video::-webkit-media-controls-time-remaining-display {
  @apply dark:text-gray-300;
}

video::-webkit-media-controls-volume-slider {
  @apply dark:bg-dark-card3;
}

video::-webkit-media-controls-mute-button {
  @apply dark:text-gray-300;
}
</style> 