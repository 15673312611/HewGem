import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './index.css'
import { loadThemeConfig } from './utils/theme-config'
import { loadFaviconConfig } from './utils/favicon'

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

// 先加载主题配置和favicon，然后再挂载应用
Promise.allSettled([
  loadThemeConfig(),
  loadFaviconConfig()
]).then(results => {
  const [themeResult, faviconResult] = results;
  
  // 处理主题配置结果
  if (themeResult.status === 'fulfilled') {
    console.log('主题配置已加载:', themeResult.value || window.THEME_CONFIG.defaultTheme);
  } else {
    console.error('主题配置加载失败，使用默认主题:', themeResult.reason);
    // 触发事件让应用知道配置加载已完成
    window.dispatchEvent(new CustomEvent('theme-config-loaded', {
      detail: { theme: window.THEME_CONFIG.defaultTheme }
    }));
  }
  
  // 处理favicon配置结果
  if (faviconResult.status === 'fulfilled') {
    console.log('Favicon配置处理完成');
  } else {
    console.error('Favicon配置加载失败:', faviconResult.reason);
  }
  
  // 无论配置加载成功与否，都要挂载应用
  app.mount('#app')
}).catch(error => {
  console.error('应用初始化失败:', error);
  // 即使出现意外错误，也要挂载应用
  app.mount('#app')
}); 