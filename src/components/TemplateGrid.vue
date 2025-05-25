<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div
      v-for="template in templates"
      :key="template.id"
      class="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div class="aspect-w-1 aspect-h-1 bg-gray-100">
        <img
          :src="template.cover"
          :alt="template.title"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="p-3">
        <h3 class="text-sm font-medium text-[#1a1a1a] mb-2 line-clamp-2">
          {{ template.title }}
        </h3>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span class="line-clamp-1">{{ template.author }}</span>
          <span class="bg-gray-100 px-2 py-0.5 rounded">{{ template.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const templates = [
  {
    id: 1,
    title: '强大的女人，会为自己的人生扩容',
    cover: 'https://via.placeholder.com/400x400',
    author: '设计师小王',
    category: '营销'
  },
  {
    id: 2,
    title: '情感故事：心灵的对话',
    cover: 'https://via.placeholder.com/400x400',
    author: '剪辑师小李',
    category: '情感'
  },
  {
    id: 3,
    title: '省钱小妙招：生活更轻松',
    cover: 'https://via.placeholder.com/400x400',
    author: '生活达人',
    category: '知识'
  },
  {
    id: 4,
    title: '深圳律师免费咨询',
    cover: 'https://via.placeholder.com/400x400',
    author: '法律顾问',
    category: '资讯'
  },
  {
    id: 5,
    title: '女生一定要见世面',
    cover: 'https://via.placeholder.com/400x400',
    author: '人生导师',
    category: '情感'
  },
  {
    id: 6,
    title: '职场必备技能分享',
    cover: 'https://via.placeholder.com/400x400',
    author: '职场导师',
    category: '知识'
  }
]
</script>

<style>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 