<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-[#EEF1F6] dark:from-dark-bg dark:to-dark-bg2 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center">
        <span class="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">AI文案创作</span>
        <span class="ml-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">智能助手</span>
      </h1>
      
      <!-- 角色列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- 角色卡片 -->
        <div v-for="role in roles" :key="role.id" @click="startCopywriting(role)"
             class="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-sm hover:shadow-lg dark:hover:shadow-dark-lg transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100 dark:border-dark-border">
          <div class="p-6 relative">
            <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 dark:from-blue-900/20 to-transparent rounded-bl-full opacity-70"></div>
            
            <!-- 角色头像/图标 -->
            <div class="w-16 h-16 rounded-full mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md relative z-10">
              <img v-if="role.icon" :src="role.icon" class="w-full h-full object-cover rounded-full" />
              <span v-else class="text-2xl font-bold">{{ role.name.charAt(0) }}</span>
            </div>
            
            <!-- 角色名称和描述 -->
            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">{{ role.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 text-sm relative z-10">{{ role.description }}</p>
            
            <!-- 开始创作按钮 -->
            <button class="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-blue-700 text-white font-medium hover:shadow-md dark:hover:shadow-dark-md transition-all transform group-hover:scale-105 relative z-10">
              开始创作
            </button>
          </div>
        </div>
      </div>
      
      <!-- 历史记录 -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
          <span>最近创作</span>
          <span class="ml-3 px-2 py-1 bg-gray-100 dark:bg-dark-card2 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full">{{ conversations.length }}条记录</span>
        </h2>
        
        <div v-if="conversations.length > 0" class="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-sm p-6 border border-gray-100 dark:border-dark-border">
          <div class="divide-y divide-gray-100 dark:divide-dark-border">
            <div v-for="conversation in conversations" :key="conversation.id" 
                 @click="viewConversation(conversation)"
                 class="py-4 flex items-center justify-between cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 rounded-lg transition-colors">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mr-4 shadow-sm dark:shadow-dark-sm">
                  <span class="text-lg font-bold">{{ conversation.roleName.charAt(0) }}</span>
                </div>
                <div>
                  <h4 class="text-gray-800 dark:text-gray-200 font-semibold">{{ conversation.title }}</h4>
                  <p class="text-gray-400 dark:text-gray-500 text-sm flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ formatDate(conversation.createTime) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button @click.stop="deleteConversation(conversation.id)" 
                        class="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                  <TrashIcon class="w-5 h-5" />
                </button>
                <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                  <ChevronRightIcon class="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="bg-white dark:bg-dark-card rounded-xl shadow-sm dark:shadow-dark-sm p-12 flex flex-col items-center justify-center border border-gray-100 dark:border-dark-border">
          <div class="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-4">
            <DocumentTextIcon class="w-10 h-10" />
          </div>
          <p class="text-gray-600 dark:text-gray-300 font-medium">暂无创作记录</p>
          <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">选择一个角色开始您的AI创作之旅</p>
          <button class="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg font-medium hover:shadow-md dark:hover:shadow-dark-md transition-all">
            立即开始
          </button>
        </div>
      </div>
    </div>
    
    <!-- 文案创作弹窗 -->
    <el-dialog
      v-model="showCopywritingModal"
      :title="currentRole?.name || 'AI文案创作'"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      top="5vh"
      class="copywriting-dialog"
    >
      <div v-if="currentRole" class="mb-6">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white mr-4 shadow-sm dark:shadow-dark-sm">
            <img v-if="currentRole.icon" :src="currentRole.icon" class="w-full h-full object-cover rounded-full" />
            <span v-else class="text-lg font-bold">{{ currentRole.name.charAt(0) }}</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">{{ currentRole.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm">{{ currentRole.description }}</p>
          </div>
        </div>
        
        <div class="mb-6 bg-gray-50 dark:bg-dark-card2 p-5 rounded-xl border border-gray-200 dark:border-dark-border">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">输入内容</label>
          <el-input
            v-model="userPrompt"
            type="textarea"
            :rows="4"
            :placeholder="currentRole.inputPlaceholder || '请输入您的需求'"
            class="custom-textarea"
          ></el-input>
          
          <div class="mt-4 flex items-center justify-between">
            <div v-if="currentRole.needsWordLimit !== false" class="w-2/3">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">生成字数</label>
              <el-slider
                v-model="wordLimit"
                :min="150"
                :max="600"
                :step="150"
                :marks="{150: '150', 300: '300', 450: '450', 600: '600'}"
                class="custom-slider"
              ></el-slider>
            </div>
            
            <el-button v-if="!currentConversationId" type="primary" @click="generateCopywriting" :loading="isGenerating" class="generate-btn">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </template>
              {{ isGenerating ? '生成中...' : '生成文案' }}
            </el-button>
          </div>
        </div>
        
        <div v-if="generatedContent" class="mt-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              生成结果
            </h3>
            <div class="flex space-x-3">
              <el-button size="small" @click="copyContent" class="copy-btn">
                <DocumentDuplicateIcon class="w-4 h-4 mr-1" />
                复制
              </el-button>
              <el-button v-if="!currentConversationId" size="small" type="success" @click="saveContent" :disabled="isContentSaved" class="save-btn">
                <CheckIcon class="w-4 h-4 mr-1" />
                {{ isContentSaved ? '已保存' : '保存' }}
              </el-button>
            </div>
          </div>
          
          <div class="bg-white dark:bg-dark-card2 p-6 rounded-xl border border-gray-200 dark:border-dark-border whitespace-pre-wrap text-gray-800 dark:text-gray-300 shadow-sm dark:shadow-dark-sm leading-relaxed">
            {{ generatedContent }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import request from '@/utils/request'
import { useUserStore } from '@/stores/user'
import { 
  TrashIcon, 
  ChevronRightIcon, 
  DocumentTextIcon,
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const userStore = useUserStore()
const roles = ref([])
const conversations = ref([])
const showCopywritingModal = ref(false)
const isGenerating = ref(false)
const currentRole = ref(null)
const userPrompt = ref('')
const generatedContent = ref('')
const wordLimit = ref(300)
const currentConversationId = ref(null)
const isContentSaved = ref(false)

// 获取角色列表
const fetchRoles = async () => {
  try {
    if (!userStore.isLoggedIn) return
    
    const response = await request.get('/api/ai/role/list')
    
    roles.value = response.data || []
  } catch (error) {
    console.error('获取角色列表失败', error)
    ElMessage.error('获取角色列表失败')
  }
}

// 获取最近创作
const fetchRecentConversations = async () => {
  try {
    if (!userStore.isLoggedIn) return
    
    const response = await request.get('/api/ai/conversation/page', {
      params: {
        page: 1,
        size: 10
      }
    })
    
    conversations.value = response.data?.content || []
  } catch (error) {
    console.error('获取创作列表失败', error)
    ElMessage.error('获取创作列表失败')
  }
}

// 开始文案创作
const startCopywriting = (role) => {
  currentRole.value = role
  userPrompt.value = ''
  generatedContent.value = ''
  wordLimit.value = role.wordLimit || 300
  showCopywritingModal.value = true
  currentConversationId.value = null // 新的创作，没有对话ID
  isContentSaved.value = true // 新创作时，默认禁用保存按钮
}

// 查看历史创作
const viewConversation = (conversation) => {
  // 获取角色信息
  const role = roles.value.find(r => r.id === conversation.roleId)
  if (role) {
    currentRole.value = role
    currentConversationId.value = conversation.id // 记录当前对话ID
    isContentSaved.value = true // 历史记录总是"已保存"状态
    
    // 解析对话内容
    try {
      const content = JSON.parse(conversation.content)
      userPrompt.value = content.prompt || ''
      generatedContent.value = content.result || ''
      wordLimit.value = content.wordLimit || 300
      showCopywritingModal.value = true
    } catch (e) {
      console.error('解析对话内容失败', e)
      ElMessage.error('解析对话内容失败')
    }
  } else {
    ElMessage.warning('未找到相关角色信息')
  }
}

// 删除创作记录
const deleteConversation = async (conversationId) => {
  try {
    await ElMessageBox.confirm('确定要删除这条创作记录吗？', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await request.delete(`/api/ai/conversation/${conversationId}`)
    
    ElMessage.success('删除成功')
    // 重新获取创作列表
    fetchRecentConversations()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除创作记录失败', error)
      ElMessage.error('删除创作记录失败')
    }
  }
}

// 生成文案
const generateCopywriting = async () => {
  if (!userPrompt.value.trim()) {
    ElMessage.warning('请输入创作内容')
    return
  }
  
  isGenerating.value = true
  try {
    // 发送请求，只传递roleId、用户输入和字数限制，让后端负责处理提示词和模型选择
    const response = await request.post('/api/ai/conversation/send', {
      roleId: currentRole.value.id,
      content: userPrompt.value.trim(),
      wordLimit: wordLimit.value
    })
    
    generatedContent.value = response.data.reply
    // 生成成功后，唯一地启用保存按钮
    isContentSaved.value = false
  } catch (error) {
    console.error('生成文案失败', error)
    ElMessage.error('生成文案失败')
  } finally {
    isGenerating.value = false
  }
}

// 复制内容
const copyContent = () => {
  if (!generatedContent.value) return
  
  navigator.clipboard.writeText(generatedContent.value)
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch(() => {
      ElMessage.error('复制失败，请手动复制')
    })
}

// 保存内容
const saveContent = async () => {
  if (!generatedContent.value || (currentConversationId.value === null && isContentSaved.value)) {
    return
  }
  
  try {
    // 使用用户输入的前20个字符作为标题
    let title = userPrompt.value.substring(0, 20)
    if (userPrompt.value.length > 20) title += '...'
    
    // 保存对话内容，包括提示和结果
    const content = JSON.stringify({
      prompt: userPrompt.value,
      result: generatedContent.value,
      wordLimit: wordLimit.value
    })
    
    // 在新创作模式下，总是创建新对话
    // 查看历史记录时，保存按钮是隐藏的，所以这里不需要更新逻辑
    await request.post('/api/ai/conversation/create', {
      roleId: currentRole.value.id,
      title: title,
      content: content
    })
    
    isContentSaved.value = true
    ElMessage.success('保存成功')
    // 重新获取创作列表
    fetchRecentConversations()
  } catch (error) {
    console.error('保存失败', error)
    ElMessage.error('保存失败')
  }
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchRoles()
  fetchRecentConversations()
})
</script>

<style scoped>
.el-dialog {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

:deep(.el-dialog__header) {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  @apply dark:border-dark-border dark:bg-dark-card2;
}

:deep(.el-dialog__title) {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  @apply dark:text-gray-200;
}

:deep(.el-dialog__body) {
  padding: 24px;
  @apply dark:bg-dark-card;
}

:deep(.el-slider__runway) {
  margin: 12px 0;
  @apply dark:bg-dark-card3;
}

:deep(.el-slider__bar) {
  background-color: #3b82f6;
}

:deep(.el-slider__button) {
  border-color: #3b82f6;
  @apply dark:bg-dark-card;
}

:deep(.el-input__inner) {
  border-radius: 8px;
  @apply dark:bg-dark-card2 dark:border-dark-border dark:text-gray-300;
}

:deep(.el-textarea__inner) {
  border-radius: 8px;
  resize: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  padding: 12px;
  @apply dark:bg-dark-card2 dark:border-dark-border dark:text-gray-300;
}

:deep(.el-textarea__inner:focus) {
  border-color: #3b82f6;
}

.generate-btn {
  background: linear-gradient(to right, #3b82f6, #6366f1);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  @apply dark:from-blue-600 dark:to-blue-700;
}

.generate-btn:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  @apply dark:shadow-dark-lg;
}

.copy-btn, .save-btn {
  border-radius: 6px;
  font-weight: 500;
  @apply dark:bg-dark-card2 dark:border-dark-border dark:text-gray-300;
}

.save-btn {
  background-color: #10b981;
  border-color: #10b981;
  @apply dark:bg-green-600 dark:border-green-600 dark:text-white;
}

.save-btn:hover {
  background-color: #059669;
  border-color: #059669;
  @apply dark:bg-green-700 dark:border-green-700;
}

:deep(.el-dialog) {
  @apply dark:bg-dark-card dark:border dark:border-dark-border;
}

:deep(.el-button) {
  @apply dark:bg-dark-card2 dark:border-dark-border dark:text-gray-300;
  
  &.el-button--primary {
    @apply dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-700 dark:hover:border-blue-700;
  }
  
  &.el-button--success {
    @apply dark:bg-green-600 dark:border-green-600 dark:text-white dark:hover:bg-green-700 dark:hover:border-green-700;
  }
}

:deep(.el-message-box) {
  @apply dark:bg-dark-card dark:border-dark-border;
  
  .el-message-box__title {
    @apply dark:text-gray-200;
  }
  
  .el-message-box__content {
    @apply dark:text-gray-300;
  }
  
  .el-message-box__btns {
    @apply dark:border-t dark:border-dark-border;
    
    .el-button {
      @apply dark:bg-dark-card2 dark:border-dark-border dark:text-gray-300;
      
      &.el-button--primary {
        @apply dark:bg-blue-600 dark:border-blue-600 dark:text-white;
      }
    }
  }
}
</style> 