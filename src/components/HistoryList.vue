<template>
  <div class="w-[420px] h-full flex flex-col bg-white dark:bg-dark-card rounded-l-3xl shadow-xl border-l border-gray-100 dark:border-gray-800 p-10 overflow-y-auto">
    <div class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center">
      <svg class="w-7 h-7 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none">
        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      历史生成记录
    </div>
    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div v-if="historyList.length === 0" class="text-gray-400 dark:text-gray-500 text-center py-8 bg-gray-50 dark:bg-dark-card rounded-xl">
        暂无历史记录
      </div>
      <div v-else class="space-y-6">
        <HistoryItem
          v-for="item in historyList"
          :key="item.id"
          :item="item"
          :is-playing="historyPlaying[item.id]"
          @toggle-play="toggleHistoryPlay"
          @download="downloadHistory"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HistoryItem from './HistoryItem.vue'

const props = defineProps({
  historyList: Array,
  historyPlaying: Object,
})

const emit = defineEmits(['toggle-play', 'download'])

const toggleHistoryPlay = (id) => {
  emit('toggle-play', id)
}

const downloadHistory = (item) => {
  emit('download', item)
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e0e0e0 #f1f1f1;
  -webkit-overflow-scrolling: touch;
}

:deep(.dark) .custom-scrollbar {
 scrollbar-color: #4b5563 #1f2937;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: content-box;
}

:deep(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}
</style> 