<template>
  <div>
    <!-- 移除固定公告，改用弹窗公告 -->
    <AnnouncementDialog
      ref="announcementDialog"
      :announcement="announcement"
      :enable-announcement="!!announcement"
      :subsite-id="subsiteId || '0'"
    />
    
    <!-- 创作横幅 -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-sm hover:shadow-md dark:shadow-dark-sm dark:hover:shadow-dark-md mb-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex-1 text-center md:text-left">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">开始创作</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4">选择模板，快速生成您的数字人视频</p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/create" 
                         class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white dark:text-white/95 rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-sm dark:shadow-[0_2px_8px_rgba(30,64,175,0.3)]">
              <span class="mr-2 font-medium text-[15px] tracking-wide">开始创作</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>已支持多种模板</span>
            </div>
          </div>
        </div>
        <div class="flex-1 flex justify-center">
          <div class="relative w-48 h-48">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="grid grid-cols-2 gap-2">
                <div class="w-16 h-16 bg-white/80 dark:bg-dark-card3/80 rounded-lg flex items-center justify-center shadow-sm dark:shadow-dark-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="w-16 h-16 bg-white/80 dark:bg-dark-card3/80 rounded-lg flex items-center justify-center shadow-sm dark:shadow-dark-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div class="w-16 h-16 bg-white/80 dark:bg-dark-card3/80 rounded-lg flex items-center justify-center shadow-sm dark:shadow-dark-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="w-16 h-16 bg-white/80 dark:bg-dark-card3/80 rounded-lg flex items-center justify-center shadow-sm dark:shadow-dark-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能区域 -->
    <!-- <div class="grid grid-cols-5 gap-4 mb-8">
      <div v-for="feature in features" :key="feature.name" 
           class="bg-white rounded-lg p-1 flex flex-col items-center hover:shadow-lg transition-all cursor-pointer group">
        <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
          <component :is="feature.icon" class="w-8 h-8 text-primary" />
        </div>
        <h3 class="text-[#1a1a1a] font-medium mb-2">{{ feature.name }}</h3>
        <p class="text-sm text-gray-500 text-center">{{ feature.description }}</p>
      </div>
    </div> -->

    <!-- 作品区域 -->
    <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm dark:shadow-dark-sm transition-colors duration-300">
      <div class="flex items-center space-x-6 border-b border-gray-100 dark:border-dark-divider pb-4 mb-6">
        <button 
          class="text-sm transition-colors relative pb-4 -mb-4 text-primary dark:text-blue-400 font-medium"
        >
          作品
          <div 
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-blue-400"
          ></div>
        </button>
      </div>

      <!-- 作品列表 -->
      <div v-if="tasks.length > 0" class="grid grid-cols-5 gap-4">
        <div v-for="task in tasks" :key="task.id" 
             class="bg-white dark:bg-dark-card2 rounded-lg overflow-hidden shadow-sm hover:shadow-md dark:shadow-dark-sm dark:hover:shadow-dark-md transition-all duration-300 group h-[420px] flex flex-col">
          <!-- 视频封面 -->
          <div class="relative h-[240px] bg-gray-100 dark:bg-dark-card3 overflow-hidden">
            <img v-if="task.status === '1' || task.status === '2' || task.status === '4' || task.status === '5'" :src="getVideoThumbnail(task.videoUrl)" 
                 class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
            <video v-else-if="task.status === '3'" :src="task.resultUrl" 
                   class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <el-icon class="text-gray-400 dark:text-gray-500" :size="40">
                <VideoCamera />
              </el-icon>
            </div>
            
            <!-- 状态标签 -->
            <div class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium shadow-sm dark:shadow-dark-sm"
                 :class="{
                   'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400': task.status === '1' || task.status === '2',
                   'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400': task.status === '3',
                   'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400': task.status === '4' || task.status === '5'
                 }">
              {{ getStatusText(task.status) }}
            </div>

            <!-- 遮罩层 -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

            <!-- 播放按钮 -->
            <div v-if="task.status === '3'" 
                 class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                @click.stop="playVideo(task)"
                class="w-12 h-12 rounded-full bg-white/90 dark:bg-dark-card/90 hover:bg-white dark:hover:bg-dark-card flex items-center justify-center transition-all duration-300 hover:scale-110">
                <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-primary border-b-[8px] border-b-transparent ml-1"></div>
              </button>
            </div>
          </div>
          
          <!-- 作品信息 -->
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 line-clamp-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{{ task.name }}</h3>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(task.createTime) }}</span>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex items-center justify-between mt-auto space-x-2">
              <el-button 
                v-if="task.status === '3'"
                @click="downloadVideo(task)"
                class="flex-1 h-11 px-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-[0_2px_8px_0_rgba(59,130,246,0.10)] hover:brightness-110 hover:shadow-[0_4px_16px_0_rgba(59,130,246,0.15)] transition-all duration-300 rounded-xl font-semibold tracking-wide relative overflow-hidden before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-5 before:transition-opacity before:duration-300"
                :icon="Download"
                size="default">
                <span class="text-white">下载视频</span>
              </el-button>
              <el-button 
                @click="handleDelete(task)"
                class="flex-1 h-11 px-0 bg-gradient-to-r from-red-400 to-red-500 text-white border-0 shadow-[0_2px_8px_0_rgba(244,63,94,0.10)] hover:brightness-110 hover:shadow-[0_4px_16px_0_rgba(244,63,94,0.15)] transition-all duration-300 rounded-xl font-semibold tracking-wide relative overflow-hidden before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-5 before:transition-opacity before:duration-300"
                :icon="Delete"
                size="default">
                <span class="text-white">删除</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="py-10 flex flex-col items-center">
        <el-empty description="暂无作品" />
      </div>
    </div>

    <!-- 视频播放弹窗 -->
    <el-dialog
      v-model="videoDialogVisible"
      title="视频播放"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      class="video-dialog"
      @closed="handleDialogClosed"
    >
      <div class="video-container">
        <video
          v-if="currentVideoUrl"
          ref="videoPlayer"
          :src="currentVideoUrl"
          controls
          class="video-player"
          autoplay
        ></video>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/24/outline'
