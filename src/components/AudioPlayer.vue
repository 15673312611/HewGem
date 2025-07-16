<template>
  <div class="flex-1 h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 relative p-12">
    <transition name="fade">
      <div>
        <div v-if="!showPlayer && !isGenerating" key="empty" class="flex flex-col items-center justify-center">
          <!-- Empty State SVG and structure -->
          <div class="relative mb-10">
            <div class="w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center animate-pulse-slow">
              <div class="w-48 h-48 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <div class="w-32 h-32 rounded-full bg-blue-200 dark:bg-blue-900/40 flex items-center justify-center">
                  <svg class="w-20 h-20 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="absolute -top-6 -right-6 w-20 h-20 bg-white dark:bg-dark-card rounded-full shadow-xl dark:shadow-dark-xl flex items-center justify-center">
              <svg class="w-10 h-10 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none">
                 <path d="M12 15V3M12 15L8 11M12 15L16 11M3 12V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div v-else-if="isGenerating" key="generating" class="flex flex-col items-center justify-center">
          <!-- Generating State SVG and structure -->
           <div class="relative mb-10">
              <div class="w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center animate-pulse-slow">
                <div class="w-48 h-48 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <div class="w-32 h-32 rounded-full bg-blue-200 dark:bg-blue-900/40 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-500 dark:border-blue-400"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div v-else key="player" class="flex flex-col items-center">
          <div class="w-[550px] bg-white dark:bg-dark-card rounded-3xl shadow-lg dark:shadow-dark-lg flex flex-col items-center p-10 animate-fade-in relative mb-8 border border-gray-100 dark:border-gray-800">
            <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-6 py-2 rounded-full text-base font-bold shadow-lg dark:shadow-dark-lg">
              已生成
            </div>
            <!-- Player body -->
            <div class="w-full flex flex-col items-center">
              <audio
                ref="audioRef"
                preload="auto"
                :src="audioUrl"
                @loadedmetadata="onAudioLoaded"
                @ended="onAudioEnded"
                @timeupdate="onTimeUpdate"
                class="hidden"
              />
              <div class="relative w-72 h-72 mb-8 flex items-center justify-center">
                <!-- Progress ring -->
                <div class="absolute inset-0 rounded-full bg-gray-100 dark:bg-dark-bg2"></div>
                <svg class="absolute inset-0 w-full h-full transform -rotate-90">
                   <circle cx="144" cy="144" r="136" stroke="currentColor" stroke-width="4" fill="none" class="text-blue-100 dark:text-blue-900/30"/>
                   <circle
                    cx="144"
                    cy="144"
                    r="136"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    :stroke-dasharray="progressCircumference"
                    :stroke-dashoffset="progressOffset"
                    class="text-blue-500 dark:text-blue-400 transition-all duration-300"
                  />
                </svg>
                <!-- Play button -->
                 <div class="relative z-10 w-32 h-32">
                  <button @click="togglePlay" :disabled="!isAudioLoaded" class="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg dark:shadow-dark-lg hover:shadow-xl dark:hover:shadow-dark-xl transition-[transform,box-shadow] transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group">
                    <div class="absolute inset-0 w-full h-full rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <svg v-if="!isPlaying" viewBox="0 0 24 24" class="w-16 h-16 text-white"><polygon points="6,3 20,12 6,21" fill="currentColor"/></svg>
                    <svg v-else viewBox="0 0 24 24" class="w-16 h-16 text-white"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>
                  </button>
                </div>
              </div>
              <!-- Audio info and progress bar -->
               <div class="w-full">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ audioName || '未命名音频' }}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span>
                  </div>
                  <div class="relative w-full h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden cursor-pointer" @click="seekAudio">
                    <div class="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600 rounded-full transition-all duration-300" :style="{ width: `${playProgress}%` }"></div>
                  </div>
                </div>
            </div>
            <!-- Action buttons -->
            <div class="flex items-center justify-center space-x-4 mt-8">
              <button @click="restartAudio" class="px-6 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-300 flex items-center">
                 <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none"><path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" stroke-width="2"/><path d="M16 12L10 8V16L16 12Z" fill="currentColor"/><path d="M8 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                 重新播放
              </button>
              <button @click="download" class="px-6 py-2.5 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 flex items-center">
                 <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none"><path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                 下载音频
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  showPlayer: Boolean,
  isGenerating: Boolean,
  audioUrl: String,
  audioName: String,
})

const emit = defineEmits(['download'])

const audioRef = ref(null)
const isPlaying = ref(false)
const isAudioLoaded = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const playProgress = ref(0)

const progressCircumference = computed(() => 2 * Math.PI * 136)
const progressOffset = computed(() => progressCircumference.value * (1 - playProgress.value / 100))

watch(() => props.audioUrl, (newUrl) => {
  if (newUrl && audioRef.value) {
    audioRef.value.src = newUrl
    audioRef.value.load()
  }
})

const onAudioLoaded = () => {
  if (!audioRef.value) return
  isAudioLoaded.value = true
  duration.value = audioRef.value.duration
  playAudio()
}

const onTimeUpdate = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  if (duration.value) {
    playProgress.value = (currentTime.value / duration.value) * 100
  }
}

const onAudioEnded = () => {
  isPlaying.value = false
  playProgress.value = 100
  currentTime.value = duration.value
}

const playAudio = async () => {
  if (!audioRef.value || !isAudioLoaded.value) return
  try {
    await audioRef.value.play()
    isPlaying.value = true
  } catch (error) {
    console.error('Playback failed', error)
    ElMessage.error('播放失败')
    isPlaying.value = false
  }
}

const togglePlay = async () => {
  if (!audioRef.value || !isAudioLoaded.value) return
  if (audioRef.value.paused) {
    await playAudio()
  } else {
    audioRef.value.pause()
    isPlaying.value = false
  }
}

const restartAudio = () => {
  if (!audioRef.value || !isAudioLoaded.value) return
  audioRef.value.currentTime = 0
  playAudio()
}

const seekAudio = (event) => {
  if (!audioRef.value || !isAudioLoaded.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, x / rect.width))
  const newTime = percentage * duration.value
  audioRef.value.currentTime = newTime
  onTimeUpdate()
}

const download = () => {
  emit('download')
}

const formatDuration = (time) => {
  if (!time) return '00:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.src = ''
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
  will-change: opacity;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.animate-fade-in {
  animation: fade-in 0.5s ease;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-slow {
  50% { opacity: .5; }
}
</style> 