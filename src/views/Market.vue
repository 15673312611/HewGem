<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 顶部横幅 -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl p-6 mb-8 shadow-lg dark:shadow-dark-lg">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-2xl font-bold text-white mb-3">形象市场</h1>
          <p class="text-blue-100 mb-4">选择您喜欢的形象，快速生成专业视频</p>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center text-sm text-blue-100">
              <el-icon class="mr-2"><VideoCamera /></el-icon>
              <span>高清视频</span>
            </div>
            <div class="flex items-center text-sm text-blue-100">
              <el-icon class="mr-2"><Star /></el-icon>
              <span>精选形象</span>
            </div>
            <div class="flex items-center text-sm text-blue-100">
              <el-icon class="mr-2"><Timer /></el-icon>
              <span>快速生成</span>
            </div>
          </div>
        </div>
        <div class="flex-1 flex justify-center">
          <div class="relative w-48 h-48">
            <div class="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="grid grid-cols-2 gap-2">
                <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                  <el-icon class="w-8 h-8 text-white"><VideoCamera /></el-icon>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                  <el-icon class="w-8 h-8 text-white"><Star /></el-icon>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                  <el-icon class="w-8 h-8 text-white"><Timer /></el-icon>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center shadow-sm">
                  <el-icon class="w-8 h-8 text-white"><Picture /></el-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类列表 -->
    <div class="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-sm p-6 mb-8 transition-colors duration-300">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">选择分类</h3>
      </div>
      <div class="relative">
        <div class="flex flex-wrap gap-6 pl-2 pt-2 pb-4" :class="{ 'max-h-[66px]': !isExpanded, 'overflow-hidden': !isExpanded }">
          <!-- 全部分类 -->
          <button 
            @click="selectCategory(null)"
            class="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-dark-card2 dark:to-dark-card3 p-2 transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md"
            :class="!selectedCategory && !selectedGender ? 'ring-2 ring-primary dark:ring-blue-500 ring-offset-2 dark:ring-offset-dark-bg' : ''"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                   :class="!selectedCategory && !selectedGender ? 
                     'bg-primary dark:bg-blue-600 text-white shadow-lg shadow-primary/20 dark:shadow-blue-500/20' : 
                     'bg-gray-100 dark:bg-dark-card3 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 dark:group-hover:bg-blue-900/30'">
                <el-icon class="w-4 h-4"><Star /></el-icon>
              </div>
              <span class="text-xs font-medium transition-colors duration-300"
                    :class="!selectedCategory && !selectedGender ? 
                      'text-primary dark:text-blue-400' : 
                      'text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-blue-400'">
                全部
              </span>
            </div>
          </button>

          <!-- 性别分类 -->
          <button 
            @click="selectGender(1)"
            class="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-dark-card2 dark:to-dark-card3 p-2 transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md"
            :class="selectedGender === 1 ? 'ring-2 ring-primary dark:ring-blue-500 ring-offset-2 dark:ring-offset-dark-bg' : ''"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                   :class="selectedGender === 1 ? 
                     'bg-primary dark:bg-blue-600 text-white shadow-lg shadow-primary/20 dark:shadow-blue-500/20' : 
                     'bg-gray-100 dark:bg-dark-card3 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 dark:group-hover:bg-blue-900/30'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" :class="{'dark:stroke-blue-400': selectedGender !== 1}">
                  <circle cx="10" cy="14" r="5" stroke="#3B82F6" stroke-width="2"/>
                  <line x1="14" y1="10" x2="21" y2="3" stroke="#3B82F6" stroke-width="2"/>
                  <line x1="18" y1="3" x2="21" y2="3" stroke="#3B82F6" stroke-width="2"/>
                  <line x1="21" y1="3" x2="21" y2="6" stroke="#3B82F6" stroke-width="2"/>
                </svg>
              </div>
              <span class="text-xs font-medium transition-colors duration-300"
                    :class="selectedGender === 1 ? 
                      'text-primary dark:text-blue-400' : 
                      'text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-blue-400'">
                男生
              </span>
            </div>
          </button>

          <button 
            @click="selectGender(2)"
            class="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-dark-card2 dark:to-dark-card3 p-2 transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md"
            :class="selectedGender === 2 ? 'ring-2 ring-primary dark:ring-blue-500 ring-offset-2 dark:ring-offset-dark-bg' : ''"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                   :class="selectedGender === 2 ? 
                     'bg-primary dark:bg-blue-600 text-white shadow-lg shadow-primary/20 dark:shadow-blue-500/20' : 
                     'bg-gray-100 dark:bg-dark-card3 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 dark:group-hover:bg-blue-900/30'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" :class="{'dark:stroke-pink-400': selectedGender !== 2}">
                  <circle cx="12" cy="10" r="5" stroke="#EC4899" stroke-width="2"/>
                  <line x1="12" y1="15" x2="12" y2="21" stroke="#EC4899" stroke-width="2"/>
                  <line x1="9" y1="18" x2="15" y2="18" stroke="#EC4899" stroke-width="2"/>
                </svg>
              </div>
              <span class="text-xs font-medium transition-colors duration-300"
                    :class="selectedGender === 2 ? 
                      'text-primary dark:text-blue-400' : 
                      'text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-blue-400'">
                女生
              </span>
            </div>
          </button>

          <!-- 其他分类 -->
          <button 
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            class="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white dark:from-dark-card2 dark:to-dark-card3 p-2 transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md"
            :class="selectedCategory?.id === category.id ? 'ring-2 ring-primary dark:ring-blue-500 ring-offset-2 dark:ring-offset-dark-bg' : ''"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                   :class="selectedCategory?.id === category.id ? 
                     'bg-primary dark:bg-blue-600 text-white shadow-lg shadow-primary/20 dark:shadow-blue-500/20' : 
                     'bg-gray-100 dark:bg-dark-card3 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 dark:group-hover:bg-blue-900/30'">
                <img 
                  v-if="category.iconUrl" 
                  :src="category.iconUrl" 
                  :alt="category.name"
                  class="w-4 h-4 object-contain"
                />
                <el-icon v-else class="w-4 h-4"><Folder /></el-icon>
              </div>
              <span class="text-xs font-medium transition-colors duration-300"
                    :class="selectedCategory?.id === category.id ? 
                      'text-primary dark:text-blue-400' : 
                      'text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-blue-400'">
                {{ category.name }}
              </span>
            </div>
          </button>
        </div>

        <!-- 展开/收起按钮 -->
        <button 
          v-if="hasMoreCategories"
          @click="toggleExpand"
          class="absolute right-0 bottom-0 bg-white dark:bg-dark-card px-3 py-1 text-xs text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300 transition-colors"
        >
          {{ isExpanded ? '收起' : '展开' }}
          <el-icon class="ml-1" :class="{ 'transform rotate-180': isExpanded }">
            <ArrowDown />
          </el-icon>
        </button>
      </div>
    </div>
    
    <!-- 形象列表 -->
    <div v-loading="loading" class="grid grid-cols-5 gap-4">
      <div v-for="template in templates" :key="template.id" 
           class="bg-white dark:bg-dark-card2 rounded-lg overflow-hidden shadow-sm hover:shadow-md dark:shadow-dark-sm dark:hover:shadow-dark-md transition-all duration-300 group">
        <!-- 视频封面 -->
        <div class="relative aspect-[16/12] bg-gray-100 dark:bg-dark-card3 overflow-hidden">
          <img :src="template.coverUrl" 
               class="w-full h-full object-cover object-[center_20%] transform group-hover:scale-105 transition-transform duration-300" />
          
          <!-- 遮罩层 -->
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

          <!-- 播放按钮 -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              @click.stop="previewVideo(template)"
              class="w-12 h-12 rounded-full bg-white/90 dark:bg-dark-card/90 hover:bg-white dark:hover:bg-dark-card flex items-center justify-center transition-all duration-300 hover:scale-110">
              <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-primary border-b-[8px] border-b-transparent ml-1"></div>
            </button>
          </div>
        </div>
        
        <!-- 形象信息 -->
        <div class="p-2">
          <div class="flex items-center justify-between mb-0.5">
            <h3 class="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{{ template.name }}</h3>
            <div v-if="template.gender === 1" class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="10" cy="14" r="5" stroke="#3B82F6" stroke-width="2"/>
                <line x1="14" y1="10" x2="21" y2="3" stroke="#3B82F6" stroke-width="2"/>
                <line x1="18" y1="3" x2="21" y2="3" stroke="#3B82F6" stroke-width="2"/>
                <line x1="21" y1="3" x2="21" y2="6" stroke="#3B82F6" stroke-width="2"/>
              </svg>
            </div>
            <div v-else-if="template.gender === 2" class="flex items-center justify-center w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-900/40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="10" r="5" stroke="#EC4899" stroke-width="2"/>
                <line x1="12" y1="15" x2="12" y2="21" stroke="#EC4899" stroke-width="2"/>
                <line x1="9" y1="18" x2="15" y2="18" stroke="#EC4899" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">{{ template.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(template.createTime) }}</span>
            <button 
              @click.stop="handleUseTemplate(template)"
              class="px-2 py-1 bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs rounded hover:bg-primary/20 dark:hover:bg-blue-800/40 transition-colors">
              立即使用
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频预览弹窗 -->
    <el-dialog
      v-model="videoDialogVisible"
      title="视频预览"
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

    <!-- 空状态 -->
    <div v-if="!loading && (!templates || templates.length === 0)" class="text-center py-20">
      <div class="text-gray-400 mb-4">
        <el-icon :size="48"><Picture /></el-icon>
      </div>
      <p class="text-gray-500">暂无形象数据</p>
    </div>

    <!-- 预览弹窗 -->
    <el-dialog
      v-model="previewVisible"
      title="预览"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      class="preview-dialog"
    >
      <div class="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref="videoPlayer"
          :src="currentTemplate?.videoUrl"
          class="w-full h-full"
          controls
          autoplay
        ></video>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-4">
          <el-button @click="handleUseTemplate(currentTemplate)">使用</el-button>
          <el-button type="primary" @click="previewVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Picture, VideoPlay, VideoCamera, Star, Timer, User, Folder, ArrowDown, UserFilled } from '@element-plus/icons-vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import { PhotoIcon, SparklesIcon, UserIcon } from '@heroicons/vue/24/outline'