import {
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  LinkIcon,
  QrCodeIcon
} from '@heroicons/vue/24/outline'
import { VideoCamera, VideoPlay, Download, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useLoginModal } from '@/composables/useLoginModal'
import AnnouncementDialog from '@/components/AnnouncementDialog.vue'
import request from '@/utils/request'
import { useUserStore } from '@/stores/user'
import { useSiteStore } from '@/stores/site'

const tasks = ref([])
const router = useRouter()
const { loginModalVisible, showLoginModal } = useLoginModal()
const isFetchingTasks = ref(false)
const announcement = ref('')
const subsiteId = ref(null)
const announcementDialog = ref(null)
const userStore = useUserStore()
const siteStore = useSiteStore()

// 视频播放弹窗
const videoDialogVisible = ref(false)
const currentVideoUrl = ref('')
const videoPlayer = ref(null)

// 添加处理中任务相关变量
const processingTaskIds = ref([])
const pollingInterval = ref(null)
const POLLING_DELAY = 10000 // 10秒轮询一次

// 获取系统公告
const fetchAnnouncement = async () => {
  try {
    // 检查是否在一小时内已经显示过公告
    if (hasShownAnnouncementWithinHour()) {
      console.log('一小时内已经显示过公告，不再显示');
      return;
    }
    
    // 如果siteStore已经加载了信息，直接使用而不再请求
    if (siteStore.loaded && siteStore.siteInfo) {
      console.log('从siteStore获取站点信息，跳过请求');
      const data = siteStore.siteInfo;
      announcement.value = data.announcement || '';
      subsiteId.value = data.id || '0';
      
      // 获取到公告后，显示公告弹窗
      if (announcement.value && announcementDialog.value) {
        setTimeout(() => {
          announcementDialog.value.showDialog();
          // 记录显示公告的时间
          localStorage.setItem('lastAnnouncementShownTime', Date.now().toString());
        }, 500);
      }
      return;
    }
    
    console.log('siteStore未加载，直接请求站点信息');
    const response = await request.get('/api/subsite/info');
    if (response.code === 0 && response.data) {
      announcement.value = response.data.announcement || '';
      subsiteId.value = response.data.id || '0';
      
      // 获取到公告后，显示公告弹窗
      if (announcement.value && announcementDialog.value) {
        setTimeout(() => {
          announcementDialog.value.showDialog();
          // 记录显示公告的时间
          localStorage.setItem('lastAnnouncementShownTime', Date.now().toString());
        }, 500);
      }
    }
  } catch (error) {
    console.error('获取系统公告失败:', error);
  }
};

