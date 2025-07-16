<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
    <div class="relative bg-white dark:bg-dark-card rounded-xl w-[900px] h-[600px] overflow-hidden flex flex-col">
      <!-- 头部标题和关闭按钮 -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">选择声音</h3>
        <button @click="closeModal" class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- 主体内容 -->
      <div class="flex-1 overflow-hidden flex">
        <!-- 左侧分类 -->
        <div class="w-48 bg-gray-50 dark:bg-dark-card2 p-4 overflow-y-auto">
          <div class="mb-6">
            <div class="font-semibold text-gray-500 dark:text-gray-400 text-sm mb-2">我的声音</div>
            <button 
              @click="handleCategoryChange('favorite')"
              class="flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors mb-2"
              :class="[selectedCategory === 'favorite' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300']"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" :fill="selectedCategory === 'favorite' ? 'currentColor' : 'none'" />
              </svg>
              <span>我的收藏</span>
            </button>
          </div>
          
          <div>
            <div class="font-semibold text-gray-500 dark:text-gray-400 text-sm mb-2">声音分类</div>
            <button 
              @click="handleCategoryChange('all')"
              class="w-full text-left px-4 py-2 rounded-lg transition-colors mb-2"
              :class="[selectedCategory === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300']"
            >
              全部声音
            </button>
            <button 
              v-for="category in voiceCategories" 
              :key="category.id"
              @click="handleCategoryChange(category.id)"
              class="w-full text-left px-4 py-2 rounded-lg transition-colors mb-2"
              :class="[selectedCategory === category.id ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300']"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        
        <!-- 右侧声音列表 -->
        <div class="flex-1 p-6 overflow-y-auto bg-white dark:bg-dark-card">
          <div v-if="loadingVoices" class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
          </div>
          
          <div v-else-if="voices.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg class="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none">
              <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-gray-600 dark:text-gray-300 font-medium">该分类下暂无声音</p>
          </div>
          
          <div v-else class="grid grid-cols-2 gap-4">
            <div 
              v-for="voice in voices" 
              :key="voice.id"
              class="bg-white dark:bg-dark-card2 border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:shadow-md dark:hover:shadow-dark-md transition-shadow cursor-pointer"
              :class="{ 'border-blue-500 dark:border-blue-600': selectedVoice?.id === voice.id }"
              @click="selectVoice(voice)"
            >
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none">
                    <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-800 dark:text-gray-200">{{ voice.name }}</span>
                    <div class="flex items-center space-x-1">
                      <button 
                        @click.stop="toggleVoiceFavorite(voice)"
                        class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        :class="{ 'text-yellow-500 dark:text-yellow-400': voice.isFavorite, 'text-gray-400 dark:text-gray-500': !voice.isFavorite }"
                      >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" :fill="voice.isFavorite ? 'currentColor' : 'none'">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </button>
                      <button 
                        @click.stop="playPreviewVoice(voice)"
                        class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                      >
                        <svg v-if="!voicePlayingMap[voice.id]" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                        <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ getCategoryName(voice.categoryId) }}</div>
                  <div class="mt-2 text-sm text-blue-500 dark:text-blue-400 font-medium" v-if="selectedVoice?.id === voice.id">
                    已选择
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
        <button 
          @click="closeModal" 
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
        >
          取消
        </button>
        <button 
          @click="confirmVoiceSelection" 
          class="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          :disabled="!selectedVoice"
        >
          确认选择
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:show', 'confirm'])
const userStore = useUserStore()

const selectedCategory = ref('all')
const voiceCategories = ref([])
const voices = ref([])
const loadingVoices = ref(false)
const selectedVoice = ref(null)
const voicePlayingMap = ref({})
const voicePreviewElements = ref({})

const closeModal = () => {
  emit('update:show', false)
}