import { useDigitalHumanStore } from '@/stores/digitalHuman'

const router = useRouter()
const templates = ref([])
const categories = ref([])
const selectedCategory = ref(null)
const loading = ref(false)
const selectedGender = ref(null)
const videoDialogVisible = ref(false)
const currentVideoUrl = ref(null)
const videoPlayer = ref(null)
const isExpanded = ref(false)
const previewVisible = ref(false)
const currentTemplate = ref(null)
const digitalHumanStore = useDigitalHumanStore()

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

// 获取形象列表
const fetchTemplates = async () => {
  try {
    loading.value = true
    const params = {
      categoryId: selectedCategory.value?.id,
      gender: selectedGender.value
    }
    const response = await request.get('/api/template/list', { params })
    templates.value = response.map(item => ({
      ...item,
      imageLoading: true,
      imageError: false
    }))
  } catch (error) {
    console.error('获取形象列表失败:', error)
    templates.value = []
  } finally {
    loading.value = false
  }
}

// 获取分类图标
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    '商务': 'BriefcaseIcon',
    '教育': 'AcademicCapIcon',
    '娱乐': 'FilmIcon',
    '生活': 'HomeIcon',
    '其他': 'EllipsisHorizontalIcon'
  }
  return iconMap[categoryName] || 'FolderIcon'
}

