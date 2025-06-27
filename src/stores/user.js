import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
  const subsite = ref(JSON.parse(localStorage.getItem('subsite') || '{}'))
  const mainSiteName = ref(localStorage.getItem('mainSiteName') || '')
  const mainSiteLogo = ref(localStorage.getItem('mainSiteLogo') || '')
  const mainSiteAnnouncement = ref(localStorage.getItem('mainSiteAnnouncement') || '')
  const enableMainSiteAnnouncement = ref(JSON.parse(localStorage.getItem('enableMainSiteAnnouncement') || 'false'))
  
  const isLoggedIn = computed(() => {
    return !!token.value && Object.keys(user.value).length > 0
  })

  // 站点名称的计算属性
  const siteName = computed(() => {
    if (subsite.value && subsite.value.name) {
      return subsite.value.name
    }
    return mainSiteName.value || '数字人平台'
  })

  // 站点Logo的计算属性
  const siteLogo = computed(() => {
    if (subsite.value && subsite.value.logo) {
      return subsite.value.logo
    }
    return mainSiteLogo.value
  })

  // 公告内容的计算属性
  const announcement = computed(() => {
    if (subsite.value && subsite.value.announcement) {
      return subsite.value.announcement
    }
    return mainSiteAnnouncement.value
  })

  // 公告是否启用的计算属性
  const isAnnouncementEnabled = computed(() => {
    if (subsite.value && subsite.value.id) {
      return subsite.value.enableAnnouncement !== false
    }
    return enableMainSiteAnnouncement.value
  })

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const setSiteInfo = (data) => {
    if (data.subsite) {
      subsite.value = data.subsite
      localStorage.setItem('subsite', JSON.stringify(data.subsite))
      mainSiteName.value = ''
      mainSiteLogo.value = ''
      localStorage.removeItem('mainSiteName')
      localStorage.removeItem('mainSiteLogo')
      mainSiteAnnouncement.value = ''
      enableMainSiteAnnouncement.value = false
      localStorage.removeItem('mainSiteAnnouncement')
      localStorage.removeItem('enableMainSiteAnnouncement')
    } else {
      subsite.value = {}
      localStorage.removeItem('subsite')
      mainSiteName.value = data.mainSiteName || ''
      mainSiteLogo.value = data.mainSiteLogo || ''
      mainSiteAnnouncement.value = data.mainSiteAnnouncement || ''
      enableMainSiteAnnouncement.value = data.enableMainSiteAnnouncement || false
      localStorage.setItem('mainSiteName', mainSiteName.value)
      localStorage.setItem('mainSiteLogo', mainSiteLogo.value)
      localStorage.setItem('mainSiteAnnouncement', mainSiteAnnouncement.value)
      localStorage.setItem('enableMainSiteAnnouncement', JSON.stringify(enableMainSiteAnnouncement.value))
    }
  }

  const logout = () => {
    token.value = ''
    user.value = {}
    subsite.value = {}
    mainSiteName.value = ''
    mainSiteLogo.value = ''
    mainSiteAnnouncement.value = ''
    enableMainSiteAnnouncement.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('subsite')
    localStorage.removeItem('mainSiteName')
    localStorage.removeItem('mainSiteLogo')
    localStorage.removeItem('mainSiteAnnouncement')
    localStorage.removeItem('enableMainSiteAnnouncement')
  }

  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (storedToken && Object.keys(storedUser).length > 0) {
      token.value = storedToken
      user.value = storedUser
      subsite.value = JSON.parse(localStorage.getItem('subsite') || '{}')
      mainSiteName.value = localStorage.getItem('mainSiteName') || ''
      mainSiteLogo.value = localStorage.getItem('mainSiteLogo') || ''
      mainSiteAnnouncement.value = localStorage.getItem('mainSiteAnnouncement') || ''
      enableMainSiteAnnouncement.value = JSON.parse(localStorage.getItem('enableMainSiteAnnouncement') || 'false')
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
          setSiteInfo(data) // 使用新的函数统一设置站点信息
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
    mainSiteName,
    mainSiteLogo,
    siteName,
    siteLogo,
    announcement,
    isAnnouncementEnabled,
    isLoggedIn,
    setToken,
    setUser,
    logout,
    initAuth,
    updateUserInfo
  }
}) 