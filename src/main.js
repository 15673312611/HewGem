import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './index.css'
import { loadThemeConfig } from './utils/theme-config'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 初始化全局配置
window.THEME_CONFIG = {
  defaultTheme: document.querySelector('meta[name="theme-default"]')?.getAttribute('content') || 'light'
};

// 创建Vue应用
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})

// 先加载主题配置，然后再挂载应用
loadThemeConfig().then(theme => {
  console.log('主题配置已加载:', theme || window.THEME_CONFIG.defaultTheme);
  
  // 主题配置加载完成后，再挂载应用
  app.mount('#app')
}).catch(error => {
  console.error('主题配置加载失败，使用默认主题:', error);
  
  // 即使加载失败，也要触发事件让应用知道配置加载已完成
  window.dispatchEvent(new CustomEvent('theme-config-loaded', {
    detail: { theme: window.THEME_CONFIG.defaultTheme }
  }));
  
  // 即使加载失败，也要挂载应用（使用默认配置）
  app.mount('#app')
}); 