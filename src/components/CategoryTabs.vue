<template>
  <div class="mb-6">
    <div class="flex flex-wrap gap-2 md:gap-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center space-x-2',
          activeCategory === category.id
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-gray-600 hover:bg-gray-50'
        ]"
      >
        <img 
          v-if="category.iconUrl" 
          :src="category.iconUrl" 
          :alt="category.name"
          class="w-5 h-5 object-contain"
        />
        <span>{{ category.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const categories = ref([])
const activeCategory = ref(null)

// 获取分类列表
const fetchCategories = async () => {
  try {
    const response = await request.get('/api/template/categories')
    categories.value = response.data || []
    // 如果有分类数据，默认选中第一个
    if (categories.value.length > 0) {
      activeCategory.value = categories.value[0].id
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
    ElMessage.error('获取分类列表失败')
  }
}

// 监听分类变化
const emit = defineEmits(['update:categoryId'])
watch(activeCategory, (newValue) => {
  emit('update:categoryId', newValue)
})

onMounted(() => {
  fetchCategories()
})
</script> 