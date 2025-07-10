<template>
  <div class="fixed inset-0 z-50 flex flex-row w-screen h-screen bg-gray-50 dark:bg-dark-bg">
    <!-- 左上角返回 -->
    <button @click="goBack" class="absolute top-8 left-8 flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-lg font-bold px-4 py-2 rounded-lg bg-white/80 dark:bg-dark-card/80 shadow-md dark:shadow-dark-md z-50">
      <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      返回
    </button>
    
    <!-- 左侧控制面板 -->
    <CreationPanel
      :current-voice-name="currentVoiceName"
      :is-generating="isGenerating"
      :text-content.sync="textContent"
      v-model:speed="speedValue"
      @show-voice-selector="showVoiceSelector = true"
      @ai-create="showAICreation = true"
      @generate="handleGenerate"
    />
    
    <!-- 中间播放器 -->
    <AudioPlayer
      :show-player="showPlayer"
      :is-generating="isGenerating"
      :audio-url="currentAudio.url"
      :audio-name="currentAudio.name"
      @download="downloadResult"
    />

    <!-- 右侧历史记录 -->
    <HistoryList
      :history-list="historyList"
      :history-playing="historyPlaying"
      @toggle-play="toggleHistoryPlay"
      @download="downloadHistory"
    />
    
    <!-- This audio tag is for history playback -->
    <audio v-for="item in historyList" :key="item.id" :ref="el => audioRefs[item.id] = el" :src="item.url" @ended="onHistoryAudioEnded(item.id)" hidden></audio>

    <!-- 声音选择模态框 -->
    <VoiceSelectorModal 
      v-model:show="showVoiceSelector"
      @confirm="confirmVoiceSelection"
    />
    
    <!-- AI文案创作弹窗 -->
    <AICreationModal
      v-model:show="showAICreation"
      @use-text="useAICreation"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'

import CreationPanel from '@/components/CreationPanel.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import HistoryList from '@/components/HistoryList.vue'
import VoiceSelectorModal from '@/components/VoiceSelectorModal.vue'
import AICreationModal from '@/components/AICreationModal.vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// State
const textContent = ref('') // Text content now lives here
const currentVoiceId = ref('')
const currentVoiceName = ref('')
const speedValue = ref(1.0)
const isGenerating = ref(false)
const showPlayer = ref(false)
const synthesisId = ref(null)
const statusCheckInterval = ref(null)
const currentAudio = ref({})
const historyList = ref([])
const historyPlaying = ref({})
const audioRefs = ref({})

// Modals visibility
const showVoiceSelector = ref(false)
const showAICreation = ref(false)

// --- Methods ---

const handleGenerate = (payload) => {
  textContent.value = payload.textContent;
  generateVoice(payload.fileName);
}

const generateVoice = debounce(async (fileName) => {
  if (!currentVoiceId.value) {
    ElMessage({ message: '请先选择一个声音', type: 'warning', customClass: 'custom-message' })
    return
  }
  if (!textContent.value.trim()) {
    ElMessage({ message: '请输入文本内容', type: 'warning' });
    return;
  }
   if (!fileName.trim()) {
    ElMessage({ message: '请输入声音名称', type: 'warning' });
    return;
  }

  try {
    isGenerating.value = true
    showPlayer.value = true
    
    const response = await fetch('/api/voice/synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userStore.token}` },
      body: JSON.stringify({
        textContent: textContent.value,
        fileName: fileName,
        voiceId: currentVoiceId.value,
        speed: speedValue.value
      })
    })

    const result = await response.json()
    if (result.code === 200) {
      synthesisId.value = result.data.id
      startStatusCheck()
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    isGenerating.value = false
    showPlayer.value = false
    ElMessage({ message: error.message || '语音生成失败', type: 'error' })
  }
}, 300)

