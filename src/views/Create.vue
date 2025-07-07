<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg p-6">
    <div class="grid grid-cols-[1fr,360px] gap-6 h-full">
      <!-- 左侧上传区域 -->
      <div class="bg-white dark:bg-dark-card rounded-lg p-8 shadow-sm dark:shadow-dark-sm">
        <div class="h-full flex flex-col">
          <!-- 作品名称输入框 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">作品名称 <span class="text-red-500">*</span></label>
            <el-input
              v-model="form.name"
              placeholder="请输入作品名称"
              :maxlength="50"
              show-word-limit
              :class="{ 'is-error': !form.name && formSubmitted }"
              class="dark:text-gray-300"
            />
            <div v-if="!form.name && formSubmitted" class="text-red-500 text-xs mt-1">请输入作品名称</div>
          </div>

          <!-- 上传区域 -->
          <div 
            class="flex-1 border-2 border-dashed border-gray-200 dark:border-dark-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/60 dark:hover:border-blue-500/60 transition-colors min-h-[330px]"
            @drop.prevent="handleFileDrop"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @click="triggerFileInput"
            :class="{ 
              'border-primary/60 bg-blue-50/30 dark:border-blue-500/60 dark:bg-blue-900/20': isDragging,
              'border-red-500': !uploadFile && !videoUrl && formSubmitted 
            }"
          >
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleFileChange"
              accept=".mp4,.avi,.mov"
            />
            
            <!-- 视频预览 -->
            <div v-if="videoUrl" class="w-full h-full relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <video 
                  :src="videoUrl" 
                  class="max-w-[90%] max-h-[90%] object-contain"
                  controls
                ></video>
              </div>
              <button 
                @click.stop="removeVideo"
                class="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
            
            <!-- 上传提示 -->
            <div v-else class="text-center">
              <div class="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CloudArrowUpIcon class="w-10 h-10 text-primary dark:text-blue-400" />
              </div>
              <div class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                {{ uploadFile ? uploadFile.name : '点击或拖拽视频到这里' }} <span class="text-red-500">*</span>
              </div>
              <div v-if="!uploadFile && formSubmitted" class="text-red-500 text-sm mb-3">请上传视频文件</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">支持的格式：</div>
              <div class="text-sm text-gray-400 dark:text-gray-500">
                <div class="mb-1">视频：MP4、AVI、MOV (不超过200MB)</div>
              </div>
            </div>

            <!-- 添加合成中的状态显示 -->
            <div v-if="loading" class="absolute inset-0 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
              <div class="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary dark:border-blue-400"></div>
              </div>
              <div class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">正在合成中</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">请稍候，我们正在为您生成视频...</div>
            </div>
          </div>

          <!-- 输入区域 -->
          <div class="mt-8">
            <div class="flex items-center space-x-4 mb-4">
              <button 
                class="flex items-center px-6 py-2.5 rounded-lg transition-colors"
                :class="[
                  isAudioMode 
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card2' 
                    : 'text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                ]"
                @click="toggleMode('text')"
              >
                <MicrophoneIcon class="w-5 h-5 mr-2" />
                文本转语音
              </button>
              <button 
                class="flex items-center px-6 py-2.5 rounded-lg transition-colors"
                :class="[
                  isAudioMode 
                    ? 'text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card2'
                ]"
                @click="toggleMode('audio')"
              >
                <MusicalNoteIcon class="w-5 h-5 mr-2" />
                上传音频
              </button>
            </div>

            <!-- 文本转语音模式 -->
            <template v-if="!isAudioMode">
              <textarea
                v-model="inputText"
                rows="6"
                placeholder="请输入要转换的文本内容（最多450字）；在点击开始生成后，请耐心等待，不要进行切换或者刷新页面。注意！不要输入或上传反法相关内容，又或侵犯第三方权益或版权内容。服务器日志均有详细记录。"
                class="w-full bg-gray-50 dark:bg-dark-card2 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-primary/30 dark:focus:ring-blue-500/30 border border-gray-100 dark:border-dark-border"
                :class="{ 'border-red-500': !inputText && formSubmitted && !isAudioMode }"
              ></textarea>
              <div v-if="!inputText && formSubmitted && !isAudioMode" class="text-red-500 text-xs mt-1">请输入要转换的文本内容</div>
              
              <div class="flex items-center justify-between mt-2">
                <div :class="{ 'text-red-500': inputText.length > 450 }" class="text-xs text-gray-500 dark:text-gray-400">{{ inputText.length }}/450</div>
              </div>
            </template>

            <!-- 上传音频模式 -->
            <template v-else>
              <div class="w-full bg-white dark:bg-dark-card2 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border min-h-[200px] flex flex-col items-center justify-center cursor-pointer"
                   @click="triggerAudioInput"
                   @drop.prevent="handleAudioDrop"
                   @dragover.prevent="isAudioDragging = true"
                   @dragleave.prevent="isAudioDragging = false"
                   :class="{ 'border-primary/60 bg-blue-50/30 dark:border-blue-500/60 dark:bg-blue-900/20': isAudioDragging }">
                <input
                  type="file"
                  ref="audioInput"
                  class="hidden"
                  @change="handleAudioChange"
                  accept=".mp3,.wav"
                />
                <div class="w-16 h-16 bg-gray-50 dark:bg-dark-card3 rounded-full flex items-center justify-center mb-4">
                  <MusicalNoteIcon class="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <div class="text-gray-500 dark:text-gray-400">{{ audioFile ? audioFile.name : '点击或拖拽音频文件到这里' }}</div>
                <div v-if="audioFile" class="text-xs text-primary dark:text-blue-400 mt-2">时长：{{ audioDuration }}</div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-2">支持MP3、WAV格式，不超过20MB</div>
              </div>
            </template>
          </div>

          <!-- 生成按钮 -->
          <button class="mt-8 w-full bg-gradient-to-r from-primary to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm dark:shadow-dark-sm"
                  @click="handleSubmit"
                  :loading="loading"
                  :disabled="loading">
            {{ loading ? '创建中...' : '创建' }}
          </button>
        </div>
      </div>

      <!-- 右侧音色选择 -->
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm dark:shadow-dark-sm">
        <h2 class="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">选择音色 <span class="text-red-500" v-if="!isAudioMode">*</span></h2>
        
        <!-- 音色选择区域 -->
        <div>
          <div class="flex space-x-4 mb-4">
            <button
              @click="currentVoiceTab = 'system'"
              class="px-6 py-3 rounded-lg text-base transition-all duration-300"
              :class="currentVoiceTab === 'system' ? 'bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white shadow-lg dark:shadow-dark-lg' : 'bg-white dark:bg-dark-card2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-700/50'"
            >
              系统音色
            </button>
            <button
              @click="currentVoiceTab = 'custom'"
              class="px-6 py-3 rounded-lg text-base transition-all duration-300"
              :class="currentVoiceTab === 'custom' ? 'bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white shadow-lg dark:shadow-dark-lg' : 'bg-white dark:bg-dark-card2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-purple-300 dark:hover:border-purple-700/50'"
            >
              自定义音色
            </button>
          </div>

          <div v-if="!selectedVoice && formSubmitted && !isAudioMode" class="text-red-500 text-xs mb-2">请选择音色</div>

          <!-- 音色列表 -->
          <div class="h-[500px] overflow-y-auto pr-4 space-y-4 pb-4" style="scrollbar-width: thin;">
            <template v-if="currentVoiceTab === 'system'">
              <!-- 收藏的声音 -->
              <template v-if="favoriteVoices.length > 0">
                <div
                  v-for="voice in favoriteVoices"
                  :key="'fav-' + voice.id"
                  class="bg-white dark:bg-dark-card2 rounded-lg p-5 flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-dark-card3 group cursor-pointer shadow-soft hover:shadow-soft-md border-2"
                  :class="[selectedVoice?.id === voice.id ? 'border-purple-500 dark:border-purple-600' : 'border-transparent']"
                  @click="selectVoice(voice)"
                >
                  <!-- 播放按钮 -->
                  <div class="flex-shrink-0">
                    <button
                      @click.stop="playVoice(voice)"
                      class="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-all duration-300 relative shadow-colored-sm group-hover:shadow-colored"
                    >
                      <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[14px] border-l-purple-500 dark:border-l-purple-400 border-b-[10px] border-b-transparent ml-1 group-hover:scale-110 transition-transform"></div>
                    </button>
                  </div>

                  <!-- 文字信息 -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-2">
                      <h3 class="text-[#1F2329] dark:text-gray-200 font-medium truncate">{{ voice.name }}</h3>
                      <div class="flex items-center">
                        <el-icon :size="16" :color="voice.gender === 1 ? '#8B5CF6' : '#D946EF'">
                          <Male v-if="voice.gender === 1" />
                          <Female v-else />
                        </el-icon>
                      </div>
                    </div>
                    <div class="text-[#646A73] dark:text-gray-400 text-sm mt-1">中文</div>
                  </div>
                </div>
              </template>

              <!-- 热门声音 -->
              <div
                v-for="voice in hotVoices"
                :key="'hot-' + voice.id"
                class="bg-white dark:bg-dark-card2 rounded-lg p-5 flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-dark-card3 group cursor-pointer shadow-soft hover:shadow-soft-md border-2"
                :class="[selectedVoice?.id === voice.id ? 'border-purple-500 dark:border-purple-600' : 'border-transparent']"
                @click="selectVoice(voice)"
              >
                <!-- 播放按钮 -->
                <div class="flex-shrink-0">
                  <button
                    @click.stop="playVoice(voice)"
                    class="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-all duration-300 relative shadow-colored-sm group-hover:shadow-colored"
                  >
                    <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[14px] border-l-purple-500 dark:border-l-purple-400 border-b-[10px] border-b-transparent ml-1 group-hover:scale-110 transition-transform"></div>
                  </button>
                </div>

                <!-- 文字信息 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-[#1F2329] dark:text-gray-200 font-medium truncate">{{ voice.name }}</h3>
                    <div class="flex items-center">
                      <el-icon :size="16" :color="voice.gender === 1 ? '#8B5CF6' : '#D946EF'">
                        <Male v-if="voice.gender === 1" />
                        <Female v-else />
                      </el-icon>
                    </div>
                  </div>
                  <div class="text-[#646A73] dark:text-gray-400 text-sm mt-1">中文</div>
                </div>
              </div>
            </template>

            <!-- 自定义音色列表 -->
            <template v-else>
              <div
                v-for="voice in customVoices"
                :key="voice.id"
                class="bg-white dark:bg-dark-card2 rounded-lg p-5 flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-dark-card3 group cursor-pointer shadow-soft hover:shadow-soft-md border-2"
                :class="[selectedVoice?.id === voice.id ? 'border-purple-500 dark:border-purple-600' : 'border-transparent']"
                @click="selectVoice(voice)"
              >
                <!-- 播放按钮 -->
                <div class="flex-shrink-0">
                  <button
                    @click.stop="playVoice(voice)"
                    class="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-all duration-300 relative shadow-colored-sm group-hover:shadow-colored"
                  >
                    <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[14px] border-l-purple-500 dark:border-l-purple-400 border-b-[10px] border-b-transparent ml-1 group-hover:scale-110 transition-transform"></div>
                  </button>
                </div>

                <!-- 文字信息 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-[#1F2329] dark:text-gray-200 font-medium truncate">{{ voice.name }}</h3>
                    <div class="flex items-center">
                      <el-icon :size="16" :color="voice.gender === 1 ? '#8B5CF6' : '#D946EF'">
                        <Male v-if="voice.gender === 1" />
                        <Female v-else />
                      </el-icon>
                    </div>
                  </div>
                  <div class="text-[#646A73] dark:text-gray-400 text-sm mt-1">中文</div>
                </div>
              </div>
            </template>
          </div>
          
          <!-- 分隔线 -->
          <div class="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>
          
          <!-- 语速调节滑块 - 美化版 -->
          <div class="bg-white dark:bg-dark-card2 rounded-lg p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">语速调节</label>
        </div>
              <span class="text-sm bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded font-medium">{{ speedValue.toFixed(1) }}</span>
            </div>
            <el-slider
              v-model="speedValue"
              :min="0.5"
              :max="2.0"
              :step="0.1"
              class="custom-slider"
              :format-tooltip="(val) => val.toFixed(1)"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                慢速 0.5
              </span>
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                正常 1.0
              </span>
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                快速 2.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CloudArrowUpIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  StarIcon,
  ArrowUpTrayIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Male, Female, StarFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request'
import { useRouter, useRoute } from 'vue-router'
import { useDigitalHumanStore } from '@/stores/digitalHuman'
import { uploadFileToOss } from '@/utils/oss'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const digitalHumanStore = useDigitalHumanStore()
const currentVoiceTab = ref('system')
const favoriteVoices = ref([])
const hotVoices = ref([])
const customVoices = ref([])
const selectedVoice = ref(null)
const audioElements = ref({})
const isPlayingMap = ref({})
const isComponentMounted = ref(true)
const speedValue = ref(1.1) // 默认语速值

const fileInput = ref(null)
const uploadFile = ref(null)
const isDragging = ref(false)
const isAudioMode = ref(false)
const audioInput = ref(null)
const audioFile = ref(null)
const audioDuration = ref('')
const isAudioDragging = ref(false)
const inputText = ref('')
const videoUrl = ref('')
const loading = ref(false)
const selectedType = ref('0')

const form = ref({
  name: '',
  videoFile: null,
  audioFile: null,
  text: '',
  voiceId: null,
  digitalHumanId: null
})

const rules = {
  name: [
    { required: true, message: '请输入作品名称', trigger: 'blur' },
    { max: 50, message: '作品名称不能超过50个字符', trigger: 'blur' }
  ],
  videoFile: [
    { required: true, message: '请上传视频文件', trigger: 'change' }
  ],
  voiceId: [
    { required: true, message: '请选择音色', trigger: 'change' }
  ]
}

const formSubmitted = ref(false)

const triggerFileInput = () => {
  fileInput.value.click()
}

const triggerAudioInput = () => {
  audioInput.value.click()
}

const validateFile = (file) => {
  // 检查文件类型
  const validVideoTypes = ['video/mp4', 'video/avi', 'video/quicktime']
  
  if (!validVideoTypes.includes(file.type)) {
    ElMessage.error('请上传支持的视频格式（MP4、AVI、MOV）')
    return false
  }

  // 检查文件大小
  const maxSize = 200 * 1024 * 1024 // 200MB
  
  if (file.size > maxSize) {
    ElMessage.error('视频文件大小不能超过200MB')
    return false
  }

  return true
}

// 验证音频文件
const validateAudioFile = (file) => {
  // 检查文件类型
  const validAudioTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/x-wav']
  const validExtensions = ['.mp3', '.wav']
  
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  const isValidType = validAudioTypes.includes(file.type) || validExtensions.some(ext => fileExtension === ext);
  
  if (!isValidType) {
    ElMessage.error('请上传支持的音频格式（MP3、WAV）')
    return false
  }

  // 检查文件大小
  const maxSize = 20 * 1024 * 1024 // 20MB
  
  if (file.size > maxSize) {
    ElMessage.error('音频文件大小不能超过20MB')
    return false
  }

  return true
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (validateFile(file)) {
    uploadFile.value = file
    videoUrl.value = URL.createObjectURL(file)
  }
  // 重置input值，允许重复选择同一文件
  e.target.value = ''
}

const handleFileDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (!file) return

  if (validateFile(file)) {
    uploadFile.value = file
    videoUrl.value = URL.createObjectURL(file)
  }
}

const getAudioDuration = (file) => {
  return new Promise((resolve) => {
    const audio = new Audio()
    audio.src = URL.createObjectURL(file)
    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(audio.src)
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
      resolve(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    })
  })
}

const handleAudioChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (validateAudioFile(file)) {
    audioFile.value = file
    audioDuration.value = await getAudioDuration(file)
  }
  // 重置input值，允许重复选择同一文件
  e.target.value = ''
}

const handleAudioDrop = async (e) => {
  isAudioDragging.value = false
  const file = e.dataTransfer.files[0]
  if (!file) return

  if (validateAudioFile(file)) {
    audioFile.value = file
    audioDuration.value = await getAudioDuration(file)
  }
}

const toggleMode = (mode) => {
  isAudioMode.value = mode === 'audio'
}

// 获取收藏的声音
const fetchFavoriteVoices = async () => {
  try {
    const response = await request.get('/api/voice/favorite/list', {
      params: { userId: userStore.user?.id }
    })
    favoriteVoices.value = response || []
  } catch (error) {
    console.error('获取收藏列表失败:', error)
    favoriteVoices.value = []
  }
}

// 获取热门声音
const fetchHotVoices = async () => {
  try {
    const response = await request.get('/api/voice/hot')
    // 过滤掉已收藏的声音
    const favoriteIds = new Set(favoriteVoices.value.map(v => v.id))
    hotVoices.value = response.filter(voice => !favoriteIds.has(voice.id))
  } catch (error) {
    console.error('获取热门声音失败:', error)
    hotVoices.value = []
  }
}

