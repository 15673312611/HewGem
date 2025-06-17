<!-- 分站用户管理页面 -->
<template>
  <div class="subsite-users min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">分站用户管理</h1>
          <p class="mt-2 text-gray-600">管理您分站下的用户，为他们充值算力</p>
        </div>
        <div class="mt-4 md:mt-0">
          <router-link 
            to="/subsite-admin" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            返回分站管理
          </router-link>
        </div>
      </div>
      
      <div v-if="loading && !hasSubsite" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
      
      <div v-else-if="!hasSubsite" class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="mb-6">
          <svg class="mx-auto h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 class="mt-4 text-xl font-semibold text-gray-900">您还没有开通分站</h2>
          <p class="mt-2 text-gray-600">开通专属分站，打造您的个人品牌，获取更多收益</p>
        </div>
        <router-link 
          to="/subsite-create" 
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          立即开通分站
        </router-link>
      </div>
      
      <div v-else>
        <!-- 搜索和过滤 -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="search" class="block text-sm font-medium text-gray-700 mb-1">搜索用户</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="search"
                  v-model="searchQuery"
                  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="用户名/邮箱"
                  @keyup.enter="handleSearch"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button @click="handleSearch" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 mb-1">用户状态</label>
              <select
                id="status"
                v-model="statusFilter"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                @change="handleSearch"
              >
                <option value="">全部状态</option>
                <option value="1">活跃</option>
                <option value="0">非活跃</option>
              </select>
            </div>
            
            <div>
              <label for="sortBy" class="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
              <select
                id="sortBy"
                v-model="sortBy"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                @change="handleSearch"
              >
                <option value="createTime">注册时间</option>
                <option value="totalSpent">消费金额</option>
                <option value="lastLoginTime">最近登录</option>
              </select>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <button
              @click="handleSearch"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              刷新
            </button>
          </div>
        </div>
        
        <!-- 用户列表 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">用户列表</h3>
          </div>
          
          <div v-if="loadingUsers" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
          
          <div v-else>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户信息</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最近登录</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">算力</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消费金额</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="users.length === 0">
                    <td colspan="7" class="px-6 py-10 text-center text-sm text-gray-500">暂无用户数据</td>
                  </tr>
                  <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span class="text-gray-600 font-medium">{{ user.username?.charAt(0).toUpperCase() || 'U' }}</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ user.username || '未命名用户' }}</div>
                          <div class="text-sm text-gray-500">{{ user.email || '无邮箱' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(user.createTime) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(user.lastLoginTime) || '从未登录' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ user.power || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥ {{ user.totalSpent || 0 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="[
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        ]"
                      >
                        {{ user.status === 1 ? '活跃' : '非活跃' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        @click="openRechargeModal(user)"
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        充值
                      </button>
                      <button 
                        @click="viewUserDetail(user)"
                        class="text-gray-600 hover:text-gray-900"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 分页 -->
            <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="changePage(currentPage - 1)" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                <button 
                  @click="changePage(currentPage + 1)" 
                  :disabled="currentPage === totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示第 
                    <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
                    至
                    <span class="font-medium">{{ Math.min(currentPage * pageSize, total) }}</span>
                    条，共
                    <span class="font-medium">{{ total }}</span>
                    条结果
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      @click="changePage(currentPage - 1)"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">上一页</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    
                    <template v-for="page in displayedPages" :key="page">
                      <span
                        v-if="page === '...'"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                      >
                        ...
                      </span>
                      <button
                        v-else
                        @click="changePage(page)"
                        :class="[
                          'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                          currentPage === page
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        ]"
                      >
                        {{ page }}
                      </button>
                    </template>
                    
                    <button
                      @click="changePage(currentPage + 1)"
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">下一页</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 充值弹窗 -->
    <el-dialog
      v-model="rechargeModalVisible"
      title="为用户充值算力"
      width="400px"
      destroy-on-close
    >
      <div v-if="selectedUser" class="p-4">
        <div class="mb-6">
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-600 font-medium text-lg">{{ selectedUser.username?.charAt(0).toUpperCase() || 'U' }}</span>
            </div>
            <div class="ml-4">
              <div class="text-lg font-medium text-gray-900">{{ selectedUser.username || '未命名用户' }}</div>
              <div class="text-sm text-gray-500">{{ selectedUser.email || '无邮箱' }}</div>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">当前算力</span>
              <span class="font-semibold">{{ selectedUser.power || 0 }}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-500">您的可用算力</span>
              <span class="font-semibold">{{ currentUserPower }}</span>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="rechargeAmount" class="block text-sm font-medium text-gray-700 mb-1">充值数量</label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                id="rechargeAmount"
                v-model.number="rechargeAmount"
                min="1"
                :max="currentUserPower"
                class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                placeholder="请输入充值数量"
              >
            </div>
            <p class="mt-2 text-sm text-gray-500">
              最多可充值 {{ currentUserPower }} 算力
            </p>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button
            @click="rechargeModalVisible = false"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            取消
          </button>
          <button
            @click="handleRecharge"
            :disabled="!canRecharge"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="recharging" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ recharging ? '充值中...' : '确认充值' }}
          </button>
        </div>
      </div>
    </el-dialog>
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

const loading = ref(true)
const hasSubsite = ref(false)
const loadingUsers = ref(false)
const users = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('createTime')
const rechargeModalVisible = ref(false)
const selectedUser = ref(null)
const rechargeAmount = ref(1)
const recharging = ref(false)

// 当前用户的算力
const currentUserPower = computed(() => userStore.user?.power || 0)

// 是否可以充值
const canRecharge = computed(() => {
  return (
    selectedUser.value && 
    rechargeAmount.value > 0 && 
    rechargeAmount.value <= currentUserPower.value && 
    !recharging.value
  )
})

// 总页数
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

// 显示的页码
const displayedPages = computed(() => {
  const pages = []
  const maxPagesToShow = 7
  
  if (totalPages.value <= maxPagesToShow) {
    // 如果总页数小于等于最大显示页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 总是显示第一页
    pages.push(1)
    
    // 当前页附近的页码
    const leftSide = Math.max(2, currentPage.value - 1)
    const rightSide = Math.min(totalPages.value - 1, currentPage.value + 1)
    
    // 如果当前页靠近开始，不显示左侧省略号
    if (leftSide > 2) {
      pages.push('...')
    }
    
    // 添加当前页附近的页码
    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i)
    }
    
    // 如果当前页靠近结束，不显示右侧省略号
    if (rightSide < totalPages.value - 1) {
      pages.push('...')
    }
    
    // 总是显示最后一页
    pages.push(totalPages.value)
  }
  
  return pages
})

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// 检查是否有分站
const checkHasSubsite = async () => {
  loading.value = true
  try {
    const result = await subsiteStore.getSubsiteInfo()
    hasSubsite.value = !!result
  } catch (error) {
    console.error('获取分站信息失败:', error)
    hasSubsite.value = false
  } finally {
    loading.value = false
  }
}

