<template>
  <div class="header">
    <div class="left">
      <!-- 其他内容 -->
    </div>
    <div class="right">
      <!-- 显示算力 -->
      <div class="power-info" v-if="userInfo">
        <span class="power-icon">⚡</span>
        <span class="power-value">{{ userInfo.power || 0 }}</span>
      </div>
      <!-- 其他内容 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const userInfo = ref(null)

const getUserInfo = async () => {
  try {
    const res = await axios.get('/api/user/info')
    userInfo.value = res.data
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.power-info {
  display: flex;
  align-items: center;
  margin-right: 24px;
}

.power-icon {
  color: #409eff;
  margin-right: 4px;
}

.power-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style> 