// 获取分类列表
const fetchCategories = async () => {
  try {
    const response = await request.get('/api/template/categories')
    categories.value = response.data || []
  } catch (error) {
    console.error('获取分类列表失败:', error)
    categories.value = []
  }
}

// 选择性别
const selectGender = (gender) => {
  selectedGender.value = gender
  selectedCategory.value = null // 清除分类选择
  fetchTemplates()
}

// 选择分类
const selectCategory = (category) => {
  if (category === null) {
    // 点击"全部"按钮时，清除所有选择
    selectedCategory.value = null
    selectedGender.value = null
  } else if (selectedCategory.value?.id === category.id) {
    // 点击已选中的分类时，取消选择
    selectedCategory.value = null
  } else {
    // 选择新的分类
    selectedCategory.value = category
    selectedGender.value = null
  }
  fetchTemplates()
}

// 预览视频
const previewVideo = (template) => {
  ElMessageBox.alert(
    `<div class="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video 
        src="${template.videoUrl}" 
        class="w-full h-full"
        controls
        autoplay
      ></video>
    </div>`,
    '预览',
    {
      confirmButtonText: '使用',
      cancelButtonText: '关闭',
      showCancelButton: true,
      dangerouslyUseHTMLString: true,
      customClass: 'preview-dialog',
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      center: true,
      width: '40%',
      callback: (action) => {
        if (action === 'confirm') {
          handleUseTemplate(template)
        }
      }
    }
  )
}

