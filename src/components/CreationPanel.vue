<template>
  <!-- 左侧语音合成 -->
  <div class="w-[420px] h-full flex flex-col items-center justify-center bg-white dark:bg-dark-card border-r border-gray-100 dark:border-gray-800 p-10">
    <!-- 标题、输入、文件名、生成按钮 -->
    <div class="w-full pt-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
        <span class="ml-24 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">语音合成</span>
        <div class="ml-3 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">专业版</div>
      </h2>
      <div class="flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-5 shadow-lg dark:shadow-dark-lg border border-blue-200/40 dark:border-blue-900/30 mb-8">
        <div class="flex items-center">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg dark:shadow-dark-lg relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10 rounded-full"></div>
            <span class="text-lg">AI</span>
            <div class="absolute w-full h-1/3 bottom-0 left-0 bg-black/10"></div>
          </div>
          <div class="ml-4">
            <div class="text-sm text-gray-500 dark:text-gray-400">当前声音</div>
            <div class="font-bold text-xl text-gray-800 dark:text-gray-200">{{ currentVoiceName || '未选择声音' }}</div>
          </div>
        </div>
        <button @click="$emit('show-voice-selector')" class="flex items-center space-x-1 bg-white dark:bg-dark-card2 px-4 py-2.5 rounded-xl text-blue-600 dark:text-blue-400 font-medium shadow-md dark:shadow-dark-md hover:shadow-xl dark:hover:shadow-dark-lg transition-[transform,box-shadow] border border-blue-200 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-800 transform hover:-translate-y-0.5 active:translate-y-0">
          <span>切换声音</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <!-- 文案输入 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <div class="text-xl font-bold text-gray-800 dark:text-gray-200">文本输入</div>
          <div class="flex space-x-3">
            <button class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" @click="$emit('ai-create')">
              <svg class="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="none">
                <path d="M9.5 19H14.5M12 15V19M5 11H19C20.1046 11 21 10.1046 21 9V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V9C3 10.1046 3.89543 11 5 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              AI创作
            </button>
            <button class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" @click="clearText">
              <svg class="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="none">
                <path d="M20 6H4M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              清空
            </button>
          </div>
        </div>
        <div class="relative">
          <textarea 
            :value="textContent"
            @input="updateTextContent"
            rows="7"
            placeholder="请输入您要合成的文本内容..."
            class="w-full p-6 bg-white dark:bg-dark-card2 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-inner dark:shadow-dark-inner focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-400 dark:focus:border-blue-700 transition-[border-color,box-shadow] outline-none resize-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 font-medium text-lg"
            :maxlength="450"
          ></textarea>
          <div class="absolute bottom-4 right-5 text-sm font-medium text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-dark-card2/80 px-2 py-1 rounded-lg">
            {{ textContent.length }}/450
          </div>
        </div>
      </div>
      <!-- 语速调节 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <div class="text-xl font-bold text-gray-800 dark:text-gray-200">语速调节</div>
          <div class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
            {{ speed.toFixed(1) }}
          </div>
        </div>
        <div class="bg-white dark:bg-dark-card2 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-inner dark:shadow-dark-inner p-4">
          <input 
            type="range" 
            :value="speed"
            @input="$emit('update:speed', parseFloat($event.target.value))"
            min="0.5" 
            max="2.0" 
            step="0.1"
            class="speed-slider"
          />
        </div>
      </div>
      <!-- 文件名称 -->
      <div class="mb-8">
        <div class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">声音名称 <span class="text-red-500">*</span></div>
        <div class="relative mb-5">
          <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none">
              <path d="M13 3L21 11M21 11L13 19M21 11H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input 
            v-model="fileName"
            placeholder="请输入声音名称" 
            class="w-full pl-14 pr-5 py-4 bg-white dark:bg-dark-card2 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-inner dark:shadow-dark-inner focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-400 dark:focus:border-blue-700 transition-[border-color,box-shadow] outline-none text-gray-700 dark:text-gray-300 text-lg font-medium placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
        </div>
        <button 
          @click="generate" 
          :disabled="isGenerating"
          class="w-full h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold text-xl rounded-2xl shadow-xl dark:shadow-dark-xl hover:shadow-2xl dark:hover:shadow-dark-2xl hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-[background-color,box-shadow,transform] transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div class="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span class="absolute inset-0 w-full h-full flex items-center justify-center">
            <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 16C15.59 16 15.25 15.78 15.08 15.45C14.9 15.12 14.92 14.73 15.13 14.42L15.55 13.74C15.89 13.18 15.89 12.49 15.54 11.93L13.75 9.06C13.39 8.5 12.76 8.18 12.08 8.18C11.4 8.18 10.77 8.5 10.42 9.06L8.34 12.42C8.07 12.85 7.56 13.07 7.07 12.92C6.58 12.76 6.24 12.27 6.24 11.72V11.72C6.24 11.38 6.4 11.06 6.66 10.86L9.45 8.75C10.34 8.09 11.48 7.82 12.58 8.01C13.69 8.21 14.64 8.84 15.23 9.79L15.91 10.89C16.32 11.56 16.04 12.42 15.37 12.83C14.7 13.25 13.84 12.97 13.42 12.3L12.84 11.36C12.65 11.05 12.28 10.89 11.91 10.95C11.54 11.01 11.25 11.27 11.12 11.62L10.75 12.69C10.56 13.23 10.65 13.83 10.99 14.29L13.26 17.17C13.67 17.69 14.41 17.78 14.93 17.38C15.46 16.97 15.55 16.22 15.15 15.71L15.02 15.53C14.77 15.2 14.77 14.75 15.03 14.42C15.15 14.26 15.32 14.15 15.51 14.09C15.69 14.03 15.89 14.04 16.07 14.1L16.28 14.18C16.7 14.36 16.98 14.79 16.98 15.25C16.98 15.66 16.55 16 16 16Z" fill="currentColor"/>
            </svg>
            立即生成
          </span>
          <div class="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/5"></div>
          <div class="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-white/5"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  currentVoiceName: String,
  isGenerating: Boolean,
  speed: Number,
  textContent: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['show-voice-selector', 'ai-create', 'generate', 'update:speed', 'update:textContent'])

const fileName = ref('')

const updateTextContent = (event) => {
  emit('update:textContent', event.target.value)
}

const clearText = () => {
  emit('update:textContent', '')
}

const generate = () => {
  if (!props.textContent.trim()) {
    ElMessage({ message: '请输入要合成的文本内容', type: 'warning', customClass: 'custom-message' })
    return
  }
  if (!fileName.value.trim()) {
    ElMessage({ message: '请输入声音名称', type: 'warning', customClass: 'custom-message' })
    return
  }
  emit('generate', {
    textContent: props.textContent,
    fileName: fileName.value,
  })
}

// Watchers and other logic can be moved here if they are specific to this panel
</script>

<style scoped>
.speed-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #dbeafe;
  outline: none;
  cursor: pointer;
}

.speed-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.speed-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.dark) .speed-slider {
  background: #1e3a8a;
}

:deep(.dark) .speed-slider::-webkit-slider-thumb {
  border-color: #60a5fa;
  background: #1f2937;
}

:deep(.dark) .speed-slider::-moz-range-thumb {
  border-color: #60a5fa;
  background: #1f2937;
}
</style> 