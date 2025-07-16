import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false, // 初始化为false，等待配置加载
    isInitialized: false, // 标记是否已经初始化过
  }),
  actions: {
    toggleTheme() {
      // 添加过渡类
      document.documentElement.classList.add('theme-transition')
      
      // 设置延时移除过渡类
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 700) // 比过渡时间稍长一点
      
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
      this.applyTheme()
    },
    setTheme(isDark) {
      // 添加过渡类
      document.documentElement.classList.add('theme-transition')
      
      // 设置延时移除过渡类
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 700) // 比过渡时间稍长一点
      
      this.isDarkMode = isDark
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      this.applyTheme()
    },
    applyTheme() {
      // 应用主题到HTML元素
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    init() {
      // 初始化主题 - 从localStorage或配置中读取
      const savedTheme = localStorage.getItem('theme')
      const configTheme = window.THEME_CONFIG?.defaultTheme
      
      console.log('主题初始化:', { savedTheme, configTheme, isInitialized: this.isInitialized })
      
      // 如果是首次初始化，优先使用配置
      if (!this.isInitialized && configTheme) {
        this.isDarkMode = configTheme === 'dark'
        console.log('首次初始化，使用配置主题:', configTheme)
      } else if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark'
        console.log('使用保存的主题:', savedTheme)
      } else if (configTheme) {
        this.isDarkMode = configTheme === 'dark'
        console.log('使用配置主题:', configTheme)
      } else {
        this.isDarkMode = false // 默认light
        console.log('使用默认主题: light')
      }
      
      this.isInitialized = true
      this.applyTheme()
    },
    // 新增：重新初始化主题（用于配置加载完成后）
    reinit() {
      // 重置初始化标志，强制重新评估配置
      this.isInitialized = false
      
      const configTheme = window.THEME_CONFIG?.defaultTheme
      console.log('重新初始化主题，配置主题:', configTheme)
      
      // 如果配置已加载，强制使用配置主题
      if (configTheme) {
        this.isDarkMode = configTheme === 'dark'
        localStorage.setItem('theme', configTheme) // 更新localStorage
        console.log('强制使用配置主题:', configTheme)
      } else {
        this.init() // 否则使用原来的逻辑
      }
      
      this.isInitialized = true
      this.applyTheme()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'theme',
        storage: localStorage,
      },
    ],
  },
}) 