// 处理弹窗关闭
const handleDialogClosed = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.currentTime = 0
  }
}

// 使用形象
const handleUseTemplate = (template) => {
  digitalHumanStore.setCurrentDigitalHuman(template.id, template.videoUrl)
  router.push('/create')
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 计算是否显示展开按钮
const hasMoreCategories = computed(() => {
  return categories.value.length > 5 // 当其他分类超过5个时显示展开按钮
})

// 切换展开/收起状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  fetchCategories()
  fetchTemplates()
})
</script>

<style scoped>
/* 添加过渡动画 */
.max-h-[52px] {
  transition: max-height 0.3s ease-in-out;
}

.preview-dialog {
  :deep(.el-message-box) {
    max-width: 600px;
    margin: 0 auto;
    @apply dark:bg-dark-card dark:border-dark-border;
  }

  :deep(.el-message-box__header) {
    @apply dark:border-dark-border dark:bg-dark-card2;
  }

  :deep(.el-message-box__title) {
    @apply dark:text-gray-200;
  }

  :deep(.el-message-box__content) {
    @apply dark:bg-dark-card dark:text-gray-300;
  }

  :deep(.el-message-box__btns) {
    @apply dark:bg-dark-card2 dark:border-t dark:border-dark-border;
  }
}

/* 视频弹窗样式 */
:deep(.video-dialog) {
  .el-dialog {
    @apply dark:bg-dark-card dark:border dark:border-dark-border;
  }

  .el-dialog__body {
    padding: 0;
  }

  .el-dialog__header {
    margin: 0;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    @apply dark:border-dark-border dark:bg-dark-card2;
  }

  .el-dialog__title {
    @apply dark:text-gray-200;
  }

  .el-dialog__headerbtn {
    top: 16px;
    .el-dialog__close {
      @apply dark:text-gray-400 dark:hover:text-gray-200;
    }
  }
}

/* 分页器深色模式 */
:deep(.el-pagination) {
  @apply dark:bg-dark-card dark:text-gray-300;

  .el-pagination__total {
    @apply dark:text-gray-400;
  }

  .el-input__inner {
    @apply dark:bg-dark-card2 dark:text-gray-300 dark:border-dark-border;
  }

  button {
    @apply dark:text-gray-400 dark:hover:text-blue-400;

    &:disabled {
      @apply dark:text-gray-600;
    }
  }

  .el-pager li {
    @apply dark:bg-dark-card2 dark:text-gray-400 dark:border-dark-border;

    &.active {
      @apply dark:bg-blue-600 dark:text-white;
    }

    &:hover {
      @apply dark:text-blue-400;
    }
  }
}

/* 加载状态深色模式 */
:deep(.el-loading-mask) {
  @apply dark:bg-dark-bg/80;

  .el-loading-spinner {
    .el-loading-text {
      @apply dark:text-gray-300;
    }
    .path {
      @apply dark:stroke-blue-400;
    }
  }
}

/* 按钮深色模式 */
:deep(.el-button) {
  @apply dark:border-dark-border dark:text-gray-300 dark:bg-dark-card2 dark:hover:bg-dark-card3;

  &.el-button--primary {
    @apply dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-700 dark:hover:border-blue-700;
  }
}
</style> 