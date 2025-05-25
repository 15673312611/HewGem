<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 顶部标题 -->
    <h1 class="text-3xl font-bold mb-8 text-gray-900 flex items-center">
      <span class="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">声音克隆</span>
      <span class="ml-3 text-sm font-normal px-3 py-1 bg-blue-50 text-blue-600 rounded-full">专业定制，精准还原</span>
    </h1>

    <!-- 我的声音/收藏 切换区域 -->
    <div class="flex border-b border-gray-200 mb-8">
      <button 
        @click="currentTab = 'my'"
        class="px-8 py-4 text-base font-medium relative transition-colors duration-300"
        :class="currentTab === 'my' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'"
      >
        我的声音
        <div 
          class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform transition-transform duration-300"
          :class="currentTab === 'my' ? 'scale-x-100' : 'scale-x-0'"
        ></div>
      </button>
      <button 
        @click="switchToFavorite"
        class="px-8 py-4 text-base font-medium relative flex items-center transition-colors duration-300"
        :class="currentTab === 'favorite' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'"
      >
        <el-icon class="mr-1" :size="16">
          <Star v-if="currentTab !== 'favorite'" />
          <StarFilled v-else />
        </el-icon>
        收藏
        <div 
          class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform transition-transform duration-300"
          :class="currentTab === 'favorite' ? 'scale-x-100' : 'scale-x-0'"
        ></div>
      </button>
    </div>

    <!-- 声音列表区域 -->
    <div v-if="currentTab === 'my'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- 新增克隆声音卡片 -->
      <div 
        @click="showUploadModal = true"
        class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center group relative border border-blue-100 overflow-hidden"
      >
        <div class="absolute right-0 bottom-0 w-20 h-20 rounded-full bg-blue-200 opacity-50 -mr-6 -mb-6"></div>
        <div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300">
          <span class="text-white text-2xl font-bold leading-none">+</span>
        </div>
        <div class="relative z-10">
          <div class="text-gray-900 font-medium text-base">新增克隆声音</div>
          <div class="text-blue-600 text-sm mt-1">3s极速克隆声音</div>
        </div>
      </div>

      <!-- 克隆声音列表 -->
      <template v-for="voice in myVoiceList" :key="voice.id">
        <div class="bg-white rounded-xl p-6 group relative shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
          <!-- 播放按钮和信息 -->
          <div class="flex items-center">
            <button 
              @click="playVoice(voice)"
              class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-all duration-300 relative shadow-sm"
            >
              <div v-if="!isPlayingMap[voice.id]" class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1"></div>
              <i v-else class="fas fa-pause text-blue-600 text-lg"></i>
            </button>
            <div>
              <div class="text-gray-900 font-medium text-base">{{ voice.name }}</div>
              <div class="text-gray-500 text-sm mt-1">{{ voice.type }}</div>
            </div>
            
            <!-- 更多操作按钮 -->
            <div class="absolute top-6 right-6 flex items-center space-x-2 z-10">
              <!-- 去创作按钮 -->
              <button 
                class="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                @click="goToCreate(voice)"
              >
                去创作
              </button>
              
              <!-- 三个点菜单 -->
              <div class="relative">
                <button 
                  @click="toggleMenu(voice.id)"
                  class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <div class="flex space-x-0.5">
                    <div class="w-1 h-1 rounded-full bg-current"></div>
                    <div class="w-1 h-1 rounded-full bg-current"></div>
                    <div class="w-1 h-1 rounded-full bg-current"></div>
                  </div>
                </button>
                
                <!-- 下拉菜单 -->
                <div 
                  v-if="activeMenu === voice.id"
                  class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100"
                >
                  <button 
                    @click="renameVoice(voice)"
                    class="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    重命名
                  </button>
                  <button 
                    @click="deleteVoice(voice.id)"
                    class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 收藏列表 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="favoriteList.length > 0">
        <div
          v-for="voice in favoriteList"
          :key="voice.id"
          class="bg-white rounded-xl p-5 flex items-start space-x-4 hover:shadow-md transition-all duration-300 group border border-gray-100"
        >
          <!-- 播放按钮 -->
          <div class="flex-shrink-0">
            <button
              @click="playVoice(voice.voiceUrl)"
              class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-all duration-300 relative shadow-sm"
            >
              <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1"></div>
            </button>
          </div>

          <!-- 文字信息 -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2">
              <h3 class="text-gray-900 font-medium truncate">{{ voice.name }}</h3>
              <div class="flex items-center">
                <el-icon :size="16" :color="voice.gender === 1 ? '#3b82f6' : '#ec4899'">
                  <Male v-if="voice.gender === 1" />
                  <Female v-else />
                </el-icon>
              </div>
            </div>
            <div class="text-gray-500 text-sm mt-1">中文</div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex items-center space-x-2">
            <button 
              @click="toggleFavorite(voice)"
              class="p-2 rounded-full hover:bg-blue-50 transition-colors text-blue-600"
            >
              <el-icon :size="20">
                <StarFilled />
              </el-icon>
            </button>
            <button 
              class="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              @click="goToCreate(voice)"
            >
              去创作
            </button>
          </div>
        </div>
      </template>
      <!-- 空状态提示 -->
      <div v-else class="text-center py-20 bg-white rounded-xl col-span-full shadow-sm border border-gray-100">
        <div class="mb-4 text-blue-200">
          <el-icon :size="64">
            <Star />
          </el-icon>
        </div>
        <p class="text-gray-500">暂无收藏的声音</p>
      </div>
    </div>

    <!-- 公共配音区域 -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-8 text-gray-900 flex items-center">
        <span class="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">公共配音</span>
      </h2>
      
      <!-- 分类标签 -->
      <div class="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="handleCategoryChange(category.id)"
          class="px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap font-medium text-sm"
          :class="[
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- 音色列表 -->
      <div v-loading="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-if="voices.length > 0">
          <div
            v-for="voice in voices"
            :key="voice.id"
            class="bg-white rounded-xl p-5 flex items-start space-x-4 hover:shadow-md transition-all duration-300 group border border-gray-100"
          >
            <!-- 播放按钮 -->
            <div class="flex-shrink-0">
              <button
                @click="playVoice(voice.voiceUrl)"
                class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-all duration-300 relative shadow-sm"
              >
                <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1"></div>
              </button>
            </div>

            <!-- 文字信息 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2">
                <h3 class="text-gray-900 font-medium truncate">{{ voice.name }}</h3>
                <div class="flex items-center">
                  <el-icon :size="16" :color="voice.gender === 1 ? '#3b82f6' : '#ec4899'">
                    <Male v-if="voice.gender === 1" />
                    <Female v-else />
                  </el-icon>
                </div>
              </div>
              <div class="text-gray-500 text-sm mt-1">中文</div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center space-x-2">
              <button 
                @click="toggleFavorite(voice)"
                class="p-2 rounded-full hover:bg-blue-50 transition-colors"
                :class="{'text-blue-600': voice.isFavorite, 'text-gray-400': !voice.isFavorite}"
              >
                <el-icon :size="20">
                  <Star v-if="!voice.isFavorite" />
                  <StarFilled v-else />
                </el-icon>
              </button>
              <button 
                class="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                @click="goToCreate(voice)"
              >
                去创作
              </button>
            </div>
          </div>
        </template>
        <!-- 空状态提示 -->
        <div v-else class="text-center py-20 bg-white rounded-xl col-span-full shadow-sm border border-gray-100">
          <div class="mb-4 text-blue-200">
            <svg class="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1-10c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" fill="currentColor"/>
            </svg>
          </div>
          <p class="text-gray-500">暂无配音数据</p>
        </div>
      </div>
    </div>

    <!-- 上传模态框 -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="closeUploadModal"></div>
      <div class="relative bg-white rounded-xl w-[600px] shadow-2xl overflow-hidden">
        <!-- 头部标题和关闭按钮 -->
        <div class="flex justify-between items-center p-6 pb-4 border-b">
          <h3 class="text-xl font-semibold text-gray-900">上传音频</h3>
          <button 
            @click="closeUploadModal" 
            class="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 提示信息 -->
        <div class="mx-6 mt-6 bg-blue-50 rounded-lg p-4 mb-4 flex items-start border border-blue-100">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-gray-700 ml-3">如何让复刻的声音效果更好？</span>
        </div>

        <!-- 上传区域 -->
        <div class="px-6">
          <div v-if="!hasFile" class="mb-6">
            <div
              class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <input
                type="file"
                accept="audio/*,video/mp4"
                @change="handleFileChange"
                class="hidden"
                ref="fileInput"
              />
              <div class="flex flex-col items-center">
                <svg class="w-16 h-16 text-blue-100 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-gray-700 mb-2 font-medium">点击上传/拖拽音频或视频文件到这里</p>
                <p class="text-sm text-gray-500">支持mp3/wav/mp4格式，文件大小不超过150MB</p>
                <p class="text-sm text-gray-500 mt-1">最短5s，最长5min，建议30s左右</p>
              </div>
            </div>
          </div>

          <!-- 已上传文件预览 -->
          <div v-else>
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <p class="text-gray-900 break-all pr-2 flex-1">{{ selectedFile.name }}</p>
                <button 
                  @click="resetUploadState"
                  class="inline-flex items-center justify-center p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="取消上传"
                >
                  <svg class="w-4 h-4 text-gray-400 hover:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="flex items-center">
                <button 
                  class="relative w-12 h-12 bg-white border-2 border-blue-500 rounded-lg text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors mr-4 group shadow-sm" 
                  @click="togglePlay"
                >
                  <div v-if="!isPlaying" class="w-6 h-6">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div v-else class="w-6 h-6">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  </div>
                </button>
                <div class="flex-1">
                  <div class="bg-gray-200 h-1.5 rounded-full">
                    <div class="bg-blue-500 h-full rounded-full" :style="{ width: progress + '%' }"></div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{{ formatTime(currentTime) }}</span>
                    <span>{{ formatTime(duration) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <p class="text-gray-600">已上传：{{ formatTime(duration) }}</p>
            </div>
            
            <!-- 声音名称输入 -->
            <div class="mb-4">
              <input
                type="text"
                v-model="voiceName"
                placeholder="请输入声音名称"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base transition-colors"
              />
            </div>

            <!-- 用户协议 -->
            <div class="flex items-center mb-6">
              <input
                type="checkbox"
                id="agreement"
                v-model="agreement"
                class="rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label for="agreement" class="ml-2 text-gray-600 text-sm">
                我已阅读并同意
                <a href="#" class="text-blue-500 hover:text-blue-600 hover:underline">使用者承诺</a>
              </label>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="flex justify-end py-6 border-t mt-4">
            <button
              @click="handleSubmit"
              class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-base transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              :disabled="!canSubmit"
            >
              立即复刻
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 重命名对话框 -->
    <el-dialog
      v-model="showRenameDialog"
      title="重命名"
      width="400px"
      :close-on-click-modal="false"
      :show-close="true"
      class="rename-dialog"
    >
      <el-input
        v-model="newVoiceName"
        placeholder="请输入新的名称"
        @keyup.enter="confirmRename"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showRenameDialog = false">取消</el-button>
          <el-button type="primary" color="#3b82f6" @click="confirmRename">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Male, Female, Star, StarFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const showUploadModal = ref(false)
const selectedFile = ref(null)
const currentTab = ref('my')
const category = ref('all')
const myVoiceList = ref([])
const favoriteList = ref([])
const publicVoiceList = ref([])
const fileInput = ref(null)
const hasFile = ref(false)
const voiceName = ref('')
const agreement = ref(false)

// 音频播放相关的状态
const isPlayingMap = ref({})
const audioElements = ref({})
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const audioElement = ref(null)

// 添加新的响应式变量
const activeMenu = ref(null)
const showRenameDialog = ref(false)
const currentVoice = ref(null)
const newVoiceName = ref('')
const isComponentMounted = ref(true) // 添加组件挂载状态标志

const canSubmit = computed(() => {
  return hasFile.value && voiceName.value.trim() && agreement.value
})

const closeUploadModal = () => {
  showUploadModal.value = false
  resetUploadState()
}

const resetUploadState = () => {
  selectedFile.value = null
  hasFile.value = false
  voiceName.value = ''
  agreement.value = false
  isPlaying.value = false
  isMuted.value = false
  currentTime.value = 0
  duration.value = 0
  progress.value = 0
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
}

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = (file) => {
  // 验证文件大小（150MB）
  if (file.size > 150 * 1024 * 1024) {
    ElMessage.warning('文件大小不能超过150MB')
    return
  }

  // 验证文件类型
  const validTypes = ['audio/mpeg', 'audio/wav', 'video/mp4']
  if (!validTypes.includes(file.type)) {
    ElMessage.warning('只支持MP3、WAV、MP4格式')
    return
  }

  selectedFile.value = file
  hasFile.value = true

  // 创建音频预览
  if (audioElement.value) {
    audioElement.value.pause()
  }
  audioElement.value = new Audio(URL.createObjectURL(file))
  audioElement.value.addEventListener('loadedmetadata', () => {
    duration.value = audioElement.value.duration
    // 验证音频时长
    if (duration.value < 5) {
      ElMessage.warning('音频时长不能少于5秒')
      resetUploadState()
      return
    }
    if (duration.value > 300) { // 5分钟 = 300秒
      ElMessage.warning('音频时长不能超过5分钟')
      resetUploadState()
      return
    }
  })
  audioElement.value.addEventListener('timeupdate', () => {
    currentTime.value = audioElement.value.currentTime
    progress.value = (currentTime.value / duration.value) * 100
  })
}

const togglePlay = () => {
  if (!audioElement.value) return
  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const toggleMute = () => {
  if (!audioElement.value) return
  audioElement.value.muted = !audioElement.value.muted
  isMuted.value = audioElement.value.muted
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const removeFile = () => {
  resetUploadState()
}

const handleSubmit = async () => {
  if (!canSubmit.value) return

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('name', voiceName.value)
  formData.append('uid', userStore.user.id)

  try {
    await request.post('/api/voice-clone/create', formData)
    ElMessage.success('声音克隆创建成功')
    closeUploadModal()
    // 立即刷新列表
    await fetchMyVoiceList()
  } catch (error) {
    ElMessage.error(error.message || '创建失败')
  }
}

const fetchMyVoiceList = async () => {
  try {
    console.log('开始获取我的声音列表')
    console.log('当前用户ID:', userStore.user?.id)
    
    const response = await request.get('/api/voice-clone/list', {
      params: { 
        userId: userStore.user?.id,
        type: 'my'
      }
    })
    
    console.log('API返回的原始数据:', response)
    
    // 直接使用response，因为它已经是数组了
    const voiceData = response || []
    console.log('处理后的声音列表数据:', voiceData)
    
    myVoiceList.value = voiceData.map(voice => ({
      ...voice,
      type: '中文' // 添加默认type
    }))
    
    console.log('最终设置到视图的数据:', myVoiceList.value)
  } catch (error) {
    console.error('获取声音列表失败:', error)
    myVoiceList.value = []
  }
}

const fetchFavoriteList = async () => {
  try {
    const response = await request.get('/api/voice/favorite/list')
    favoriteList.value = response || []
  } catch (error) {
    console.error('获取收藏列表失败:', error)
    favoriteList.value = []
  }
}

const fetchPublicVoiceList = async () => {
  try {
    const response = await request.get('/api/voice-clone/list', {
      params: { 
        userId: userStore.user?.id,
        type: 'public'
      }
    })
    publicVoiceList.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('获取公共配音列表失败:', error)
    publicVoiceList.value = []
  }
}

const deleteVoice = async (id) => {
  try {
    await request.delete(`/api/voice-clone/${id}`)
    ElMessage.success('删除成功')
    fetchMyVoiceList()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const toggleFavorite = async (voice) => {
  if (!userStore.user?.id) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    if (voice.isFavorite) {
      // 如果已经收藏，执行取消收藏操作
      await request.delete(`/api/voice/favorite/${voice.id}`)
      ElMessage.success('取消收藏成功')
      voice.isFavorite = false
    } else {
      // 如果未收藏，执行添加收藏操作
      await request.post(`/api/voice/favorite/${voice.id}`)
      ElMessage.success('收藏成功')
      voice.isFavorite = true
    }
    
    // 如果在收藏页面，需要刷新列表
    if (currentTab.value === 'favorite') {
      fetchFavoriteList()
    }
  } catch (error) {
    ElMessage.error(error.message || '操作失败')
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

const removeFavorite = async (id) => {
  try {
    await request.delete(`/api/voice/favorite/${id}`)
    ElMessage.success('取消收藏成功')
    fetchFavoriteList()
  } catch (error) {
    ElMessage.error('取消收藏失败')
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const seekAudio = (event) => {
  if (!audioElement.value) return
  const rect = event.target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  const newTime = percentage * duration.value
  audioElement.value.currentTime = newTime
}

// 播放声音的方法
const playVoice = (voice) => {
  if (!isComponentMounted.value) return // 如果组件已卸载，直接返回

  // 如果传入的是URL字符串，转换为对象格式
  const voiceData = typeof voice === 'string' ? {
    id: `url_${btoa(voice)}`, // 使用编码后的URL作为唯一ID
    voiceUrl: voice
  } : {
    ...voice,
    voiceUrl: voice.voiceUrl // 使用正确的voiceUrl字段
  };

  if (!voiceData.voiceUrl) {
    console.error('音频URL不存在:', voiceData)
    ElMessage.error('音频文件不存在')
    return
  }

  // 停止其他正在播放的音频
  Object.entries(audioElements.value).forEach(([id, otherAudio]) => {
    if (id !== voiceData.id) {
      try {
        otherAudio.pause()
        otherAudio.currentTime = 0 // 重置播放进度
        isPlayingMap.value[id] = false
      } catch (error) {
        console.error('停止其他音频时出错:', error)
      }
    }
  })

  // 如果这个音频还没有创建过音频元素，就创建一个
  if (!audioElements.value[voiceData.id]) {
    const audio = new Audio(voiceData.voiceUrl)
    
    // 添加事件监听器
    const handleEnded = () => {
      if (!isComponentMounted.value) return // 如果组件已卸载，不执行后续操作
      isPlayingMap.value[voiceData.id] = false
    }
    
    const handleError = () => {
      if (!isComponentMounted.value) return // 如果组件已卸载，不执行后续操作
      console.error('音频加载失败:', voiceData.voiceUrl)
      isPlayingMap.value[voiceData.id] = false
      ElMessage.error('音频加载失败')
    }
    
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    
    audioElements.value[voiceData.id] = audio
  }

  const audio = audioElements.value[voiceData.id]

  if (isPlayingMap.value[voiceData.id]) {
    try {
      audio.pause()
      audio.currentTime = 0 // 重置播放进度
      isPlayingMap.value[voiceData.id] = false
    } catch (error) {
      console.error('暂停音频时出错:', error)
    }
  } else {
    try {
      audio.play().catch(error => {
        if (!isComponentMounted.value) return // 如果组件已卸载，不执行后续操作
        console.error('播放失败:', error)
        isPlayingMap.value[voiceData.id] = false
        ElMessage.error('播放失败')
      })
      isPlayingMap.value[voiceData.id] = true
    } catch (error) {
      if (!isComponentMounted.value) return // 如果组件已卸载，不执行后续操作
      console.error('播放出错:', error)
      isPlayingMap.value[voiceData.id] = false
      ElMessage.error('播放出错')
    }
  }
}

// 切换菜单显示状态
const toggleMenu = (voiceId) => {
  activeMenu.value = activeMenu.value === voiceId ? null : voiceId
}

// 重命名声音
const renameVoice = (voice) => {
  currentVoice.value = voice
  newVoiceName.value = voice.name
  showRenameDialog.value = true
  activeMenu.value = null // 关闭菜单
}

// 修改确认重命名方法
const confirmRename = async () => {
  if (!newVoiceName.value.trim()) {
    ElMessage.warning('名称不能为空')
    return
  }

  try {
    await request.patch(`/api/voice-clone/${currentVoice.value.id}?name=${encodeURIComponent(newVoiceName.value.trim())}`)
    ElMessage.success('重命名成功')
    await fetchMyVoiceList()
    showRenameDialog.value = false
  } catch (error) {
    ElMessage.error(error.message || '重命名失败')
  }
}

// 去创作
const goToCreate = (voice) => {
  // 跳转到声音创作页面
  router.push({
    path: '/voice-create',
    query: {
      voiceId: voice.voiceId,
      voiceName: voice.name
    }
  })
}

// 组件卸载时清理音频资源
onUnmounted(() => {
  isComponentMounted.value = false // 标记组件已卸载
  // 停止所有音频播放
  Object.entries(audioElements.value).forEach(([id, audio]) => {
    try {
      audio.pause()
      audio.src = ''
      audio.removeEventListener('ended', () => {})
      audio.removeEventListener('error', () => {})
      isPlayingMap.value[id] = false
    } catch (error) {
      console.error('清理音频资源时出错:', error)
    }
  })
  // 清空音频元素和播放状态
  audioElements.value = {}
  isPlayingMap.value = {}
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
  document.removeEventListener('click', () => {})
})

onMounted(() => {
  console.log('组件挂载，开始获取数据')
  fetchCategories()
  // 初始化时获取全部音色列表
  fetchVoices('all')
  fetchMyVoiceList()
  fetchFavoriteList()
  fetchPublicVoiceList()
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      activeMenu.value = null
    }
  })
})

// 监听currentTab的变化，切换到"我的"时刷新列表
watch(currentTab, (newVal) => {
  if (newVal === 'my') {
    fetchMyVoiceList()
  }
})

const categories = ref([])
const voices = ref([])
const selectedCategory = ref('all')
const loading = ref(false)

// 获取分类列表
const fetchCategories = async () => {
  try {
    const response = await request.get('/api/voice/categories')
    categories.value = [
      { id: 'all', name: '全部' },
      { id: 'hot', name: '热门' },
      ...response
    ]
  } catch (error) {
    ElMessage.error('获取分类失败')
  }
}

// 获取音色列表
const fetchVoices = async (categoryId) => {
  loading.value = true
  try {
    console.log('开始获取音色列表, 分类ID:', categoryId)
    let url = '/api/voice/list'
    if (categoryId === 'hot') {
      url = '/api/voice/hot'
    } else if (categoryId !== 'all') {
      url = `/api/voice/list/${categoryId}`
    }
    console.log('请求URL:', url)
    const response = await request.get(url)
    console.log('获取到的音色列表:', response)
    
    // 获取收藏状态
    const favoriteStatus = await request.get('/api/voice/favorite/status', {
      params: { 
        voiceIds: response.map(v => v.id).join(',')
      }
    })
    
    // 合并收藏状态
    voices.value = response.map(voice => ({
      ...voice,
      isFavorite: favoriteStatus[voice.id] || false
    }))
  } catch (error) {
    console.error('获取音色列表失败:', error)
    ElMessage.error('获取音色列表失败')
    voices.value = []
  } finally {
    loading.value = false
  }
}

// 切换分类
const handleCategoryChange = (categoryId) => {
  console.log('切换分类:', categoryId)
  selectedCategory.value = categoryId
  fetchVoices(categoryId)
}

// 切换到收藏页面
const switchToFavorite = async () => {
  currentTab.value = 'favorite'
  if (favoriteList.value.length === 0) {
    await fetchFavoriteList()
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.rename-dialog :deep(.el-dialog__header) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
  margin: 0 20px;
}
.rename-dialog :deep(.el-dialog__body) {
  padding-top: 24px;
}
.rename-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin: 0 20px;
}
</style> 