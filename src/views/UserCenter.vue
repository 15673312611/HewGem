<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- 页面头部 -->
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">个人中心</h1>
      </div>
      
      <!-- 用户信息和充值卡片 -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 mb-8 overflow-hidden">
        <div class="p-8 relative">
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mt-20 -mr-20 opacity-50"></div>
          
          <div class="flex flex-col md:flex-row md:items-center gap-8 relative">
            <!-- 用户头像和信息 -->
            <div class="flex flex-col md:flex-row items-center gap-6">
              <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-500 flex items-center justify-center text-white shadow-md overflow-hidden">
                <UserIcon class="w-10 h-10" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-800 md:text-left text-center">{{ userInfo?.username }}</h2>
                <p class="text-gray-500 mt-1 md:text-left text-center">{{ userInfo?.email }}</p>
              </div>
            </div>
            
            <!-- 算力信息 -->
            <div class="flex-1 flex flex-col md:flex-row items-center justify-end gap-6">
              <div class="flex items-center bg-blue-50 px-6 py-3 rounded-xl border border-blue-100">
                <span class="text-blue-500 text-xl mr-2">⚡</span>
                <div>
                  <div class="text-sm text-gray-500">当前算力</div>
                  <div class="font-bold text-xl text-blue-600">{{ userInfo?.power || 0 }}</div>
                </div>
              </div>
              
              <button 
                @click="showRechargeDialog = true" 
                class="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
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
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-800">算力使用记录</h3>
        </div>
        
        <div class="overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-100">
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">算力变动</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备注</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="record in records" :key="record.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatDate(record.createTime) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 text-xs font-medium rounded-full" 
                        :class="getTypeClass(record)">
                    {{ getTypeText(record) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                    :class="record.amount > 0 ? 'text-green-600' : 'text-blue-600'">
                  {{ record.amount > 0 ? '+' : '' }}{{ record.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ record.remark }}</td>
              </tr>
              <tr v-if="records.length === 0">
                <td colspan="4" class="px-6 py-10 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div class="py-4 px-6 bg-gray-50 border-t border-gray-100" v-if="records.length > 0">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              共 {{ records.length }} 条记录
            </div>
            <div class="flex items-center space-x-2 text-sm">
              <button class="px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                上一页
              </button>
              <span class="px-3 py-1.5 rounded bg-blue-500 text-white">1</span>
              <button class="px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
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
            <p class="text-gray-500">当前算力</p>
            <p class="text-2xl font-bold text-blue-600">{{ userInfo?.power || 0 }}</p>
          </div>
          <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" style="width: 35%"></div>
          </div>
        </div>
        
        <!-- 卡密购买提示 -->
        <div class="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
          <div class="flex">
            <svg class="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-700">
              {{ isCutbDomain ? '联系微信:soe303 购买卡密' : '联系微信客服购买卡密' }}
            </span>
          </div>
        </div>
        
        <!-- 卡密输入 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">输入充值卡密</label>
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
                  class="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            取消
          </button>
          <button @click="handleRecharge" 
                  :disabled="recharging" 
                  class="px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]">
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

const userInfo = inject('userInfo')
const showRechargeDialog = ref(false)
const cardKey = ref('')
const recharging = ref(false)
const records = ref([])
const router = useRouter()
const userStore = useUserStore()

// 添加计算属性判断域名
const isCutbDomain = computed(() => {
  return window.location.hostname === 'ai.cutb.cn'
})

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
    return 'bg-orange-50 text-orange-600 border border-orange-200';
  }
  return record.amount > 0 ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-blue-50 text-blue-600 border border-blue-200';
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await request.get('/api/auth/check');
    if (res) {
      userInfo.value = res;
      // 同时更新 store 中的用户信息
      userStore.setUser(res);
      // 如果用户没有邀请码，请求生成
      if (!userInfo.value.inviteCode) {
        const inviteRes = await request.post('/api/user/generate-invite-code');
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
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d0d0d0;
}

:deep(.recharge-dialog .el-dialog) {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

:deep(.recharge-dialog .el-dialog__header) {
  padding: 1.25rem 1.5rem;
  margin: 0;
  border-bottom: 1px solid #f3f4f6;
  background-color: #fff;
}

:deep(.recharge-dialog .el-dialog__title) {
  font-weight: 600;
  color: #1f2937;
}

:deep(.recharge-dialog .el-dialog__body) {
  padding: 0;
}

:deep(.recharge-dialog .el-dialog__footer) {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f3f4f6;
}

:deep(.custom-input .el-input__wrapper) {
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

:deep(.custom-input .el-input__wrapper:hover) {
  border-color: #3b82f6;
}

:deep(.custom-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

:deep(.custom-message) {
  min-width: 240px;
  text-align: center;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
</style> 