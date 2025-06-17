<!-- 分站创建页面 -->
<template>
    <div class="subsite-create min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div class="max-w-5xl mx-auto">
        <!-- 标题 -->
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">打造您的专属分站</h1>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">拥有自己的品牌形象，建立专属用户社区，开启您的数字人创业之旅</p>
        </div>
        
        <!-- 主要内容 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <!-- 左侧：特点展示 -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
            <div class="h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <div class="p-7">
              <h2 class="text-2xl font-bold text-gray-800 mb-5">分站特权</h2>
              
              <div class="space-y-5">
                <!-- 特点1 -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-11 w-11 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">专属域名</h3>
                    <p class="mt-1 text-base text-gray-600">获得您的专属二级域名 <span class="font-bold text-indigo-600">您的域名.aaa.cn</span>，打造个人品牌</p>
                  </div>
                </div>
                
                <!-- 特点2 -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-11 w-11 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">用户绑定</h3>
                    <p class="mt-1 text-base text-gray-600">从您分站注册的用户将自动与您绑定，建立您的专属用户社区</p>
                  </div>
                </div>
                
                <!-- 特点3 -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-11 w-11 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">卡密生成</h3>
                    <p class="mt-1 text-base text-gray-600">为您的用户生成卡密，帮助用户快速充值算力，提升体验</p>
                  </div>
                </div>
                
                <!-- 特点4 -->
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-11 w-11 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">个性化设置</h3>
                    <p class="mt-1 text-base text-gray-600">自定义分站公告、名称、LOGO，展示您的专业形象</p>
                  </div>
                </div>
              </div>
              
              <!-- 开通费用提示 -->
              <div class="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div class="flex items-center">
                  <svg class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-indigo-700 font-medium">开通费用：</span>
                  <span class="ml-2 text-indigo-900 font-bold">28,888</span>
                  <span class="ml-1 text-indigo-700">算力</span>
                </div>
                <p class="mt-1 text-sm text-indigo-600">开通分站需要消耗28,888算力，开通后不可退回</p>
              </div>
              
              <div class="mt-5 flex justify-center" v-if="!showForm">
                <button 
                  @click="handleOpenForm" 
                  class="px-8 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  立即开通分站
                </button>
              </div>
            </div>
          </div>
          
          <!-- 右侧：表单或图片 -->
          <div v-if="showForm" class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 ease-in-out">
            <div class="h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <div class="p-7">
              <div class="flex justify-between items-center mb-5">
                <h2 class="text-xl font-bold text-gray-800">开通分站</h2>
                <button @click="showForm = false" class="text-gray-400 hover:text-gray-600 focus:outline-none">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- 算力提示 -->
              <div class="mb-5 flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div class="text-sm font-medium text-gray-700">您的当前算力</div>
                  <div class="text-xl font-bold text-gray-900">{{ userPower }}</div>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-700">需要消耗</div>
                  <div class="text-xl font-bold text-red-500">28,888</div>
                </div>
                <div class="text-sm" :class="[hasSufficientPower ? 'text-green-600' : 'text-red-600']">
                  {{ hasSufficientPower ? '算力充足' : '算力不足' }}
                </div>
              </div>
              
              <el-form :model="subsiteForm" :rules="rules" ref="subsiteFormRef" label-position="top">
                <el-form-item label="分站名称" prop="title">
                  <el-input 
                    v-model="subsiteForm.title" 
                    placeholder="请输入分站名称" 
                    class="rounded-lg"
                    maxlength="20"
                    show-word-limit
                  ></el-input>
                  <div class="text-gray-500 text-sm mt-1">分站名称将显示在您的分站首页</div>
                </el-form-item>
                
                <el-form-item label="域名前缀" prop="domain">
                  <div class="flex items-center">
                    <el-input 
                      v-model="subsiteForm.domain" 
                      placeholder="请输入域名前缀" 
                      @blur="checkDomain"
                      @input="checkDomain"
                      class="rounded-lg"
                      maxlength="20"
                      show-word-limit
                    ></el-input>
                    <div class="ml-2 text-gray-700 font-medium">.aaa.cn</div>
                  </div>
                  <div v-if="domainChecking" class="flex items-center text-blue-500 text-sm mt-1">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    检查域名中...
                  </div>
                  <div v-else-if="domainAvailable === true" class="flex items-center text-green-500 text-sm mt-1">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    域名可用
                  </div>
                  <div v-else-if="domainAvailable === false" class="flex items-center text-red-500 text-sm mt-1">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    域名已被占用
                  </div>
                  <div v-else class="text-gray-500 text-sm mt-1">仅支持小写字母和数字，域名创建后不可修改</div>
                </el-form-item>
                
                <el-form-item label="分站公告" prop="announcement">
                  <el-input 
                    v-model="subsiteForm.announcement" 
                    type="textarea" 
                    :rows="3"
                    placeholder="请输入分站公告内容(可选)" 
                    class="rounded-lg"
                    maxlength="200"
                    show-word-limit
                  ></el-input>
                  <div class="text-gray-500 text-sm mt-1">公告将显示在分站首页，可留空</div>
                </el-form-item>
                
                <div class="mt-6">
                  <button 
                    type="button" 
                    :disabled="!canSubmit" 
                    @click="submitForm"
                    class="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ submitting ? '处理中...' : '立即开通' }}
                  </button>
                  
                  <!-- 底部服务条款说明 -->
                  <div class="mt-4 text-center">
                    <p class="text-gray-500 text-sm">开通分站即表示您同意我们的<a href="#" class="text-indigo-600 hover:underline">服务条款</a>和<a href="#" class="text-indigo-600 hover:underline">隐私政策</a></p>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
          
          <div v-else class="hidden md:block">
            <img src="https://cdn.pixabay.com/photo/2018/09/24/08/37/pixel-3699343_1280.png" alt="分站示意图" class="rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
          </div>
        </div>
        
        <!-- 底部空间，防止内容被挡住 -->
        <div class="py-8"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { useSubsiteStore } from '@/stores/subsite'
  import { useUserStore } from '@/stores/user'
  
  const router = useRouter()
  const subsiteStore = useSubsiteStore()
  const userStore = useUserStore()
  const subsiteFormRef = ref(null)
  const submitting = ref(false)
  const domainChecking = ref(false)
  const domainAvailable = ref(null)
  const showForm = ref(false)
  const userPower = ref(0)
  const hasSubsite = ref(false)
  
  const REQUIRED_POWER = 28888
  
  // 检查算力是否充足
  const hasSufficientPower = computed(() => {
    return userPower.value >= REQUIRED_POWER
  })
  
  const subsiteForm = reactive({
    title: '',
    domain: '',
    announcement: ''
  })
  
  const rules = {
    title: [
      { required: true, message: '请输入分站名称', trigger: 'blur' },
      { min: 2, max: 20, message: '分站名称长度在2-20个字符之间', trigger: 'blur' }
    ],
    domain: [
      { required: true, message: '请输入域名前缀', trigger: 'blur' },
      { pattern: /^[a-z0-9]+$/, message: '域名前缀只能包含小写字母和数字', trigger: 'blur' },
      { min: 1, max: 20, message: '域名前缀长度在1-20个字符之间', trigger: 'blur' }
    ],
    announcement: [
      { max: 200, message: '公告长度不能超过200个字符', trigger: 'blur' }
    ]
  }
  
  const canSubmit = computed(() => {
    return subsiteForm.title && 
           subsiteForm.domain && 
           // domainAvailable === true && // 暂时注释掉这个条件来测试按钮
           !submitting.value && 
           hasSufficientPower.value
  })
  
  // 检查用户是否已有分站
  const checkUserSubsite = async () => {
    try {
      const userSubsite = await subsiteStore.getUserSubsite()
      hasSubsite.value = !!userSubsite
      
      if (hasSubsite.value) {
        router.push('/subsite-admin')
      }
    } catch (error) {
      console.error('检查用户分站失败:', error)
    }
  }
  
  // 获取用户信息
  const getUserInfo = async () => {
    try {
      await userStore.updateUserInfo()
      userPower.value = userStore.user?.power || 0
      
      // 检查用户是否已有分站
      await checkUserSubsite()
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }
  
  // 检查域名是否可用
  const checkDomain = async () => {
    if (!subsiteForm.domain) {
      domainAvailable.value = null
      return
    }
    
    domainChecking.value = true
    domainAvailable.value = null
    
    try {
      domainAvailable.value = await subsiteStore.checkDomainAvailable(subsiteForm.domain)
      console.log('域名检查结果:', domainAvailable.value) // 添加调试信息
    } catch (error) {
      console.error('检查域名失败:', error)
      domainAvailable.value = null
    } finally {
      domainChecking.value = false
    }
  }
  
  // 提交表单
  const submitForm = async () => {
    if (!subsiteFormRef.value) return
    
    try {
      await subsiteFormRef.value.validate()
      
      // 添加额外验证，确保域名长度符合要求
      if (subsiteForm.domain.length < 1) {
        ElMessage.error('域名前缀不能为空')
        return
      }
      
      if (!domainAvailable.value) {
        ElMessage.error('域名已被占用，请更换')
        return
      }
      
      if (!hasSufficientPower.value) {
        ElMessage.error(`算力不足，开通分站需要${REQUIRED_POWER}算力`)
        return
      }
      
      submitting.value = true
      await subsiteStore.createSubsite({
        ...subsiteForm,
        requiredPower: REQUIRED_POWER
      })
      ElMessage.success('分站创建成功')
      router.push('/subsite-admin')
    } catch (error) {
      ElMessage.error(error.message || '创建失败，请重试')
    } finally {
      submitting.value = false
    }
  }
  
  const handleOpenForm = () => {
    // 这里可以添加一些逻辑，比如检查用户是否已有分站，然后再决定是否打开表单
    showForm.value = true
  }
  
  onMounted(() => {
    getUserInfo()
  })
  </script>
  
  <style scoped>
  .el-input {
    --el-input-border-radius: 0.5rem;
  }
  </style>
  