const fetchVoiceCategories = async () => {
  try {
    const response = await fetch('/api/voice/categories', {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    const result = await response.json()
    voiceCategories.value = result || []
  } catch (error) {
    console.error('获取声音分类失败:', error)
  }
}

const fetchVoices = async (categoryId) => {
  loadingVoices.value = true
  try {
    let url = '/api/voice/list'
    if (categoryId === 'favorite') {
      url = '/api/voice/favorite/list'
    } else if (categoryId !== 'all') {
      url = `/api/voice/list/${categoryId}`
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    
    const result = await response.json()
    
    if (categoryId !== 'favorite' && result?.length > 0) {
      const voiceIds = result.map(v => v.id).join(',')
      const favoriteResponse = await fetch(`/api/voice/favorite/status?voiceIds=${voiceIds}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      const favoriteStatus = await favoriteResponse.json()
      
      voices.value = result.map(voice => ({
        ...voice,
        isFavorite: favoriteStatus[voice.id] || false
      }))
    } else if (categoryId === 'favorite') {
      voices.value = result.map(voice => ({ ...voice, isFavorite: true }))
    } else {
      voices.value = result.map(voice => ({ ...voice, isFavorite: false }))
    }
  } catch (error) {
    console.error('获取声音列表失败:', error)
    voices.value = []
  } finally {
    loadingVoices.value = false
  }
}

const handleCategoryChange = (categoryId) => {
  selectedCategory.value = categoryId
  fetchVoices(categoryId)
}

const getCategoryName = (categoryId) => {
  const category = voiceCategories.value.find(c => c.id === categoryId)
  return category ? category.name : '未知分类'
}

const selectVoice = (voice) => {
  selectedVoice.value = voice
}

const confirmVoiceSelection = () => {
  if (selectedVoice.value) {
    emit('confirm', selectedVoice.value)
    closeModal()
  }
}

const playPreviewVoice = (voice) => {
  Object.keys(voicePlayingMap.value).forEach(id => {
    if (id !== voice.id && voicePlayingMap.value[id]) {
      const audio = voicePreviewElements.value[id]
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      voicePlayingMap.value[id] = false
    }
  })
  
  if (!voicePreviewElements.value[voice.id]) {
    const audio = new Audio(voice.voiceUrl)
    audio.addEventListener('ended', () => {
      voicePlayingMap.value[voice.id] = false
    })
    voicePreviewElements.value[voice.id] = audio
  }
  
  const audio = voicePreviewElements.value[voice.id]
  if (voicePlayingMap.value[voice.id]) {
    audio.pause()
    voicePlayingMap.value[voice.id] = false
  } else {
    audio.play().catch(error => console.error('播放预览失败:', error))
    voicePlayingMap.value[voice.id] = true
  }
}

const toggleVoiceFavorite = async (voice) => {
  try {
    const url = `/api/voice/favorite/${voice.id}`
    const response = await fetch(url, {
      method: voice.isFavorite ? 'DELETE' : 'POST',
      headers: { 'Authorization': `Bearer ${userStore.token}` }
    })
    
    if (response.ok) {
      voice.isFavorite = !voice.isFavorite
      ElMessage.success(voice.isFavorite ? '收藏成功' : '取消收藏成功')
      if (selectedCategory.value === 'favorite') {
        fetchVoices('favorite')
      }
    } else {
      const error = await response.json()
      throw new Error(error.message || '操作失败')
    }
  } catch (error) {
    console.error('操作收藏失败:', error)
    ElMessage.error(error.message || '操作失败，请稍后重试')
  }
}

watch(() => props.show, (isVisible) => {
  if (isVisible) {
    fetchVoiceCategories()
    fetchVoices('all')
  } else {
    Object.values(voicePreviewElements.value).forEach(audio => {
      if (audio) audio.pause()
    })
  }
})

onUnmounted(() => {
  Object.values(voicePreviewElements.value).forEach(audio => {
    if (audio) {
      audio.pause()
      audio.src = ''
    }
  })
})
</script>

<style scoped>
/* Grid layout for voices */
.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style> 