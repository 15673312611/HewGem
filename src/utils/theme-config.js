/**
 * 从配置文件加载主题配置
 * 在Docker环境中，会读取/config/theme.json文件
 */
export const loadThemeConfig = async () => {
  try {
    // 尝试从/config/theme.json加载配置
    const response = await fetch('/config/theme.json');
    if (response.ok) {
      const config = await response.json();
      if (config.theme && (config.theme === 'dark' || config.theme === 'light')) {
        window.THEME_CONFIG = {
          ...window.THEME_CONFIG,
          defaultTheme: config.theme
        };
        
        // 更新meta标签
        const metaTag = document.querySelector('meta[name="theme-default"]');
        if (metaTag) {
          metaTag.setAttribute('content', config.theme);
        }
        
        console.log('已加载主题配置:', config.theme);
        
        // 触发主题配置加载完成事件
        window.dispatchEvent(new CustomEvent('theme-config-loaded', {
          detail: { theme: config.theme }
        }));
        
        return config.theme;
      }
    }
    return null;
  } catch (error) {
    console.error('加载主题配置失败:', error);
    return null;
  }
};

export default { loadThemeConfig }; 