// 获取自定义音色
const fetchCustomVoices = async () => {
  try {
    const response = await request.get('/api/voice-clone/list', {
      params: { userId: userStore.user?.id }
    })
    customVoices.value = response || []
  } catch (error) {
    console.error('获取自定义音色失败:', error)
    customVoices.value = []
  }
}

// 选择声音
const selectVoice = (voice) => {
  selectedVoice.value = voice
}

// 播放声音
const playVoice = (voice) => {
  if (!isComponentMounted.value) return

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
      if (!isComponentMounted.value) return
      isPlayingMap.value[voiceData.id] = false
    }
    
    const handleError = () => {
      if (!isComponentMounted.value) return
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
        if (!isComponentMounted.value) return
        console.error('播放失败:', error)
        isPlayingMap.value[voiceData.id] = false
        ElMessage.error('播放失败')
      })
      isPlayingMap.value[voiceData.id] = true
    } catch (error) {
      if (!isComponentMounted.value) return
      console.error('播放出错:', error)
      isPlayingMap.value[voiceData.id] = false
      ElMessage.error('播放出错')
    }
  }
}

// 组件卸载时清理音频资源
onUnmounted(() => {
  isComponentMounted.value = false
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
})

// 初始化
onMounted(async () => {
  await fetchFavoriteVoices()
  await fetchHotVoices()
  await fetchCustomVoices()

  // 检查是否有从数字人页面传递过来的视频
  const { videoUrl: passedVideoUrl, digitalHumanId, name } = route.query
  if (passedVideoUrl) {
    videoUrl.value = passedVideoUrl
    // 如果有数字人ID和名称，自动填充表单
    if (digitalHumanId) {
      form.value.digitalHumanId = digitalHumanId
    }
    if (name) {
      form.value.name = name
    }
  }

  if (digitalHumanStore.currentDigitalHumanVideoUrl) {
    videoUrl.value = digitalHumanStore.currentDigitalHumanVideoUrl
    digitalHumanStore.clearCurrentDigitalHuman()
  }
})

