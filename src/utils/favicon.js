import request from './request'

/**
 * 动态设置网站favicon
 * @param {string} faviconData - Base64编码的图标数据或图标URL
 */
export const setFavicon = (faviconData) => {
  try {
    // 查找现有的favicon link标签
    let faviconLink = document.querySelector('link[rel="icon"]') || 
                     document.querySelector('link[rel="shortcut icon"]')
    
    // 如果没有找到，创建一个新的
    if (!faviconLink) {
      faviconLink = document.createElement('link')
      faviconLink.rel = 'icon'
      document.head.appendChild(faviconLink)
    }
    
    // 设置favicon
    if (faviconData) {
      // 如果是Base64数据，直接使用
      if (faviconData.startsWith('data:image/')) {
        faviconLink.href = faviconData
        faviconLink.type = faviconData.match(/data:image\/([^;]+)/)?.[1] || 'image/png'
      } 
      // 如果是URL，直接设置
      else if (faviconData.startsWith('http')) {
        faviconLink.href = faviconData
      }
      // 如果是相对路径，也直接设置
      else {
        faviconLink.href = faviconData
      }
      
      console.log('Favicon已更新:', faviconData.substring(0, 50) + '...')
    }
  } catch (error) {
    console.error('设置favicon失败:', error)
  }
}

/**
 * 从后端加载favicon配置
 */
export const loadFaviconConfig = async () => {
  try {
    // 调用后端API获取系统配置
    const response = await request.get('/api/system-config/public-info')
    
    // 处理不同的响应数据结构
    let faviconData = null
    
    if (response.data) {
      // 如果是标准的success/data结构
      if (response.data.success && response.data.data && response.data.data.site_favicon) {
        faviconData = response.data.data.site_favicon
      }
      // 如果直接返回配置对象
      else if (response.data.site_favicon) {
        faviconData = response.data.site_favicon
      }
      // 如果是其他结构，尝试查找favicon相关字段
      else if (response.data.favicon) {
        faviconData = response.data.favicon
      }
    }
    
    if (faviconData) {
      setFavicon(faviconData)
      
      // 触发favicon加载完成事件
      window.dispatchEvent(new CustomEvent('favicon-loaded', {
        detail: { favicon: faviconData }
      }))
      
      console.log('Favicon配置已加载')
      return faviconData
    } else {
      console.log('后端未配置favicon，使用默认图标')
      return null
    }
  } catch (error) {
    console.error('加载favicon配置失败:', error)
    
    // 如果是401错误（未授权），不显示错误，静默失败
    if (error.response?.status === 401) {
      console.log('未登录状态，跳过favicon加载')
      return null
    }
    
    // 其他错误也静默处理，不影响应用正常运行
    return null
  }
}

/**
 * 重置为默认favicon
 */
export const resetToDefaultFavicon = () => {
  setFavicon('/vite.svg') // 使用项目默认的图标
}

export default {
  setFavicon,
  loadFaviconConfig,
  resetToDefaultFavicon
}