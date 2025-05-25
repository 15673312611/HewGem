<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          注册账号
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          已有账号?
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
            立即登录
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input id="username" 
                   v-model="form.username" 
                   type="text" 
                   required 
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                   placeholder="用户名" />
          </div>
          <div>
            <label for="email" class="sr-only">邮箱</label>
            <input id="email" 
                   v-model="form.email" 
                   type="email" 
                   required 
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                   placeholder="邮箱" />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input id="password" 
                   v-model="form.password" 
                   type="password" 
                   required 
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                   placeholder="密码" />
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">确认密码</label>
            <input id="confirmPassword" 
                   v-model="form.confirmPassword" 
                   type="password" 
                   required 
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                   placeholder="确认密码" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="agreement" 
                   v-model="form.agreement" 
                   type="checkbox" 
                   required
                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label for="agreement" class="ml-2 block text-sm text-gray-900">
              我已阅读并同意
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">《用户协议》</a>
            </label>
          </div>
        </div>

        <div>
          <button type="submit" 
                  :disabled="!isFormValid || isLoading"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isLoading ? '注册中...' : '注册' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false,
  inviteCode: ''
})

const isFormValid = computed(() => {
  return form.value.username &&
         form.value.email &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.agreement
})

onMounted(() => {
  // 获取URL中的邀请码
  const inviteCode = route.query.inviteCode
  if (inviteCode) {
    form.value.inviteCode = inviteCode
  }
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    ElMessage.warning('请填写完整的注册信息')
    return
  }

  try {
    isLoading.value = true
    const response = await request.post('/api/auth/register', {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      inviteCode: form.value.inviteCode
    })

    if (response.code === 200) {
      ElMessage.success('注册成功')
      router.push('/login')
    } else {
      ElMessage.error(response.message || '注册失败')
    }
  } catch (error) {
    console.error('注册失败:', error)
    ElMessage.error(error.response?.data?.message || '注册失败')
  } finally {
    isLoading.value = false
  }
}
</script> 