// 专用于视频上传的函数，设置3天过期时间
async function uploadVideoWithExpiry(file, directory) {
  try {
    // 获取预签名表单字段，特别指定3天过期时间
    const res = await request.get('/api/oss/presigned-url', {
      params: { 
        fileName: file.name, 
        directory, 
        expireSeconds: 259200 // 3天 = 3*24*60*60 = 259200秒
      },
    });
    
    if (res.code !== 200) {
      throw new Error(res.message || '获取 OSS 上传凭证失败');
    }
    
    const token = res.data;
    
    // 构建FormData，包含所有token字段和文件
    const formData = new FormData();
    Object.entries(token).forEach(([key, value]) => {
      // 排除resourceUrl上传结果字段
      if (key === 'resourceUrl') return;
      formData.append(key, value);
    });
    formData.append('file', file);
    
    // 使用POST表单方式上传到OSS
    const response = await fetch(token.host || token.uploadUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('OSS上传失败响应:', response.status, text);
      throw new Error(`OSS上传失败，状态码：${response.status}`);
    }
    
    // 返回最终资源访问URL
    return token.resourceUrl;
  } catch (error) {
    console.error('视频上传错误:', error);
    throw error;
  }
}

const handleSubmit = async () => {
  // 如果正在加载中，直接返回
  if (loading.value) {
    return
  }
  
  formSubmitted.value = true
  
  // 验证必填项
  if (!form.value.name) {
    ElMessage.warning('请输入作品名称')
    return
  }

  // 验证视频文件或视频URL
  if (!uploadFile.value && !videoUrl.value) {
    ElMessage.warning('请上传视频文件')
    return
  }
  
  if (!isAudioMode.value) {
    // 文本转语音模式下的验证
    if (!inputText.value) {
      ElMessage.warning('请输入要转换的文本内容')
      return
    }
    
    if (!selectedVoice.value) {
      ElMessage.warning('请选择音色')
      return
    }
  } else {
    // 上传音频模式下的验证
    if (!audioFile.value) {
      ElMessage.warning('请上传音频文件')
      return
    }
  }

  try {
    loading.value = true
    // 如果上传了文件，先上传到 OSS 获取 URL
    if (uploadFile.value) {
      try {
        // 使用专用的带过期时间的视频上传函数
        const resourceUrl = await uploadVideoWithExpiry(uploadFile.value, 'tasks/videos')
        videoUrl.value = resourceUrl
      } catch (err) {
        ElMessage.error('视频上传失败：' + err.message)
        loading.value = false
        return
      } finally {
        loading.value = false
      }
    }
    
    // 构建请求参数，只传 videoUrl
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('videoUrl', videoUrl.value)
    
    if (form.value.digitalHumanId) {
      formData.append('digitalHumanId', form.value.digitalHumanId)
    }
    
    if (isAudioMode.value && audioFile.value) {
      // 上传音频文件到OSS
      try {
        const audioUrl = await uploadFileToOss(audioFile.value, 'tasks/audios')
        formData.append('audioUrl', audioUrl)
      } catch (err) {
        ElMessage.error('音频上传失败：' + err.message)
        loading.value = false
        return
      }
    } else {
      formData.append('text', inputText.value)
      formData.append('voiceId', String(selectedVoice.value.voiceId))
    }
    formData.append('userId', localStorage.getItem('userId'))
    formData.append('type', selectedType.value)
    formData.append('speed', speedValue.value.toString()) // 添加语速参数
    
    const response = await request.post('/api/task/create', formData)
    
    // 检查响应状态
    if (response.code === 200) {
      ElMessage.success('任务创建成功')
      router.push('/works')
    } else {
      ElMessage.error(response.message || '任务创建失败')
    }
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      showLoginModal()
    } else {
      ElMessage.error(error.response?.data?.message || '任务创建失败')
    }
  } finally {
    loading.value = false
  }
}