const startStatusCheck = () => {
  if (statusCheckInterval.value) clearInterval(statusCheckInterval.value)
  
  statusCheckInterval.value = setInterval(async () => {
    if (!synthesisId.value) return
    try {
      const response = await fetch(`/api/voice/status/${synthesisId.value}`, {
        headers: { 'Authorization': `Bearer ${userStore.token}` }
      })
      const result = await response.json()
      
      if (result.code === 200) {
        const record = result.data
        if (record.status === '2') { // Success
          clearInterval(statusCheckInterval.value)
          isGenerating.value = false
            currentAudio.value = {
              id: record.id,
              name: record.fileName,
              url: record.voiceUrl,
              createdAt: record.createTime
            }
          await fetchHistoryRecords()
          ElMessage({ message: '语音生成成功', type: 'success' })
        } else if (record.status === '3') { // Failure
          clearInterval(statusCheckInterval.value)
          isGenerating.value = false
          showPlayer.value = false
          ElMessage({ message: record.errorMessage || '语音生成失败', type: 'error' })
        }
      }
    } catch (error) {
      clearInterval(statusCheckInterval.value)
      isGenerating.value = false
      showPlayer.value = false
      ElMessage({ message: '检查生成状态失败', type: 'error' })
    }
  }, 3000)
}

const fetchHistoryRecords = async () => {
  try {
    const response = await fetch(`/api/voice-synthesis-record/list`, {
      headers: { 'Authorization': `Bearer ${userStore.token}` }
    })
    const result = await response.json()
    if (result.code === 200) {
      historyList.value = (result.data || []).map(record => ({
        id: record.id,
        name: record.fileName,
        url: record.voiceUrl,
        createdAt: record.createTime,
        duration: '00:30', // Placeholder
        text: record.textContent
      }))
    } else {
      ElMessage.error('获取历史记录失败: ' + result.message)
    }
  } catch (error) {
    ElMessage.error('获取历史记录失败: ' + error.message)
  }
}

const goBack = () => {
  router.back()
}

const confirmVoiceSelection = (voice) => {
  if (voice) {
    currentVoiceId.value = voice.voiceId || voice.id
    currentVoiceName.value = voice.name
    showVoiceSelector.value = false
  }
}

const useAICreation = (text) => {
  textContent.value = text
  showAICreation.value = false
  ElMessage.success('已填入AI文案')
}

const downloadResult = () => {
  downloadFile(currentAudio.value)
}

const downloadHistory = (item) => {
  downloadFile(item)
}

const downloadFile = (item) => {
  if (!item?.url) {
    ElMessage.error('下载失败：音频URL不存在')
    return
  }
    const link = document.createElement('a')
    link.href = item.url
    link.download = `${item.name || '未命名语音'}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  ElMessage.success('下载成功')
}

const onHistoryAudioEnded = (id) => {
  historyPlaying.value[id] = false;
};

const toggleHistoryPlay = (id) => {
  const audio = audioRefs.value[id]
  if (!audio) return;

  const isCurrentlyPlaying = historyPlaying.value[id];

  // Pause all other audio
  Object.keys(audioRefs.value).forEach(key => {
    if (audioRefs.value[key] && !audioRefs.value[key].paused) {
      audioRefs.value[key].pause();
      historyPlaying.value[key] = false;
    }
  });

  if (isCurrentlyPlaying) {
    // Already playing, so we paused it.
    } else {
     audio.play().catch(e => {
        console.error("Play failed", e)
        historyPlaying.value[id] = false;
     });
     historyPlaying.value[id] = true;
  }
};


// Lifecycle Hooks
onMounted(() => {
  currentVoiceId.value = route.query.voiceId || ''
  currentVoiceName.value = route.query.voiceName || ''
  fetchHistoryRecords()
})

onUnmounted(() => {
  if (statusCheckInterval.value) {
    clearInterval(statusCheckInterval.value)
  }
  Object.values(audioRefs.value).forEach(audio => {
    if (audio) {
      audio.pause()
      audio.src = ''
    }
  })
})

</script>

<style scoped>
/* All specific component styles are now in their own files */
</style> 