// 获取用户列表
const fetchUsers = async () => {
  if (!hasSubsite.value) return
  
  loadingUsers.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      status: statusFilter.value,
      sortBy: sortBy.value
    }
    
    const result = await subsiteStore.getAllUsers(params)
    users.value = result.list
    total.value = result.total
  } catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('获取用户列表失败')
    users.value = []
    total.value = 0
  } finally {
    loadingUsers.value = false
  }
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchUsers()
}

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchUsers()
}

// 打开充值弹窗
const openRechargeModal = (user) => {
  selectedUser.value = user
  rechargeAmount.value = 1
  rechargeModalVisible.value = true
}

// 查看用户详情
const viewUserDetail = (user) => {
  // 这里可以实现查看用户详情的功能，比如跳转到用户详情页或者打开详情弹窗
  ElMessage.info('查看用户详情功能待实现')
}

// 充值
const handleRecharge = async () => {
  if (!canRecharge.value) return
  
  recharging.value = true
  try {
    await subsiteStore.rechargeUserPower(selectedUser.value.id, rechargeAmount.value)
    ElMessage.success('充值成功')
    rechargeModalVisible.value = false
    
    // 更新用户列表
    await fetchUsers()
    
    // 更新当前用户信息（算力会减少）
    await userStore.getUserInfo()
  } catch (error) {
    console.error('充值失败:', error)
    ElMessage.error(error.message || '充值失败')
  } finally {
    recharging.value = false
  }
}

onMounted(async () => {
  await checkHasSubsite()
  if (hasSubsite.value) {
    await fetchUsers()
  }
})
</script> 