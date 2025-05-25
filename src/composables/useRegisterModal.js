import { ref } from 'vue'

const registerModalVisible = ref(false)

export function useRegisterModal() {
  const showRegisterModal = () => {
    registerModalVisible.value = true
  }

  const hideRegisterModal = () => {
    registerModalVisible.value = false
  }

  return {
    registerModalVisible,
    showRegisterModal,
    hideRegisterModal
  }
} 