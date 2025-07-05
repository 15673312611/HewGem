<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 分站公告弹窗 -->
    <AnnouncementDialog 
      ref="announcementDialog"
      :announcement="subsiteInfo?.announcement"
      :enableAnnouncement="subsiteInfo?.enableAnnouncement"
      @close="handleAnnouncementClose"
    />

    <!-- 顶部导航 -->
    <header class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <!-- 分站 Logo -->
            <img v-if="subsiteInfo?.logo" :src="subsiteInfo.logo" alt="分站Logo" class="h-10 mr-4">
            <!-- 分站名称 -->
            <h1 class="text-2xl font-bold">{{ subsiteInfo?.name || '加载中...' }}</h1>
          </div>
          <div>
            <!-- 登录/注册按钮 -->
            <button v-if="!isLoggedIn" 
                    @click="handleLogin" 
                    class="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-all mr-2">
              登录
            </button>
            <button v-if="!isLoggedIn" 
                    @click="handleRegister" 
                    class="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-all">
              注册
            </button>
            <!-- 用户信息 -->
            <div v-else class="flex items-center space-x-4">
              <div class="bg-white bg-opacity-20 rounded-full px-4 py-1">
                <div class="flex items-center space-x-2">
                  <span class="text-yellow-300">⚡</span>
                  <span>{{ userInfo?.power || 0 }}</span>
                </div>
              </div>
              <button @click="handleUserClick" class="flex items-center space-x-2">
                <span>{{ userInfo?.username }}</span>
                <span class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
                  {{ getUserInitials(userInfo?.username) }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区域 - 这里可以根据需求添加分站特定内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧内容区域 -->
        <div class="col-span-2">
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">欢迎访问{{ subsiteInfo?.name }}</h2>
            <p class="text-gray-600">这是由数字人平台提供技术支持的分站。</p>
          </div>

          <!-- 这里可以根据需求添加更多内容板块 -->
        </div>

        <!-- 右侧边栏 -->
        <div class="col-span-1">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">关于我们</h3>
            <p class="text-gray-600 mb-4">这是一个专业的数字人生成平台分站，提供高质量的数字人视频制作服务。</p>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部页脚 -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p>© {{ new Date().getFullYear() }} {{ subsiteInfo?.name || '数字人平台' }}. 版权所有</p>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-gray-300 transition-colors">联系我们</a>
            <a href="#" class="hover:text-gray-300 transition-colors">隐私政策</a>
            <a href="#" class="hover:text-gray-300 transition-colors">使用条款</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import AnnouncementDialog from '@/components/AnnouncementDialog.vue';
import { useUserStore } from '@/stores/user';
import { useLoginModal } from '@/composables/useLoginModal';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { showLoginModal } = useLoginModal();

// 引入全局用户信息
const userInfo = inject('userInfo');
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 分站信息
const subsiteInfo = ref(null);
const subsiteDomain = ref('');
const announcementDialog = ref(null);
const loading = ref(false);

// 获取分站信息
const fetchSubsiteInfo = async () => {
  const domain = route.params.domain;
  if (!domain) {
    console.error('未找到分站域名');
    return;
  }
  
  subsiteDomain.value = domain;
  loading.value = true;
  
  try {
    const response = await axios.get('/api/subsite/public-info');
    
    if (response.data.code === 0 && response.data.data) {
      subsiteInfo.value = response.data.data;
      
      // 如果用户已登录且localStorage中有showAnnouncementAfterLogin标记，则显示公告并清除该标记
      if (isLoggedIn.value && localStorage.getItem('showAnnouncementAfterLogin')) {
        localStorage.removeItem('showAnnouncementAfterLogin');
        // 延迟显示公告，确保组件已完全挂载
        setTimeout(() => {
          showAnnouncement();
        }, 500);
      } else if (subsiteInfo.value.enableAnnouncement && subsiteInfo.value.announcement) {
        // 如果有公告且启用，显示公告
        showAnnouncement();
      }
    } else {
      console.error('获取平台信息失败:', response.data.message);
    }
  } catch (error) {
    console.error('获取平台信息出错:', error);
  } finally {
    loading.value = false;
  }
};

// 显示公告对话框
const showAnnouncement = () => {
  if (announcementDialog.value) {
    announcementDialog.value.showDialog();
  }
};

// 处理公告关闭事件
const handleAnnouncementClose = () => {
  console.log('公告已关闭');
};

// 处理登录按钮点击
const handleLogin = () => {
  showLoginModal();
};

// 处理注册按钮点击
const handleRegister = () => {
  // 可以跳转到注册页面或显示注册模态框
};

// 处理用户头像点击
const handleUserClick = () => {
  router.push('/user-center');
};

// 获取用户名首字母作为头像显示
const getUserInitials = (username) => {
  if (!username) return '';
  return username.charAt(0).toUpperCase();
};

// 组件挂载后获取分站信息
onMounted(() => {
  fetchSubsiteInfo();
  
  // 监听登录成功事件
  window.addEventListener('login-success', () => {
    // 如果有公告且分站设置了登录后显示公告，则显示公告
    if (subsiteInfo.value?.enableAnnouncement && subsiteInfo.value?.announcement) {
      showAnnouncement();
    }
  });
});
</script>

<style scoped>
/* 可以添加特定的样式 */
</style> 