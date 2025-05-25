import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
  
  const isLoggedIn = computed(() => {
    return !!token.value && Object.keys(user.value).length > 0
  })

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    token.value = ''
    user.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (storedToken && Object.keys(storedUser).length > 0) {
      token.value = storedToken
      user.value = storedUser
      return true
    }
    return false
  }

  // 更新用户信息
  const updateUserInfo = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        return userData
      }
      return null
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return null
    }
  }

  initAuth()

  return {
    token,
    user,
    isLoggedIn,
    setToken,
    setUser,
    logout,
    initAuth,
    updateUserInfo
  }
}) 