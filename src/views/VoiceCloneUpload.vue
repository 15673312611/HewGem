<template>
  <div class="min-h-screen bg-[#F7F8FA] p-6">
    <div class="max-w-3xl mx-auto">
      <!-- 标签切换 -->
      <div class="bg-white rounded-lg shadow-sm mb-4">
        <div class="flex">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex-1 py-3 text-center relative"
            :class="activeTab === tab.id ? 'text-primary' : 'text-gray-500'"
          >
            {{ tab.name }}
            <div 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform"
              :class="activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'"
            ></div>
          </button>
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="bg-orange-50 rounded-lg p-4 mb-6 flex items-start">
        <LightBulbIcon class="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
        <div class="text-sm text-gray-700">如何让复刻的声音效果更好？</div>
      </div>

      <!-- 上传区域 -->
      <div v-if="activeTab === 'upload'" class="bg-white rounded-lg p-8">
        <div v-if="!uploadedFile" class="border-2 border-dashed border-gray-200 rounded-lg p-10">
          <div class="flex flex-col items-center justify-center text-center">
            <CloudArrowUpIcon class="w-12 h-12 text-gray-400 mb-4" />
            <div class="text-gray-800 font-medium mb-2">点击上传/拖拽音频或视频文件到这里</div>
            <div class="text-sm text-gray-500 mb-6">支持mp3/wav/mp4格式，文件大小不超过150MB</div>
            <div class="text-xs text-gray-400">最短20s，最长10min，建议30s左右</div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <!-- 音频播放器 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="text-sm text-gray-800 truncate flex-1">{{ uploadedFile.name }}</div>
              <button class="text-gray-400 hover:text-gray-600" @click="removeFile">
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
            <div class="flex items-center space-x-4">
              <button class="text-primary">
                <PlayCircleIcon class="w-8 h-8" />
              </button>
              <div class="flex-1">
                <div class="bg-gray-200 h-1 rounded-full overflow-hidden">
                  <div class="bg-primary h-full" style="width: 30%"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0:00</span>
                  <span>0:59</span>
                </div>
              </div>
              <button class="text-gray-400">
                <SpeakerWaveIcon class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- 上传信息 -->
          <div class="flex items-center justify-between text-sm text-gray-500">
            <div>已上传：60s</div>
            <div class="flex items-center text-green-500">
              <CheckCircleIcon class="w-5 h-5 mr-1" />
              不错
            </div>
          </div>

          <!-- 用户协议 -->
          <div class="flex items-center">
            <input type="checkbox" v-model="agreement" class="text-primary focus:ring-primary rounded" />
            <span class="ml-2 text-sm text-gray-600">我已阅读并同意</span>
            <button class="text-primary text-sm ml-1">使用者承诺</button>
          </div>

          <!-- 提交按钮 -->
          <button 
            class="w-full bg-primary text-white rounded-lg py-3 font-medium disabled:opacity-50"
            :disabled="!agreement"
          >
            立即复刻
          </button>
        </div>
      </div>

      <!-- 录制区域 -->
      <div v-else class="bg-white rounded-lg p-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MicrophoneIcon class="w-10 h-10 text-red-500" />
          </div>
          <div class="text-gray-800 font-medium mb-2">点击开始录制</div>
          <div class="text-sm text-gray-500">请保持安静的环境</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  CloudArrowUpIcon,
  MicrophoneIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  XMarkIcon,
  CheckCircleIcon,
  LightBulbIcon
} from '@heroicons/vue/24/outline'

const tabs = [
  { id: 'upload', name: '上传音频' },
  { id: 'record', name: '录制音频' }
]

const activeTab = ref('upload')
const uploadedFile = ref(null)
const agreement = ref(false)

const removeFile = () => {
  uploadedFile.value = null
}

// 模拟文件上传
const handleFileUpload = (file) => {
  uploadedFile.value = {
    name: file.name,
    duration: '0:59'
  }
}
</script> 