// 移除视频
const removeVideo = () => {
  videoUrl.value = ''
  uploadFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 添加错误样式 */
.is-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #F56C6C inset;
}

.is-error :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #F56C6C inset;
}

.is-error :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #F56C6C inset;
}

/* 添加加载动画样式 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 添加模糊背景效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* 修改字数统计样式 */
:deep(.el-input__wrapper) {
  .el-input__count {
    background: transparent !important;
  }
}

:deep(.el-input__count-inner) {
  background: transparent !important;
  color: #666 !important;
}

.dark :deep(.el-input__count-inner) {
  background: transparent !important;
  color: #9ca3af !important;
}

/* 确保输入框文字在暗色模式下可见 */
.dark :deep(.el-input__inner) {
  color: #e5e7eb !important;
}

.dark :deep(.el-input__wrapper) {
  background-color: #1a1a1a !important;
  box-shadow: 0 0 0 1px #374151 inset !important;
}

.dark :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #4b5563 inset !important;
}

.dark :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #3b82f6 inset !important;
}

/* 自定义滑块样式 */
.custom-slider :deep(.el-slider__runway) {
  height: 6px;
  background-color: #e5e7eb;
}

.dark .custom-slider :deep(.el-slider__runway) {
  background-color: #374151;
}

.custom-slider :deep(.el-slider__bar) {
  height: 6px;
  background-color: #8b5cf6;
}

.dark .custom-slider :deep(.el-slider__bar) {
  background-color: #7c3aed;
}

.custom-slider :deep(.el-slider__button) {
  width: 20px;
  height: 20px;
  border: 4px solid #8b5cf6;
  background-color: #fff;
  position: relative;
  z-index: 2;
}

.dark .custom-slider :deep(.el-slider__button) {
  border-color: #7c3aed;
  background-color: #1f2937;
}

.custom-slider :deep(.el-slider__button-wrapper) {
  top: -9px;
  height: 20px;
  width: 20px;
  transform: translateY(0);
  z-index: 3;
}

.custom-slider :deep(.el-slider__button-wrapper .el-tooltip) {
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 