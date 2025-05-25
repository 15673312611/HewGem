<template>
  <div class="relative rounded-lg overflow-hidden mb-6">
    <div class="absolute inset-0 bg-gradient-to-r from-[#36B4FF] to-[#6CD0FF]"></div>
    <div class="relative py-16 text-center">
      <h1 class="text-4xl font-bold text-white mb-8">
        搜索模板 一键创作
      </h1>
      <div class="max-w-2xl mx-auto px-4">
        <div class="relative">
          <input
            type="text"
            placeholder="搜索海量数字人模板..."
            class="w-full px-6 py-4 rounded-full border-0 shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
            <MagnifyingGlassIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
</script> 