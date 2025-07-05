<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-bg2 py-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- 页面头部 -->
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">个人中心</h1>
      </div>
      
      <!-- 用户信息和充值卡片 -->
      <div class="bg-white dark:bg-dark-card rounded-2xl shadow-md dark:shadow-dark-sm border border-gray-100 dark:border-dark-border mb-8 overflow-hidden">
        <div class="p-8 relative">
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full -mt-20 -mr-20 opacity-50"></div>
          
          <div class="flex flex-col md:flex-row md:items-center gap-8 relative">
            <!-- 用户头像和信息 -->
            <div class="flex flex-col md:flex-row items-center gap-6">
              <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white shadow-md dark:shadow-dark-sm overflow-hidden">
                <UserIcon class="w-10 h-10" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 md:text-left text-center">{{ userInfo?.username }}</h2>
                <p class="text-gray-500 dark:text-gray-400 mt-1 md:text-left text-center">{{ userInfo?.email }}</p>
              </div>
            </div>
            
            <!-- 算力信息 -->
            <div class="flex-1 flex flex-col md:flex-row items-center justify-end gap-6">
              <div class="flex items-center bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <span class="text-blue-500 dark:text-blue-400 text-xl mr-2">⚡</span>
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">当前算力</div>
                  <div class="font-bold text-xl text-blue-600 dark:text-blue-400">{{ userInfo?.power || 0 }}</div>
                </div>
              </div>
              
              <button 
                @click="showRechargeDialog = true" 
                class="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all shadow-md dark:shadow-dark-sm hover:shadow-lg dark:hover:shadow-dark-lg flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                立即充值
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 使用记录 -->
      <div class="bg-white dark:bg-dark-card rounded-2xl shadow-md dark:shadow-dark-sm border border-gray-100 dark:border-dark-border overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-100 dark:border-dark-border">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">算力使用记录</h3>
        </div>
        
        <div class="overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gray-50 dark:bg-dark-card2 border-b border-gray-100 dark:border-dark-border">
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时间</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">类型</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">算力变动</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">备注</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-dark-border">
              <tr v-for="record in records" :key="record.id" class="hover:bg-gray-50 dark:hover:bg-dark-card2 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{{ formatDate(record.createTime) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 text-xs font-medium rounded-full" 
                        :class="getTypeClass(record)">
                    {{ getTypeText(record) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                    :class="record.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'">
                  {{ record.amount > 0 ? '+' : '' }}{{ record.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{{ record.remark }}</td>
              </tr>
              <tr v-if="records.length === 0">
                <td colspan="4" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>暂无算力使用记录</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页区域 -->
        <div class="py-4 px-6 bg-gray-50 dark:bg-dark-card2 border-t border-gray-100 dark:border-dark-border" v-if="records.length > 0">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              共 {{ records.length }} 条记录
            </div>
            <div class="flex items-center space-x-2 text-sm">
              <button class="px-3 py-1.5 rounded border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
                上一页
              </button>
              <span class="px-3 py-1.5 rounded bg-blue-500 dark:bg-blue-600 text-white">1</span>
              <button class="px-3 py-1.5 rounded border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 充值弹窗 -->
    <el-dialog
      v-model="showRechargeDialog"
      title="账户充值"
      width="420px"
      :close-on-click-modal="false"
      class="recharge-dialog"
    >
      <div class="p-6">
        <!-- 当前算力 -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <p class="text-gray-500 dark:text-gray-400">当前算力</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ userInfo?.power || 0 }}</p>
          </div>
          <div class="w-full h-2 bg-gray-100 dark:bg-dark-card3 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-300 to-blue-500 dark:from-blue-600 dark:to-blue-700 rounded-full" style="width: 35%"></div>
          </div>
        </div>
        
        <!-- 卡密购买提示 -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 mb-6">
          <div class="flex">
            <svg class="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <!-- 分站显示简单提示 -->
              <template v-if="!isMainSite">
                联系微信客服购买卡密
              </template>
              <!-- 主站显示联系方式和购买地址 -->
              <template v-else>
                <div>联系微信: {{ contactInfo || '' }} 购买卡密</div>
                <a 
                  v-if="cardSiteUrl" 
                  :href="cardSiteUrl" 
                  target="_blank" 
                  class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  自助购买
                </a>
              </template>
            </div>
          </div>
        </div>
        
        <!-- 卡密输入 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">输入充值卡密</label>
          <el-input
            v-model="cardKey"
            placeholder="请输入充值卡密"
            :maxlength="16"
            show-word-limit
            class="custom-input"
          />
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <template #footer>
        <div class="flex justify-end space-x-4 p-2">
          <button @click="showRechargeDialog = false" 
                  class="px-4 py-2 bg-gray-100 dark:bg-dark-card2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card3 transition-colors">
            取消
          </button>
          <button @click="handleRecharge" 
                  :disabled="recharging" 
                  class="px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all shadow-sm dark:shadow-dark-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]">
            <svg v-if="recharging" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ recharging ? '充值中...' : '确认充值' }}</span>
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch, computed } from 'vue'
import { UserIcon } from '@heroicons/vue/24/outline'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSiteStore } from '@/stores/site'

const userInfo = inject('userInfo')
const showRechargeDialog = ref(false)
const cardKey = ref('')
const recharging = ref(false)
const records = ref([])
const router = useRouter()
const userStore = useUserStore()
const siteStore = useSiteStore()

// 系统配置信息
const contactInfo = ref('') // 联系方式
const cardSiteUrl = ref('') // 购买地址

// 添加计算属性判断域名
const isCutbDomain = computed(() => {
  return window.location.hostname === 'ai.cutb.cn'
})

