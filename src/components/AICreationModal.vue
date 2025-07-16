<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center" @click.self="closeModal">
    <div class="relative w-full max-w-[680px] mx-auto rounded-3xl shadow-lg dark:shadow-dark-lg overflow-hidden">
      <!-- 卡片主体 -->
      <div class="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-dark-card dark:via-dark-bg dark:to-dark-card p-10">
        <button @click="closeModal" class="absolute top-6 right-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        
        <!-- 步骤1: 输入 -->
        <div v-if="aiStep === 1">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">AI 智能文案</span>
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mb-8">输入创作主题，AI 为您生成高质量文案</p>
          
          <div class="mb-6">
            <label class="block text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">创作主题</label>
            <textarea
              v-model="aiTopic"
              rows="3"
              placeholder="例如：介绍一款新的咖啡产品"
              class="w-full p-4 bg-white dark:bg-dark-card2 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-inner dark:shadow-dark-inner focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-400 dark:focus:border-blue-700 transition-all outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            ></textarea>
            <p v-if="aiError" class="text-red-500 text-sm mt-2">{{ aiError }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">生成数量</label>
              <div class="flex items-center space-x-3 bg-white dark:bg-dark-card2 p-2 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-inner">
                <button @click="aiCount = 1" :class="[aiCount === 1 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300', 'flex-1 py-2 rounded-full font-medium transition-colors']">1条</button>
                <button @click="aiCount = 3" :class="[aiCount === 3 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300', 'flex-1 py-2 rounded-full font-medium transition-colors']">3条</button>
                <button @click="aiCount = 5" :class="[aiCount === 5 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300', 'flex-1 py-2 rounded-full font-medium transition-colors']">5条</button>
              </div>
            </div>
            <div>
              <label class="block text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">文案长度</label>
              <div class="flex items-center space-x-3 bg-white dark:bg-dark-card2 p-2 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-inner">
                <button @click="aiWordType = 100" :class="[aiWordType === 100 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300', 'flex-1 py-2 rounded-full font-medium transition-colors']">短文案</button>
                <button @click="aiWordType = 300" :class="[aiWordType === 300 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300', 'flex-1 py-2 rounded-full font-medium transition-colors']">中文案</button>
                <button @click="aiWordType = 500" :class="[aiWordType === 500 ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300', 'flex-1 py-2 rounded-full font-medium transition-colors']">长文案</button>
              </div>
            </div>
          </div>

          <button 
            @click="handleAIGenerate" 
            :disabled="aiLoading"
            class="w-full h-14 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div v-if="aiLoading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
            <span>{{ aiLoading ? '生成中...' : '立即生成' }}</span>
          </button>
        </div>
        
        <!-- 步骤2: 结果 -->
        <div v-if="aiStep === 2">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">生成结果</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-6">为您生成了 <span class="text-blue-500 font-bold">{{ aiResults.length }}</span> 条文案，本次消耗 <span class="text-blue-500 font-bold">{{ aiCost }}</span> 算力</p>
          
          <div class="space-y-4 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
            <div 
              v-for="(result, index) in aiResults" 
              :key="index"
              class="bg-white dark:bg-dark-card2 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
            >
              <p class="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{{ result }}</p>
              <div class="flex justify-end space-x-3">
                <button @click="copyAICreation(result)" class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">复制</button>
                <button @click="useAICreation(result)" class="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">使用文案</button>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-4 mt-6">
            <button @click="aiStep = 1" class="px-6 py-2.5 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">返回修改</button>
            <button @click="handleAIGenerateAgain" :disabled="aiLoading" class="px-6 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center">
              <div v-if="aiLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              重新生成
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { debounce } from 'lodash-es';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:show', 'use-text']);

const userStore = useUserStore();

const aiStep = ref(1);
const aiTopic = ref('');
const aiCount = ref(3);
const aiWordType = ref(100);
const aiLoading = ref(false);
const aiResults = ref([]);
const aiError = ref('');
const aiCost = ref(0);

const closeModal = () => {
  emit('update:show', false);
  // Reset state on close
  setTimeout(() => {
    aiStep.value = 1;
    aiTopic.value = '';
    aiResults.value = [];
    aiError.value = '';
  }, 300);
};

const handleAIGenerate = debounce(async () => {
  if (!aiTopic.value.trim()) {
    aiError.value = '请输入话题';
    return;
  }
  
  aiError.value = '';
  aiLoading.value = true;
  aiResults.value = [];
  aiCost.value = 0;
  
  try {
    const res = await fetch('/api/ai-creation/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        topic: aiTopic.value,
        count: aiCount.value,
        wordCount: aiWordType.value
      })
    });
    
    const result = await res.json();
    if (result.code === 200) {
      aiResults.value = result.data.creations || [];
      aiCost.value = result.data.cost || 0;
      aiStep.value = 2;
      if (aiResults.value.length === 0) {
        aiError.value = '未生成文案，请换个话题重试';
      }
    } else {
      aiError.value = result.message || '生成失败';
    }
  } catch (e) {
    aiError.value = e.message || '请求失败';
  } finally {
    aiLoading.value = false;
  }
}, 300);

const handleAIGenerateAgain = () => {
  handleAIGenerate();
};

const copyAICreation = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success('已复制');
  } catch {
    ElMessage.error('复制失败');
  }
};

const useAICreation = (text) => {
  emit('use-text', text);
  closeModal();
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}
</style> 