// 检查是否在一小时内已经显示过公告
const hasShownAnnouncementWithinHour = () => {
  const lastShownTime = localStorage.getItem('lastAnnouncementShownTime');
  if (!lastShownTime) return false;
  
  const oneHourInMs = 60 * 60 * 1000; // 一小时的毫秒数
  const timeDiff = Date.now() - parseInt(lastShownTime);
  
  return timeDiff < oneHourInMs;
}

// 监听登录成功事件
const loginSuccessHandler = () => {
  console.log('Home组件接收到login-success事件，准备获取任务列表');
  fetchTasks();
};

onMounted(() => {
  console.log('Home组件挂载，添加登录成功事件监听器');
  window.addEventListener('login-success', loginSuccessHandler);
  
  // 获取系统公告
  fetchAnnouncement();
  
  // 页面加载时获取任务列表
  console.log('Home组件挂载完成，立即获取任务列表');
  fetchTasks();
})

// 组件卸载时移除事件监听和清理轮询
onUnmounted(() => {
  console.log('Home组件卸载，移除登录成功事件监听器');
  window.removeEventListener('login-success', loginSuccessHandler);
  
  // 清理轮询
  stopPolling();
});

// 监听登录弹窗关闭
watch(loginModalVisible, (newValue) => {
  if (!newValue && !isFetchingTasks.value) {
    // 弹窗关闭后，检查是否已登录
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      // 如果已登录，重新获取作品列表
      fetchTasks()
    }
  }
})

// 获取任务列表
const fetchTasks = async () => {
  if (isFetchingTasks.value) return
  
  try {
    isFetchingTasks.value = true
    console.log('开始获取任务列表...')
    
    const token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    
    // 如果userId不存在但用户已登录，则从用户信息中获取
    if (!userId && userStore.isLoggedIn && userStore.user && userStore.user.id) {
      userId = userStore.user.id.toString()
      console.log('从userStore中获取userId:', userId)
      localStorage.setItem('userId', userId)
    }
    
    if (!token || !userId) {
      console.log('未找到token或userId，跳过获取任务列表', { token: !!token, userId })
      isFetchingTasks.value = false
      return
    }
    
    console.log('准备请求任务列表，参数:', { userId, token: token.substring(0, 10) + '...' })
    const response = await axios.get('/api/task/list', {
      params: {
        userId: userId,
        page: 1,
        pageSize: 20
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    console.log('任务列表获取成功', response.data)
    tasks.value = response.data.data || []
    
    // 更新处理中的任务ID列表
    updateProcessingTasks()
  } catch (error) {
    console.error('获取任务列表失败:', error)
    if (error.response) {
      console.error('服务器返回错误:', error.response.status, error.response.data)
    if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('认证失败，显示登录弹窗')
      showLoginModal()
      } else {
        // 不显示错误消息，避免影响登录体验
        console.error('获取任务列表失败，但不显示错误消息')
      }
    } else {
      console.error('请求错误详情:', error.message || '未知错误')
    }
  } finally {
    isFetchingTasks.value = false
  }
}

// 更新处理中任务ID列表
const updateProcessingTasks = () => {
  // 找出所有处理中的任务ID
  const processingIds = tasks.value
    .filter(task => task.status === '1' || task.status === '2')
    .map(task => task.id)
  
  processingTaskIds.value = processingIds
  
  // 如果有处理中的任务，开始轮询
  if (processingIds.length > 0) {
    startPolling()
  } else {
    stopPolling()
  }
}

// 开始轮询处理中的任务
const startPolling = () => {
  // 如果已经在轮询，先停止
  stopPolling()
  
  // 设置新的轮询
  pollingInterval.value = setInterval(() => {
    if (processingTaskIds.value.length > 0) {
      fetchProcessingTasksStatus()
    } else {
      stopPolling()
    }
  }, POLLING_DELAY)
}

// 停止轮询
const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    pollingInterval.value = null
  }
}