// 是否为主站
const isMainSite = computed(() => {
  return !siteStore.subsiteInfo || !siteStore.subsiteInfo.id
})

// 获取系统配置
const fetchSystemConfig = async () => {
  try {
    const res = await request.get('/api/system-config/public-info')
    if (res && res.code === 200) {
      contactInfo.value = res.data.contactInfo || ''
      cardSiteUrl.value = res.data.cardSiteUrl || ''
    }
  } catch (error) {
    console.error('获取系统配置失败:', error)
  }
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// 获取类型文本
const getTypeText = (record) => {
  if (record.status === '3') {
    return '失败返还';
  }
  return record.type;
}

// 获取类型样式
const getTypeClass = (record) => {
  if (record.status === '3') {
    return 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/30';
  }
  return record.amount > 0 
    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30' 
    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30';
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await request.get('/api/auth/check');
    if (res && res.user) {
      userInfo.value = res.user;
      // 同时更新 store 中的用户信息
      userStore.setUser(res.user);
      // 如果用户没有邀请码，请求生成
      if (!userInfo.value.inviteCode) {
        const inviteRes = await request.post('/api/user/generate-invite-code', null, {
          params: {
            userId: userInfo.value.id
          }
        });
        if (inviteRes.code === 200) {
          userInfo.value.inviteCode = inviteRes.data;
          userStore.setUser(userInfo.value);
        }
      }
    } else {
      ElMessage({
        message: '获取用户信息失败',
        type: 'error',
        customClass: 'custom-message'
      });
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    ElMessage({
      message: '获取用户信息失败',
      type: 'error',
      customClass: 'custom-message'
    });
  }
};

// 获取使用记录
const getRecords = async () => {
  if (!userInfo.value?.id) {
    return;
  }
  
  try {
    const res = await request.get('/api/power/records', {
      params: {
        userId: userInfo.value.id
      }
    });
    if (res.code === 200) {
      records.value = res.data;
    } else {
      ElMessage({
        message: res.message || '获取使用记录失败',
        type: 'error',
        customClass: 'custom-message'
      });
    }
  } catch (error) {
    console.error('获取使用记录失败:', error);
    ElMessage({
      message: error.response?.data?.message || '获取使用记录失败',
      type: 'error',
      customClass: 'custom-message'
    });
  }
};

// 监听路由变化
watch(() => router.currentRoute.value, (newRoute) => {
  if (newRoute.path === '/user-center') {
    fetchUserInfo();
    getRecords();
  }
});

// 监听userInfo变化
watch(() => userInfo.value?.id, (newId) => {
  if (newId) {
    getRecords();
  }
});

onMounted(() => {
  fetchUserInfo();
  if (userInfo.value?.id) {
    getRecords();
  }
  // 获取系统配置
  fetchSystemConfig();
});

// 处理充值
const handleRecharge = async () => {
  if (!cardKey.value) {
    ElMessage({
      message: '请输入充值卡密',
      type: 'warning',
      customClass: 'custom-message'
    });
    return;
  }
  
  try {
    recharging.value = true;
    const response = await request.post('/api/card/use', {
      userId: userInfo.value.id,
      cardKey: cardKey.value
    });
    
    if (response.code === 200) {
      ElMessage({
        message: '充值成功',
        type: 'success',
        customClass: 'custom-message'
      });
      showRechargeDialog.value = false;
      cardKey.value = '';
      // 刷新用户信息和使用记录
      await getRecords();
      // 刷新用户信息
      window.location.reload();
    } else {
      ElMessage({
        message: response.message || '充值失败',
        type: 'error',
        customClass: 'custom-message'
      });
    }
  } catch (error) {
    console.error('充值失败:', error);
    ElMessage({
      message: error.response?.data?.message || '充值失败',
      type: 'error',
      customClass: 'custom-message'
    });
  } finally {
    recharging.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-dark-card3;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-dark-card;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-dark-border;
}

:deep(.recharge-dialog .el-dialog) {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  @apply dark:bg-dark-card dark:border dark:border-dark-border;
}

:deep(.recharge-dialog .el-dialog__header) {
  padding: 1.25rem 1.5rem;
  margin: 0;
  border-bottom: 1px solid #f3f4f6;
  background-color: #fff;
  @apply dark:bg-dark-card2 dark:border-dark-border;
}

:deep(.recharge-dialog .el-dialog__title) {
  font-weight: 600;
  color: #1f2937;
  @apply dark:text-gray-200;
}

:deep(.recharge-dialog .el-dialog__body) {
  padding: 0;
  @apply dark:bg-dark-card;
}

:deep(.recharge-dialog .el-dialog__footer) {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  @apply dark:border-dark-border dark:bg-dark-card2;
}

:deep(.custom-input .el-input__wrapper) {
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  @apply dark:bg-dark-card2 dark:border-dark-border dark:text-gray-300;
}

:deep(.custom-input .el-input__wrapper:hover) {
  border-color: #3b82f6;
  @apply dark:border-blue-500;
}

:deep(.custom-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
  @apply dark:border-blue-500 dark:shadow-blue-500/20;
}

:deep(.custom-message) {
  min-width: 240px;
  text-align: center;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  @apply dark:bg-dark-card dark:text-gray-200 dark:border dark:border-dark-border;
}

:deep(.el-message) {
  @apply dark:bg-dark-card dark:border dark:border-dark-border;
  
  .el-message__content {
    @apply dark:text-gray-200;
  }
  
  .el-message-icon--success {
    @apply dark:text-green-400;
  }
  
  .el-message-icon--warning {
    @apply dark:text-yellow-400;
  }
  
  .el-message-icon--error {
    @apply dark:text-red-400;
  }
}
</style> 