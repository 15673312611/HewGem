import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from './user'

export const useSubsiteStore = defineStore('subsite', () => {
  const loading = ref(false)
  const currentSubsite = ref(null)
  
  // 获取请求头配置
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  }

  // 检查域名是否可用
  const checkDomainAvailable = async (domain) => {
    try {
      const response = await axios.get(`/api/subsite/check-domain?domain=${domain}`, getAuthHeaders())
      if (response.data.code === 0) {
        return response.data.data.available
      }
      return false
    } catch (error) {
      console.error('检查域名失败:', error)
      return false
    }
  }

  // 创建分站
  const createSubsite = async (subsiteData) => {
    try {
      loading.value = true
      console.log('创建分站请求数据:', subsiteData)
      const response = await axios.post('/api/subsite/create', subsiteData, getAuthHeaders())
      console.log('创建分站响应:', response)
      if (response.data.code === 0) {
        currentSubsite.value = response.data.data
        return response.data.data
      }
      throw new Error(response.data.message || '创建分站失败')
    } catch (error) {
      console.error('创建分站失败:', error)
      console.error('错误详情:', error.response?.data)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取用户分站信息
  const getUserSubsite = async () => {
    try {
      loading.value = true
      const response = await axios.get('/api/subsite/info', getAuthHeaders())
      if (response.data.code === 0 && response.data.data) {
        currentSubsite.value = response.data.data
        return response.data.data
      }
      return null
    } catch (error) {
      console.error('获取分站信息失败:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  // 更新分站信息
  const updateSubsiteInfo = async (subsiteData) => {
    try {
      loading.value = true
      const response = await axios.put('/api/subsite/update', subsiteData, getAuthHeaders())
      if (response.data.code === 0) {
        currentSubsite.value = response.data.data
        return response.data.data
      }
      throw new Error(response.data.message || '更新分站失败')
    } catch (error) {
      console.error('更新分站失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    currentSubsite,
    checkDomainAvailable,
    createSubsite,
    getUserSubsite,
    updateSubsiteInfo
  }
}) 