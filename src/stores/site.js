import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSiteStore = defineStore('site', () => {
  const siteInfo = ref({})
  const loaded = ref(false)
  const loading = ref(false)
  const error = ref(null)

  const fetchSiteInfo = async () => {
    if (loaded.value || loading.value) {
      console.log('站点信息已加载或正在加载中，跳过请求', { loaded: loaded.value, loading: loading.value })
      return siteInfo.value
    }
    
    console.log('开始获取站点信息...')
    try {
      loading.value = true
      error.value = null
      
      const response = await axios.get('/api/subsite/public-info')
      console.log('站点信息获取响应:', response.data)
      
      if (response.data && response.data.code === 0 && response.data.data) {
        siteInfo.value = response.data.data
        console.log('成功设置站点信息:', siteInfo.value)
      } else {
        console.warn('站点信息响应格式不符合预期:', response.data)
        // 设置默认值
        siteInfo.value = {
          name: '轻剪数字人',
          logo: '/logo.png'
        }
      }
      loaded.value = true
    } catch (err) {
      console.error('获取平台信息失败:', err)
      error.value = err.message || '未知错误'
      // 设置默认值
      siteInfo.value = {
        name: '轻剪数字人',
        logo: '/logo.png'
      }
      loaded.value = true // 即使出错也标记为已加载，避免反复请求
    } finally {
      loading.value = false
    }
    return siteInfo.value
  }

  return {
    siteInfo,
    loaded,
    loading,
    error,
    fetchSiteInfo
  }
}) 