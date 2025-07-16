<template>
  <div class="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 flex flex-col items-start border border-blue-100 dark:border-blue-900 hover:shadow-2xl dark:hover:shadow-dark-2xl transition-shadow">
    <div class="flex items-center mb-2 w-full">
      <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-700 rounded-full flex items-center justify-center text-white shadow-md dark:shadow-dark-lg mr-3">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span class="font-bold text-lg text-gray-800 dark:text-gray-200 truncate">{{ item.name || '未命名音频' }}</span>
    </div>
    <div class="text-gray-400 dark:text-gray-500 text-sm mb-2">时长：{{ item.duration }} &nbsp;|&nbsp; 生成于 {{ formatTime(item.createdAt) }}</div>
    <div class="flex items-center space-x-3 mt-2">
      <button @click="$emit('toggle-play', item.id)" class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" class="w-7 h-7 text-white"><polygon points="6,3 20,12 6,21" fill="currentColor"/></svg>
        <svg v-else viewBox="0 0 24 24" class="w-7 h-7 text-white"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>
      </button>
      <button @click="$emit('download', item)" class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold shadow hover:from-blue-500 hover:to-blue-600 transition-colors">下载</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  isPlaying: Boolean,
})

const emit = defineEmits(['toggle-play', 'download'])

const formatTime = (dateObj) => {
  if (!dateObj) return '-'
  const date = new Date(dateObj)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
</script> 