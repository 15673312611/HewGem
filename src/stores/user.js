import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
  const subsite = ref(JSON.parse(localStorage.getItem('subsite') || '{}'))
  
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

  const setSubsite = (subsiteData) => {
    console.log('setSubsite called with:', subsiteData);
    if (subsiteData && Object.keys(subsiteData).length > 0) {
      subsite.value = subsiteData;
      localStorage.setItem('subsite', JSON.stringify(subsiteData));
      console.log('subsite设置成功:', subsite.value);
    } else {
      subsite.value = {};
      localStorage.removeItem('subsite');
      console.log('subsite被清空');
    }
  }

  const logout = () => {
    token.value = ''
    user.value = {}
    subsite.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('subsite')
  }

  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const storedSubsite = JSON.parse(localStorage.getItem('subsite') || '{}')
    
    if (storedToken && Object.keys(storedUser).length > 0) {
      token.value = storedToken
      user.value = storedUser
      if (Object.keys(storedSubsite).length > 0) {
        subsite.value = storedSubsite
      }
      return true
    }
    return false
  }

  // 更新用户信息
  const updateUserInfo = async () => {
    if (!token.value) return null
    try {
      const response = await fetch('/api/auth/check', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        if (data && data.user) {
          setUser(data.user)
          setSubsite(data.subsite || null)
          return data
        } else {
          logout()
          return null
        }
      } else {
        logout()
        return null
      }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      logout()
      return null
    }
  }

  initAuth()

  return {
    token,
    user,
    subsite,
    isLoggedIn,
    setToken,
    setUser,
    setSubsite,
    logout,
    initAuth,
    updateUserInfo
  }
}) 