// 只获取处理中任务的最新状态
const fetchProcessingTasksStatus = async () => {
  if (processingTaskIds.value.length === 0) return
  
  try {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    
    // 使用现有的列表接口，但只关注处理中的任务
    const response = await axios.get('/api/task/list', {
      params: {
        userId: userId,
        page: 1,
        pageSize: 50 // 增大页面大小以确保包含所有处理中的任务
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    const updatedTasks = response.data.data || []
    
    // 更新处理中任务的状态
    let hasStatusChanged = false
    
    updatedTasks.forEach(updatedTask => {
      // 只处理我们正在跟踪的任务
      if (processingTaskIds.value.includes(updatedTask.id)) {
        // 找到对应的本地任务
        const localTaskIndex = tasks.value.findIndex(t => t.id === updatedTask.id)
        
        if (localTaskIndex !== -1) {
          // 如果状态发生了变化
          if (tasks.value[localTaskIndex].status !== updatedTask.status) {
            // 更新任务状态
            tasks.value[localTaskIndex] = updatedTask
            hasStatusChanged = true
            
            // 如果任务不再是处理中状态，从处理中列表移除
            if (updatedTask.status !== '1' && updatedTask.status !== '2') {
              processingTaskIds.value = processingTaskIds.value.filter(id => id !== updatedTask.id)
              
              // 显示通知
              if (updatedTask.status === '3') {
                ElMessage.success(`作品 "${updatedTask.name}" 已完成`)
              } else if (updatedTask.status === '4' || updatedTask.status === '5') {
                ElMessage.error(`作品 "${updatedTask.name}" 处理失败`)
              }
            }
          }
        }
      }
    })
    
    // 如果所有处理中的任务都已完成，停止轮询
    if (processingTaskIds.value.length === 0) {
      stopPolling()
    }
    
  } catch (error) {
    console.error('轮询任务状态失败:', error)
    // 轮询失败不显示错误提示，静默失败
  }
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '1': '处理中',
    '2': '处理中',
    '3': '已完成',
    '4': '合成失败',
    '5': '合成失败'
  }
  return statusMap[status] || '未知状态'
}

// 获取视频封面
const getVideoThumbnail = (url) => {
  if (!url) return ''
  // 移除URL中的查询参数
  const baseUrl = url.split('?')[0]
  // 添加获取第一帧的参数
  return `${baseUrl}?x-oss-process=video/snapshot,t_0`
}

// 播放视频
const playVideo = (task) => {
  currentVideoUrl.value = task.resultUrl
  videoDialogVisible.value = true
}

// 处理弹窗关闭
const handleDialogClosed = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.currentTime = 0
  }
}

// 下载视频
const downloadVideo = (task) => {
  try {
    // 显示加载提示
    const loadingInstance = ElMessage({
      message: '正在准备下载...',
      type: 'info',
      duration: 0,
      showClose: true
    })
    
    // 创建下载链接
    const link = document.createElement('a')
    link.href = task.resultUrl
    link.download = `作品_${task.name || task.id}.mp4`
    link.target = '_blank'
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    
    // 清理
    document.body.removeChild(link)
    
    // 关闭加载提示
    loadingInstance.close()
    ElMessage.success('下载已开始')
  } catch (error) {
    ElMessage.error('下载失败：' + (error.message || '未知错误'))
  }
}

// 删除任务
const handleDelete = async (task) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这个作品吗？',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const token = localStorage.getItem('token')
    await axios.delete(`/api/task/${task.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    ElMessage.success('删除成功')
    // 重新获取列表
    fetchTasks()
  } catch (error) {
    if (error === 'cancel') {
      return
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      showLoginModal()
    } else {
      ElMessage.error('删除失败')
    }
  }
}

// const features = [
//   {
//     name: '直播快剪',
//     description: '直播切片一键生成',
//     icon: VideoCameraIcon
//   },
//   {
//     name: '口播视频',
//     description: 'AI生成数字人视频',
//     icon: ChatBubbleLeftRightIcon
//   },
//   {
//     name: '定制数字人',
//     description: '定制你的专属分身',
//     icon: UserIcon
//   },
//   {
//     name: '链接成片',
//     description: '链接一键转视频',
//     icon: LinkIcon
//   },
//   {
//     name: '视频订阅号',
//     description: 'AI自动发视频',
//     icon: QrCodeIcon
//   }
// ]
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

/* 深色模式滚动条 */
:deep(.dark) .overflow-y-auto::-webkit-scrollbar-track {
  background: #2a2a2a;
}

:deep(.dark) .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #555;
}

:deep(.dark) .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* 视频弹窗样式 */
:deep(.video-dialog .el-dialog__body) {
  padding: 0;
}

:deep(.video-dialog .el-dialog__header) {
  margin: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.video-dialog .el-dialog__headerbtn) {
  top: 16px;
}

:deep(.dark) .video-dialog .el-dialog__header {
  border-bottom-color: #333;
}

.video-container {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  position: relative;
  overflow: hidden;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}
</style> 