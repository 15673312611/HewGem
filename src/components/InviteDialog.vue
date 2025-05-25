<template>
  <el-dialog
    v-model="showInviteDialog"
    width="620px"
    :close-on-click-modal="false"
    class="invite-dialog"
    :show-close="true"
    :destroy-on-close="true"
    top="8vh"
  >
    <div class="invite-bg rounded-2xl overflow-hidden relative shadow-lg">
      <!-- 背景装饰 -->
      <div class="absolute left-0 top-0 w-full h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 z-0 opacity-90"></div>
      <div class="absolute right-0 top-0 w-64 h-64">
        <svg class="opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M46.6,-77.8C59.8,-70.6,69.7,-56.6,77.9,-41.5C86.1,-26.4,92.6,-10.3,91.8,5.5C91,21.3,82.8,36.9,71.6,49.2C60.3,61.5,46,70.5,30.6,76.8C15.3,83.2,-1.1,86.9,-16.9,84.2C-32.7,81.6,-47.9,72.7,-59.7,60.3C-71.5,47.9,-79.9,32.1,-83.1,15.2C-86.3,-1.7,-84.4,-19.7,-76.8,-34.3C-69.2,-48.9,-55.9,-60,-41.7,-67.3C-27.5,-74.6,-12.2,-78,-0.4,-77.3C11.3,-76.5,33.4,-85,46.6,-77.8Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div class="absolute left-0 bottom-0 opacity-10">
        <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4F46E5" d="M47.7,-73.2C59.1,-67.3,64.2,-49.7,69.9,-33.8C75.7,-17.9,82.1,-3.5,80.4,9.5C78.7,22.6,68.9,34.4,58.2,44.3C47.6,54.2,36.1,62.2,22.8,68.6C9.5,75,-5.5,79.9,-20.4,78C-35.2,76.2,-49.8,67.7,-58,55.5C-66.3,43.3,-68.2,27.5,-70.8,11.7C-73.3,-4.1,-76.4,-19.8,-71.8,-32.8C-67.1,-45.8,-54.7,-56.1,-41.2,-60.9C-27.8,-65.6,-13.9,-64.9,1.6,-67.4C17,-69.9,34.1,-75.7,47.7,-73.2Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <!-- 内容区域 -->
      <div class="relative z-10 px-12 pt-12 pb-6 flex flex-col items-center">
        <div class="text-white text-3xl md:text-4xl font-black mb-4 text-center drop-shadow-md tracking-tight">邀请好友注册，立获</div>
        <div class="flex items-center justify-center relative mb-4">
          <div class="absolute inset-0 bg-white/30 blur-xl rounded-full"></div>
          <div class="relative flex items-end">
            <span class="text-[62px] md:text-[80px] font-extrabold text-white leading-none" style="text-shadow: 0 8px 24px rgba(37, 99, 235, 0.5);">300</span>
            <span class="text-3xl font-bold text-white ml-3 mb-3">算力</span>
          </div>
        </div>
        <div class="bg-white/90 rounded-full px-6 py-2 text-blue-600 font-medium text-base mb-6 shadow-md">
          等于5分钟时长，有效期30天
        </div>
      </div>
      
      <!-- 累计奖励和上限 -->
      <div class="bg-white rounded-xl mx-10 p-5 flex flex-col md:flex-row items-center justify-between shadow-lg relative z-10">
        <div class="flex flex-col md:flex-row items-center">
          <svg class="w-8 h-8 text-blue-500 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 17l-3.54-3.54" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.48 10.52c.3.28.48.67.52 1.08" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div>
            <div class="text-base text-gray-900 font-semibold flex items-center">
              已累计获得 <span class="text-blue-600 font-bold text-xl ml-1.5">{{ totalInviteReward }}</span> 算力
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-500 mt-2 md:mt-0 border-l pl-4 hidden md:block">您每月最多可获得3000算力</div>
      </div>
      
      <!-- 复制链接按钮 -->
      <div class="flex flex-col items-center mt-10 mb-4 relative z-10 px-10">
        <button @click="copyInviteLink" class="group w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center">
          <svg class="w-6 h-6 mr-2 group-hover:animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          复制邀请链接
        </button>
        
        <div class="mt-3 text-gray-500 text-sm">
          邀请码: <span class="font-mono font-medium select-all text-blue-600">{{ userStore.user?.inviteCode }}</span>
        </div>
      </div>
      
      <!-- 规则说明 -->
      <div class="mx-10 mb-8 mt-4 bg-blue-50 rounded-xl p-5 text-gray-700 text-sm relative z-10 border border-blue-100">
        <div class="flex items-center font-semibold mb-3 text-blue-800">
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          使用说明：
        </div>
        <ul class="list-disc pl-6 space-y-2">
          <li>复制邀请链接或邀请码给好友，对方通过邀请注册成功后，你即可获得300算力。</li>
          <li>如发现违规获取算力的行为，将追回算力或冻结账号。</li>
          <li>活动解释权归官方所有。</li>
        </ul>
      </div>
    </div>
    <template #footer></template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request'

const userStore = useUserStore()
const showInviteDialog = ref(false)
const inviteLink = ref('')
const totalInviteReward = ref(0)

// 生成邀请链接
const generateInviteLink = () => {
  if (!userStore.user?.inviteCode) {
    ElMessage.error('邀请码获取失败，请刷新页面重试');
    return;
  }
  const baseUrl = window.location.origin
  inviteLink.value = `${baseUrl}?inviteCode=${userStore.user.inviteCode}`
}

// 复制邀请链接
const copyInviteLink = () => {
  navigator.clipboard.writeText(inviteLink.value).then(() => {
    ElMessage.success('邀请链接已复制')
  }).catch(() => {
    ElMessage.error('复制失败，请手动复制')
  })
}

// 获取累计邀请奖励
const getTotalInviteReward = async () => {
  if (!userStore.user?.id) return;
  try {
    const res = await request.get('/api/invite/total-reward', { params: { userId: userStore.user.id } });
    if (res.code === 200) {
      totalInviteReward.value = res.data;
    }
  } catch (e) {
    totalInviteReward.value = 0;
  }
}

onMounted(() => {
  // 监听全局事件，收到时弹出邀请好友弹窗
  window.addEventListener('show-invite-dialog', () => {
    showInviteDialog.value = true;
    // 当弹窗显示时，生成邀请链接和获取累计奖励
    generateInviteLink();
    getTotalInviteReward();
  });
});

// 组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('show-invite-dialog', () => {
    showInviteDialog.value = true;
  });
});
</script>

<style scoped>
.invite-dialog :deep(.el-dialog__header) {
  background: linear-gradient(to right, #3b82f6, #4f46e5);
  color: white;
  border-radius: 1rem 1rem 0 0;
}

.invite-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.invite-dialog :deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
}

.invite-dialog :deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #e5e7eb;
}

.invite-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.invite-dialog :deep(.el-dialog) {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.invite-bg {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  min-height: 560px;
}
</style> 