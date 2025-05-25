import { ref } from 'vue'

const loginModalVisible = ref(false)
let lastRequestConfig = null

export function showLoginModal(requestConfig = null) {
  console.log('Showing login modal')
  loginModalVisible.value = true
  lastRequestConfig = requestConfig
}

export function hideLoginModal() {
  console.log('Hiding login modal')
  loginModalVisible.value = false
  lastRequestConfig = null
}

export function getLastRequestConfig() {
  return lastRequestConfig
}

// 导出默认值，以防万一有地方使用了默认导入
export default {
  loginModalVisible,
  showLoginModal,
  hideLoginModal,
  getLastRequestConfig
}

// 导出组合式函数
export function useLoginModal() {
  return {
    loginModalVisible,
    showLoginModal,
    hideLoginModal,
    getLastRequestConfig
  }
} 