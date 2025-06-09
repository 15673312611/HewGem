<template>
  <div v-if="visible" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 遮罩层 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>
    
    <!-- 弹窗内容 -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-md rounded-lg shadow-xl relative">
        <!-- 标题和关闭按钮 -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 class="text-xl font-medium text-gray-900">创建数字人</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="p-6">
          <form @submit.prevent="handleSubmit">
            <!-- 上传视频 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">上传视频</label>
              <div 
                class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer"
                @click="triggerFileInput"
                @dragover.prevent
                @drop.prevent="handleFileDrop"
              >
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="hidden" 
                  accept="video/mp4,video/avi,video/mov"
                  @change="handleFileChange"
                />
                <CloudArrowUpIcon v-if="!uploadedFile" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <div v-if="!uploadedFile">
                  <p class="text-sm text-gray-600 mb-1">点击或拖拽视频或图片文件到这里</p>
                  <p class="text-xs text-gray-400">支持格式：</p>
                  <p class="text-xs text-gray-400">视频：MP4、AVI、MOV (不超过100MB)</p>
                  <p class="text-xs text-gray-400">图片：JPG、PNG、JPEG、WEBP (不超过10MB)</p>
                </div>
                <div v-else class="text-left">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">{{ uploadedFile.name }}</span>
                    <button @click.stop="removeFile" class="text-gray-400 hover:text-gray-600">
                      <XMarkIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 数字人名称 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">数字人名称</label>
              <input 
                type="text" 
                v-model="formData.name"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="给你的数字人起个名字"
              />
            </div>

            <!-- 描述信息 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">描述信息</label>
              <textarea 
                v-model="formData.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="描述一下这个数字人的特点（选填）"
              ></textarea>
            </div>

            <!-- 按钮组 -->
            <div class="flex items-center justify-end space-x-4">
              <button 
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                取消
              </button>
              <button 
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 disabled:opacity-50"
              >
                创建数字人
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline'
import request from '@/utils/request'
import { uploadFileToOss } from '@/utils/oss'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible', 'created'])
const router = useRouter()
const userStore = useUserStore()
const showGlobalMessage = inject('showGlobalMessage')
const fileInput = ref(null)
const uploadedFile = ref(null)
const isSubmitting = ref(false)

const formData = ref({
  name: '',
  description: '',
})

const isFormValid = computed(() => {
  return uploadedFile.value && formData.value.name.trim()
})

const closeModal = () => {
  emit('update:visible', false)
  resetForm()
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = (file) => {
  const videoTypes = ['video/mp4', 'video/avi', 'video/quicktime']
  const maxSize = 100 * 1024 * 1024 // 100MB

  if (!videoTypes.includes(file.type)) {
    alert('请上传正确格式的视频文件')
    return
  }

  if (file.size > maxSize) {
    alert('文件大小不能超过100MB')
    return
  }

  uploadedFile.value = file
}

const removeFile = () => {
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
  }
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleSubmit = async () => {
  if (!uploadedFile.value) {
    ElMessage.warning('请上传文件')
    return
  }
  if (!formData.value.name.trim()) {
    ElMessage.warning('请输入名称')
    return
  }

  try {
    isSubmitting.value = true
    // 上传文件到 OSS
    let fileUrl = ''
    try {
      fileUrl = await uploadFileToOss(uploadedFile.value, 'digital-human/videos')
    } catch (err) {
      ElMessage.error('视频上传失败：' + err.message)
      return
    }
    // 发送创建请求
    const response = await request.post('/api/digital-human/create', {
      fileUrl,
      name: formData.value.name,
      description: formData.value.description || ''
    })

    console.log('创建数字人响应:', response)
    
    if (response && response.id) {
      emit('created', response)
      closeModal()
      // 显示成功提示
      showGlobalMessage('数字人创建成功！')
    } else {
      throw new Error('创建失败：服务器返回数据格式错误')
    }
  } catch (error) {
    console.error('创建数字人失败:', error)
    if (error.response) {
      // 服务器返回了错误响应
      alert(error.response.data?.message || '创建失败，请重试')
    } else if (error.request) {
      // 请求已发出但没有收到响应
      alert('无法连接到服务器，请检查网络连接或联系管理员')
    } else {
      // 请求配置出错
      alert(error.message || '请求配置错误，请重试')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script> 