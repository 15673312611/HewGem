<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 顶部区域 - 分站基本信息 -->
    <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative overflow-hidden">
      <!-- 装饰元素 -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 rounded-full bg-white animate-float-slow"></div>
        <div class="absolute top-20 right-20 w-16 h-16 rounded-full bg-white animate-float-medium"></div>
        <div class="absolute bottom-10 left-1/4 w-12 h-12 rounded-full bg-white animate-float-fast"></div>
        <div class="absolute right-1/3 top-1/2 w-8 h-8 rounded-full bg-white animate-float-medium"></div>
        <div class="absolute grid grid-cols-10 gap-10 opacity-30 transform rotate-12 -left-10 -top-40">
          <div v-for="i in 100" :key="i" class="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 class="text-3xl font-bold relative group">
              <span class="relative z-10">{{ subsiteInfo?.title || '我的分站' }}</span>
              <span class="absolute left-0 bottom-0 w-full h-2 bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            </h1>
            <div class="mt-3 p-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg hover:bg-opacity-25 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-glow">
              <div class="flex flex-col space-y-1">
                <div class="text-sm text-purple-100">您的分站地址:</div>
                <a 
                  :href="'https://' + subsiteInfo?.domain + '.' + getDomainSuffix()" 
                  target="_blank" 
                  class="text-white font-semibold hover:underline flex items-center group"
                >
                  <span class="text-lg">https://{{ subsiteInfo?.domain || '加载中...' }}.{{ getDomainSuffix() }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-6">
            <div class="flex flex-col items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-glow">
              <span class="text-xl font-bold">{{ userCount }}</span>
              <span class="text-sm text-purple-100">用户数量</span>
              <div class="absolute top-0 left-0 w-full h-full border border-white border-opacity-20 rounded-lg scale-105 opacity-0 hover:opacity-100 transition-all duration-500"></div>
            </div>
            <div class="flex flex-col items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-lg group relative transform transition-transform duration-300 hover:scale-105 hover:shadow-glow">
              <span class="text-xl font-bold flex items-center">
                <span>{{ totalPowerSent }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-yellow-300 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span class="text-sm text-purple-100">已分发算力</span>
              <div class="hidden group-hover:block absolute bottom-full left-0 w-48 p-2 bg-gray-800 text-xs text-white rounded shadow-lg mb-2 transform transition-transform duration-300 scale-95 group-hover:scale-100 z-20">
                统计所有向分站用户充值的算力总和
              </div>
              <div class="absolute top-0 left-0 w-full h-full border border-white border-opacity-20 rounded-lg scale-105 opacity-0 hover:opacity-100 transition-all duration-500"></div>
            </div>
            <div class="flex flex-col items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-glow">
              <span class="text-xl font-bold flex items-center">
                <span>{{ myPower }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span class="text-sm text-purple-100">我的算力</span>
              <div class="absolute top-0 left-0 w-full h-full border border-white border-opacity-20 rounded-lg scale-105 opacity-0 hover:opacity-100 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部装饰波浪 -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
        <svg class="relative block w-full h-8 sm:h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".15" class="shape-fill" fill="#FFFFFF" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".2" class="shape-fill" fill="#FFFFFF" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".3" class="shape-fill" fill="#FFFFFF" />
        </svg>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- 左侧 - 网站设置 -->
        <div class="lg:col-span-2">
          <!-- 站点设置卡片 -->
          <div class="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M12 8v2"></path><path d="M12 14v2"></path><path d="M8 12h2"></path><path d="M14 12h2"></path></svg></el-icon>
              站点设置
            </h2>
            <el-form ref="siteSettingsForm" :model="siteSettings" label-position="top">
              <el-form-item label="网站名称">
                <div class="flex items-center space-x-2">
                <el-input 
                  v-model="siteSettings.name" 
                  placeholder="请输入网站名称"
                  prefix-icon="Edit"
                  class="hover:border-indigo-500 transition-all duration-200"></el-input>
                  <el-button 
                    type="primary" 
                    @click="saveSettings"
                    :loading="savingSettings"
                    class="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap">
                    <el-icon class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></el-icon>
                    确认
                  </el-button>
                </div>
              </el-form-item>
              
              <el-form-item label="网站Logo">
                <el-upload
                  class="avatar-uploader hover:shadow-sm transition-all duration-300"
                  :show-file-list="false"
                  :http-request="handleLogoHttpRequest"
                  :before-upload="beforeLogoUpload">
                  <img v-if="siteSettings.logo" :src="siteSettings.logo" class="avatar" alt="网站Logo">
                  <div v-else class="avatar-uploader-icon flex flex-col items-center justify-center">
                    <el-icon class="text-gray-400"><Plus /></el-icon>
                    <span class="text-xs text-gray-400 mt-1">上传Logo</span>
                  </div>
                </el-upload>
                <div class="mt-1 text-sm text-gray-500 flex items-center">
                  <el-icon class="mr-1 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg></el-icon>
                  推荐尺寸: 200x60px
                </div>
              </el-form-item>
              
              <el-form-item label="网站公告">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <el-switch
                      v-model="siteSettings.enableAnnouncement"
                      active-text="启用公告"
                      inactive-text="关闭公告"
                      class="mr-4"
                      @change="saveAnnouncementStatus"
                    />
                    <span class="text-xs text-gray-500" v-if="siteSettings.enableAnnouncement">
                      公告已启用，访客将可以看到公告内容
                    </span>
                    <span class="text-xs text-gray-500" v-else>
                      公告已关闭，访客将不会看到公告内容
                    </span>
                </div>
                </div>
                <div class="announcement-preview border border-gray-200 rounded-md p-4 min-h-[120px] bg-gray-50 relative hover:shadow-sm transition-all duration-200" 
                     :class="{'opacity-50': !siteSettings.enableAnnouncement}"
                     v-html="siteSettings.announcement || '<div class=\'text-gray-400 italic\'>暂无公告内容</div>'"></div>
              </el-form-item>
              
              <el-button 
                type="primary" 
                @click="showAnnouncementEditor" 
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                <el-icon class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></el-icon>
                编辑公告
              </el-button>
            </el-form>
          </div>
          
          <!-- 管理员信息卡片 -->
          <div class="bg-white shadow-sm rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></el-icon>
              管理员信息
            </h2>
            <div class="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 flex items-center">
                  <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></el-icon>
                  用户名
                </span>
                <span class="text-gray-900 font-medium">{{ userInfo?.username }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 flex items-center">
                  <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></el-icon>
                  注册时间
                </span>
                <span class="text-gray-900 font-medium">{{ formatDate(userInfo?.registerTime) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 flex items-center">
                  <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></el-icon>
                  电子邮箱
                </span>
                <span class="text-gray-900 font-medium">{{ userInfo?.email }}</span>
              </div>
              <div class="flex items-center justify-between bg-indigo-50 p-3 rounded-lg mt-4">
                <span class="text-gray-600 flex items-center">
                  <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></el-icon>
                  剩余算力
                </span>
                <span class="text-indigo-600 font-semibold text-lg bg-white px-3 py-1 rounded-md shadow-sm">{{ userInfo?.power || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧 - 用户列表和充值 -->
        <div class="lg:col-span-3">
          <!-- 用户管理卡片 -->
          <div class="bg-white shadow-sm rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800 flex items-center">
                <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></el-icon>
                用户管理
              </h2>
              <div class="flex space-x-2">
                <el-input 
                  v-model="userSearchQuery" 
                  placeholder="搜索用户" 
                  prefix-icon="Search"
                  clearable
                  @input="handleUserSearch"
                  class="w-48 hover:border-indigo-500 transition-all duration-200"></el-input>
                <el-button 
                  type="primary" 
                  @click="refreshUserList"
                  class="bg-indigo-600 border-0 hover:bg-indigo-700 transition-all duration-200">
                  <el-icon class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></el-icon>
                  刷新
                </el-button>
              </div>
            </div>
            
            <!-- 用户列表表格 -->
            <el-table
              :data="filteredUsers"
              style="width: 100%"
              v-loading="loadingUsers"
              border
              stripe
              row-class-name="hover:bg-indigo-50 transition-colors duration-200"
              header-row-class-name="bg-gray-50 text-gray-700">
              <el-table-column label="ID" prop="id" width="80" />
              <el-table-column label="用户名" prop="username">
                <template #default="scope">
                  <div class="flex items-center">
                    <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></el-icon>
                    <span>{{ scope.row.username }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="注册时间">
                <template #default="scope">
                  <div class="flex items-center">
                    <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></el-icon>
                    <span>{{ formatDate(scope.row.registerTime) }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="算力" prop="power">
                <template #default="scope">
                  <div class="flex items-center">
                    <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></el-icon>
                    <span class="font-medium text-indigo-600">{{ scope.row.power }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220">
                <template #default="scope">
                  <div class="flex space-x-2">
                    <el-button 
                      size="small" 
                      type="primary" 
                      @click="showRechargeDialog(scope.row)"
                      :disabled="!userInfo.power || userInfo.power <= 0"
                      class="recharge-btn relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 border-0 hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-md hover:shadow-lg">
                      <div class="flex items-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        充值
                      </div>
                      <div class="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                      <div class="fancy-shine"></div>
                    </el-button>
                    
                    <el-button 
                      size="small" 
                      type="info" 
                      @click="showUserDetail(scope.row)"
                      class="detail-btn relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 border-0 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-md hover:shadow-lg">
                      <div class="flex items-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        明细
                      </div>
                      <div class="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                      <div class="fancy-shine"></div>
                      <div class="absolute top-0 right-0 w-2 h-2 rounded-full bg-yellow-300 notification-dot"></div>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            
            <!-- 分页器 -->
            <div class="mt-4 flex justify-center">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalUsers"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                class="pagination-wrapper"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 用户明细表格 -->
      <div class="mt-6 bg-white shadow-sm rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></el-icon>
            用户明细
          </h2>
          <el-button 
            type="primary" 
            @click="refreshRechargeRecords"
            class="bg-indigo-600 border-0 hover:bg-indigo-700 transition-all duration-200">
            <el-icon class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></el-icon>
            刷新
          </el-button>
        </div>
        <el-table
          :data="rechargeRecords"
          style="width: 100%"
          v-loading="loadingRechargeRecords"
          border
          stripe
          row-class-name="hover:bg-indigo-50 transition-colors duration-200"
          header-row-class-name="bg-gray-50 text-gray-700">
          <el-table-column label="用户名" prop="username">
            <template #default="scope">
              <div class="flex items-center">
                <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></el-icon>
                <span>{{ scope.row.username }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="120">
            <template #default="scope">
              <el-tag :type="scope.row.amount >= 0 ? 'success' : 'danger'" class="rounded-full px-3 py-1">
                {{ scope.row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="amount">
            <template #default="scope">
              <div class="flex items-center">
                <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></el-icon>
                <span class="font-medium" :class="scope.row.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ scope.row.amount }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="日期">
            <template #default="scope">
              <div class="flex items-center">
                <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></el-icon>
                {{ formatDate(scope.row.createTime) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" show-overflow-tooltip>
            <template #default="scope">
              <div class="flex items-center" v-if="scope.row.remark">
                <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></el-icon>
                {{ scope.row.remark }}
              </div>
              <span v-else class="text-gray-400">-</span>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页器 -->
        <div class="mt-4 flex justify-center">
          <el-pagination
            v-model:current-page="currentRechargeRecordsPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRechargeRecords"
            @size-change="handleRechargeSizeChange"
            @current-change="handleRechargeCurrentChange"
            background
            class="pagination-wrapper"
          />
        </div>
      </div>
    </div>
    
    <!-- 充值弹窗 -->
    <el-dialog
      v-model="rechargeDialogVisible"
      title="充值算力"
      width="400px"
      class="recharge-dialog">
      <div v-if="selectedUser" class="p-2">
        <div class="mb-4 bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
          <p class="text-gray-700 mb-2 flex items-center">
            <el-icon class="mr-2 text-green-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></el-icon>
            为用户 <span class="font-semibold mx-1">{{ selectedUser.username }}</span> 充值算力
          </p>
          <p class="text-gray-500 text-sm flex items-center">
            <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></el-icon>
            您当前可用算力: <span class="font-semibold text-indigo-600 ml-1">{{ userInfo?.power || 0 }}</span>
          </p>
        </div>
        <el-form :model="rechargeForm" label-position="top">
          <el-form-item label="充值算力">
            <el-input-number 
              v-model="rechargeForm.amount" 
              :min="1" 
              :max="userInfo?.power || 0"
              controls-position="right"
              :precision="0"
              class="w-full"></el-input-number>
          </el-form-item>
          <el-form-item label="备注">
            <el-input 
              v-model="rechargeForm.remark"
              type="textarea"
              placeholder="请输入充值备注（可选）"
              rows="3"
              class="hover:border-indigo-500 transition-all duration-200"></el-input>
          </el-form-item>
        </el-form>
        <div class="mt-4 bg-orange-50 p-3 rounded-lg flex items-start">
          <el-icon class="mr-2 text-orange-500 mt-0.5 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></el-icon>
          <p class="text-orange-700 text-sm">
            充值后将从您的账户扣除相应算力，且不可撤销，请确认。
          </p>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer flex justify-end space-x-2">
          <el-button 
            @click="rechargeDialogVisible = false"
            class="border-gray-300 hover:bg-gray-50 transition-colors duration-200">取消</el-button>
          <el-button 
            type="primary" 
            @click="confirmRecharge" 
            :disabled="!rechargeForm.amount || rechargeForm.amount <= 0 || rechargeForm.amount > userInfo?.power"
            :loading="submittingRecharge"
            class="bg-gradient-to-r from-green-500 to-teal-500 border-0 hover:from-green-600 hover:to-teal-600 transition-all duration-300">
            <el-icon class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></el-icon>
            确认充值
          </el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 用户明细弹窗 -->
    <el-dialog
      v-model="userDetailDialogVisible"
      title="用户明细"
      width="70%"
      class="user-detail-dialog">
      <div v-if="selectedUser">
        <div class="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <p class="text-gray-500 text-sm flex items-center mb-1">
                <el-icon class="mr-1 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></el-icon>
                用户名
              </p>
              <p class="font-semibold text-gray-900">{{ selectedUser.username }}</p>
            </div>
            <div class="flex flex-col">
              <p class="text-gray-500 text-sm flex items-center mb-1">
                <el-icon class="mr-1 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></el-icon>
                注册时间
              </p>
              <p class="font-semibold text-gray-900">{{ formatDate(selectedUser.registerTime) }}</p>
            </div>
            <div class="flex flex-col">
              <p class="text-gray-500 text-sm flex items-center mb-1">
                <el-icon class="mr-1 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></el-icon>
                当前算力
              </p>
              <p class="font-semibold text-indigo-600 bg-white px-3 py-1 rounded-md shadow-sm inline-block">{{ selectedUser.power }}</p>
            </div>
          </div>
        </div>
        
        <el-tabs type="border-card" class="user-detail-tabs">
          <el-tab-pane label="算力记录">
            <el-table
              :data="userPowerRecords"
              v-loading="loadingUserDetail"
              row-class-name="hover:bg-indigo-50 transition-colors duration-200"
              header-row-class-name="bg-gray-50 text-gray-700"
              style="width: 100%">
              <el-table-column label="类型" width="120">
                <template #default="scope">
                  <el-tag :type="scope.row.amount >= 0 ? 'success' : 'danger'" class="rounded-full px-3 py-1">
                    {{ scope.row.type }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="amount">
                <template #default="scope">
                  <div class="flex items-center">
                    <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></el-icon>
                    <span class="font-medium" :class="scope.row.amount >= 0 ? 'text-green-600' : 'text-red-600'">
                      {{ scope.row.amount }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="日期">
                <template #default="scope">
                  <div class="flex items-center">
                    <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></el-icon>
                    {{ formatDate(scope.row.createTime) }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark" show-overflow-tooltip>
                <template #default="scope">
                  <div class="flex items-center" v-if="scope.row.remark">
                    <el-icon class="mr-2 text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></el-icon>
                    {{ scope.row.remark }}
                  </div>
                  <span v-else class="text-gray-400">-</span>
                </template>
              </el-table-column>
            </el-table>
            
            <!-- 分页器 -->
            <div class="mt-4 flex justify-center">
              <el-pagination
                v-model:current-page="userDetailCurrentPage"
                v-model:page-size="userDetailPageSize"
                :page-sizes="[10, 20, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalUserDetail"
                @size-change="handleUserDetailSizeChange"
                @current-change="handleUserDetailCurrentChange"
                background
                class="pagination-wrapper"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    
    <!-- 富文本编辑器弹窗 -->
    <el-dialog
      v-model="announcementDialogVisible"
      title="编辑网站公告"
      width="70%"
      class="announcement-dialog">
      <div class="p-2">
        <div class="mb-4">
          <el-alert
            type="info"
            :closable="false">
            <div class="flex items-center">
              <el-icon class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></el-icon>
              <span>使用富文本编辑器编辑公告内容，支持文字格式化、插入图片等功能</span>
            </div>
          </el-alert>
          
          <div class="text-xs text-gray-500 mt-2 pl-2">
            <p>提示：为确保最佳显示效果，请避免过宽的内容和超大图片，建议图片宽度不超过700像素</p>
            <p>可点击"预览效果"按钮查看实际公告显示效果</p>
        </div>
        
          <div class="flex items-center justify-end mt-3 mb-2">
            <el-button size="small" @click="togglePreview" type="primary" plain>
              {{ isPreview ? '返回编辑' : '预览效果' }}
              </el-button>
          </div>
        </div>
        
        <div v-if="!isPreview" class="rich-text-editor border border-gray-200 rounded-md min-h-[300px] mb-4">
          <Toolbar
            style="border-bottom: 1px solid #e5e7eb"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 600px; overflow-y: hidden;"
            v-model="editorHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
            @onChange="handleEditorChange"
          />
        </div>
        
        <div v-else class="preview-container mb-4">
          <div class="preview-dialog">
            <div class="preview-header">
              <div class="preview-title">网站公告</div>
                  </div>
            <div class="preview-body">
              <div class="announcement-content" v-html="sanitizedPreviewContent"></div>
                </div>
            <div class="preview-footer">
              <div class="text-sm text-gray-400 text-center">— 以上为公告实际显示效果 —</div>
              </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer flex justify-end space-x-2">
          <el-button 
            @click="announcementDialogVisible = false"
            class="border-gray-300 hover:bg-gray-50 transition-colors duration-200">取消</el-button>
          <el-button 
            type="primary" 
            @click="saveAnnouncement" 
            :loading="savingAnnouncement"
            class="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
            <el-icon class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></el-icon>
            保存公告
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, inject, nextTick, shallowRef, onBeforeUnmount } from 'vue'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import { Plus, Search, WarningFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import DOMPurify from 'dompurify'

// 用户信息
const userStore = useUserStore()
const userInfo = inject('userInfo')
const myPower = computed(() => userInfo.value?.power || 0)

// 分站信息
const subsiteInfo = ref(null)
const userCount = ref(0)
const totalPowerSent = ref(0)
const savingSettings = ref(false)

// 站点设置表单
const siteSettings = reactive({
  name: '',
  logo: '',
  announcement: '',
  enableAnnouncement: true, // 默认启用公告
})

// 富文本编辑器相关
const announcementDialogVisible = ref(false)
const editorHtml = ref('')
const savingAnnouncement = ref(false)
const isPreview = ref(false)

// 预览相关
const sanitizedPreviewContent = computed(() => {
  return DOMPurify.sanitize(editorHtml.value)
})

// 切换预览模式
const togglePreview = () => {
  if (!isPreview.value && editorRef.value) {
    editorHtml.value = editorRef.value.getHtml()
  }
  isPreview.value = !isPreview.value
}

// 执行编辑器命令
const execCommand = (command, value = null) => {
  document.execCommand('styleWithCSS', false, true)
  if (value) {
    document.execCommand(command, false, value)
  } else {
    document.execCommand(command, false, null)
  }
  // 不再需要 editorContent 引用，因为我们现在使用 wangEditor
}

// 设置文字颜色
const setFontColor = (color) => {
  execCommand('foreColor', color)
}

// 插入图片
const insertImage = async () => {
  try {
    const url = await ElMessageBox.prompt('请输入图片URL地址', '插入图片', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPlaceholder: 'https://example.com/image.jpg'
    }).then(({ value }) => value)
    
    if (url && url.trim()) {
      execCommand('insertImage', url.trim())
    }
  } catch (e) {
    // 用户取消操作
  }
}

// 上传图片
const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await axios.post('/api/subsite/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0 && response.data.data) {
      return response.data.data.url
    } else {
      throw new Error(response.data.message || '上传图片失败')
    }
  } catch (error) {
    console.error('上传图片出错:', error)
    ElMessage.error('上传图片失败')
    return null
  }
}

// 插入链接
const insertLink = async () => {
  try {
    const { value: url } = await ElMessageBox.prompt('请输入链接URL地址', '插入链接', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPlaceholder: 'https://example.com'
    })
    
    if (url && url.trim()) {
      const { value: text } = await ElMessageBox.prompt('请输入链接显示文本', '插入链接', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '链接文本',
        inputValue: url
      })
      
      const linkText = text && text.trim() ? text.trim() : url.trim()
      document.execCommand('createLink', false, url.trim())
      
      // 为新创建的链接添加target="_blank"属性
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const linkNode = range.startContainer.parentNode
        if (linkNode.tagName === 'A') {
          linkNode.setAttribute('target', '_blank')
        }
      }
    }
  } catch (e) {
    // 用户取消操作
  }
}

// 编辑器内容变化
const onEditorInput = (e) => {
  editorHtml.value = e.target.innerHTML
}

// 编辑器内容变化处理函数
const handleEditorChange = (editor) => {
  editorHtml.value = editor.getHtml()
}

// 显示富文本编辑器
const showAnnouncementEditor = () => {
  editorHtml.value = siteSettings.announcement || ''
  announcementDialogVisible.value = true
  isPreview.value = false
  
  // 确保编辑器实例加载完成后设置内容
  nextTick(() => {
    if (editorRef.value) {
      editorRef.value.setHtml(editorHtml.value)
    }
  })
}

// 保存公告内容
const saveAnnouncement = async () => {
  savingAnnouncement.value = true
  try {
    if (announcementDialogVisible.value) {
      // 确保获取最新的编辑器内容
      if (editorRef.value) {
        editorHtml.value = editorRef.value.getHtml()
      }
      siteSettings.announcement = editorHtml.value
    announcementDialogVisible.value = false
    }
    
    // 先保存公告内容和启用状态，避免被 saveSettings 中的 fetchSubsiteInfo 覆盖
    const response = await axios.post('/api/subsite/update-announcement', {
      announcement: siteSettings.announcement,
      enableAnnouncement: siteSettings.enableAnnouncement
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0) {
      ElMessage.success('公告设置已更新')
      
      // 保存其他设置但不更新公告内容
      await saveSettingsWithoutFetch()
    } else {
      ElMessage.error(response.data.message || '保存公告设置失败')
    }
  } catch (error) {
    console.error('保存公告内容出错:', error)
    ElMessage.error('保存公告内容出错')
  } finally {
    savingAnnouncement.value = false
  }
}

// 保存站点设置但不重新获取数据
const saveSettingsWithoutFetch = async () => {
  savingSettings.value = true
  try {
    const response = await axios.post('/api/subsite/update-settings', {
      name: siteSettings.name,
      logo: siteSettings.logo,
      enableAnnouncement: siteSettings.enableAnnouncement
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code !== 0) {
      ElMessage.error(response.data.message || '保存站点设置失败')
    }
  } catch (error) {
    console.error('保存站点设置出错:', error)
    ElMessage.error('保存站点设置出错')
  } finally {
    savingSettings.value = false
  }
}

// 用户列表相关
const users = ref([])
const filteredUsers = ref([])
const userSearchQuery = ref('')
const loadingUsers = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalUsers = ref(0)

// 充值记录相关
const rechargeRecords = ref([])
const loadingRechargeRecords = ref(false)
const currentRechargeRecordsPage = ref(1)
const rechargePageSize = ref(10)
const totalRechargeRecords = ref(0)

// 充值弹窗相关
const rechargeDialogVisible = ref(false)
const selectedUser = ref(null)
const rechargeForm = reactive({
  amount: 0,
  remark: ''
})
const submittingRecharge = ref(false)

// 用户明细弹窗相关
const userDetailDialogVisible = ref(false)
const userPowerRecords = ref([])
const loadingUserDetail = ref(false)
const userDetailCurrentPage = ref(1)
const userDetailPageSize = ref(10)
const totalUserDetail = ref(0)

// 自定义Logo上传请求
const handleLogoHttpRequest = async ({ file }) => {
  try {
    ElMessage.info('正在上传Logo，请稍候...');
    const { uploadFileToOss } = await import('@/utils/oss');
    const url = await uploadFileToOss(file, 'subsite/logos'); 

    // 手动调用成功处理函数
    handleLogoSuccess({ code: 0, data: { url } });

  } catch (error) {
    console.error('Logo上传失败:', error);
    ElMessage.error('Logo上传失败，请重试');
  }
}

// 上传设置
const uploadHeaders = computed(() => ({
  Authorization: `Bearer ${userStore.token}`
}))

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 工具栏配置
const toolbarConfig = {
  excludeKeys: [
    'uploadVideo',
    'insertTable',
    'codeBlock',
    'todo'
  ]
}

// 编辑器配置
const editorConfig = {
  placeholder: '请输入公告内容...',
  maxLength: 5000,
  autoFocus: false,
  scroll: true,
  MENU_CONF: {
    uploadImage: {
      // 自定义上传图片
      customUpload: async (file, insertFn) => {
        try {
          // 限制图片大小
          if (file.size > 2 * 1024 * 1024) {
            ElMessage.warning('图片大小不能超过2MB，请压缩后再上传');
            return;
          }
          
          ElMessage.info('正在上传图片，请稍候...');
          // 引入OSS上传工具
          const { uploadFileToOss } = await import('@/utils/oss');
          // 上传图片到OSS
          const url = await uploadFileToOss(file, 'subsite/announcements');
          // 插入图片
          insertFn(url);
          ElMessage.success('图片上传成功');
        } catch (error) {
          console.error('图片上传失败:', error);
          ElMessage.error('图片上传失败，请重试');
        }
      }
    },
    // 配置标题样式
    fontSize: {
      fontSizeList: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px']
    },
    lineHeight: {
      lineHeightList: ['1', '1.5', '1.75', '2', '2.5', '3']
    },
    fontFamily: {
      fontFamilyList: [
        { name: '宋体', value: '宋体, SimSun, Songti SC' },
        { name: '微软雅黑', value: '微软雅黑, Microsoft YaHei' },
        { name: '黑体', value: '黑体, SimHei, Heiti SC' },
        { name: '楷体', value: '楷体, KaiTi, Kaiti SC' },
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
        { name: 'Verdana', value: 'Verdana, sans-serif' }
      ]
    },
    color: {
      colors: [
        '#000000', '#333333', '#666666', '#999999', 
        '#1c487f', '#4395ff', '#157eeb', '#0e88eb',
        '#19be6b', '#5cb87a', '#41b883', '#67c23a',
        '#e6a23c', '#f56c6c', '#fa8c16', '#ff4d4f',
        '#f5222d', '#fa541c', '#fa8c16', '#faad14',
        '#fadb14', '#a0d911', '#52c41a', '#13c2c2'
      ]
    },
    // 配置标题
    headings: {
      showHeadings: true
    }
  }
}

// 编辑器模式
const mode = ref('default')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 编辑器回调函数
const handleCreated = (editor) => {
  editorRef.value = editor
}

onMounted(async () => {
  await fetchSubsiteInfo()
  await fetchUserList()
  await fetchRechargeRecords()
})

// 获取域名后缀
const getDomainSuffix = () => {
  const hostname = window.location.hostname
  // 如果当前域名包含点号，说明是子域名，提取主域名
  if (hostname.includes('.')) {
    const parts = hostname.split('.')
    // 取最后两部分作为域名后缀（例如：cutb.cn）
    if (parts.length >= 2) {
      return parts.slice(-2).join('.')
    }
  }
  // 如果没有子域名或者无法解析，返回默认值
  return 'cutb.cn'
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return '-'
  if (typeof date === 'string') {
    date = new Date(date)
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 获取分站信息
const fetchSubsiteInfo = async () => {
  try {
    const response = await axios.get('/api/subsite/info', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0 && response.data.data) {
      subsiteInfo.value = response.data.data
      
      // 设置表单值
      siteSettings.name = subsiteInfo.value.title
      siteSettings.logo = subsiteInfo.value.logo
      siteSettings.announcement = subsiteInfo.value.announcement
      // 设置公告启用状态，确保正确读取后端返回的值
      siteSettings.enableAnnouncement = subsiteInfo.value.enableAnnouncement !== undefined ? 
                                        subsiteInfo.value.enableAnnouncement : true
      
      // 获取用户统计
      await fetchSubsiteStats()
    } else {
      ElMessage.error('获取分站信息失败')
    }
  } catch (error) {
    console.error('获取分站信息出错:', error)
    ElMessage.error('获取分站信息出错')
  }
}

// 获取分站统计数据
const fetchSubsiteStats = async () => {
  try {
    const response = await axios.get('/api/subsite/stats', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data && response.data.code === 0 && response.data.data) {
      userCount.value = response.data.data.totalUsers || 0
      // 后端API可能返回totalPower或totalPowerSent，兼容两种情况
      totalPowerSent.value = response.data.data.totalPowerSent || response.data.data.totalPower || 0
      
      // 如果需要，可以在这里添加其他统计数据的处理
      console.log('分站统计数据:', response.data.data)
    }
  } catch (error) {
    console.error('获取分站统计出错:', error)
    // 设置默认值，避免页面显示错误
    userCount.value = 0
    totalPowerSent.value = 0
  }
}

// 获取用户列表
const fetchUserList = async () => {
  loadingUsers.value = true
  try {
    const response = await axios.get('/api/subsite/users', {
      params: {
        page: currentPage.value,
        size: pageSize.value,
        keyword: userSearchQuery.value
      },
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0 && response.data.data) {
      // 处理不同的数据格式
      if (Array.isArray(response.data.data.content)) {
        // 如果返回的是content字段
        users.value = response.data.data.content || []
        filteredUsers.value = users.value
        totalUsers.value = response.data.data.totalElements || response.data.data.content.length || 0
        
        // 记录当前页码和页大小
        currentPage.value = response.data.data.page || currentPage.value
        pageSize.value = response.data.data.size || pageSize.value
      } else if (Array.isArray(response.data.data.list)) {
        // 如果返回的是list字段
      users.value = response.data.data.list || []
      filteredUsers.value = users.value
      totalUsers.value = response.data.data.total || 0
      
      // 记录当前页码和页大小
      currentPage.value = response.data.data.page || currentPage.value
      pageSize.value = response.data.data.size || pageSize.value
      } else if (Array.isArray(response.data.data)) {
        // 如果直接返回数组
        users.value = response.data.data || []
        filteredUsers.value = users.value
        totalUsers.value = users.value.length || 0
      } else {
        // 如果是其他格式，设置为空数组
        users.value = []
        filteredUsers.value = []
        totalUsers.value = 0
      }
      
      console.log('用户列表数据:', response.data.data)
    } else {
      ElMessage.error('获取用户列表失败')
    }
  } catch (error) {
    console.error('获取用户列表出错:', error)
    ElMessage.error('获取用户列表出错')
  } finally {
    loadingUsers.value = false
  }
}

// 获取充值记录
const fetchRechargeRecords = async () => {
  loadingRechargeRecords.value = true
  try {
    const response = await axios.get('/api/subsite/recharge-records', {
      params: {
        page: currentRechargeRecordsPage.value,
        size: pageSize.value
      },
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data && response.data.code === 0) {
      // 处理不同的数据格式
      if (response.data.data?.content) {
        // 如果返回的是content字段
        rechargeRecords.value = response.data.data.content || []
        // 如果totalElements为0但content有内容，则使用content的长度
        totalRechargeRecords.value = response.data.data.totalElements || response.data.data.content.length || 0
      } else if (response.data.data?.list) {
        // 如果返回的是list字段
        rechargeRecords.value = response.data.data.list || []
        totalRechargeRecords.value = response.data.data.total || 0
      } else {
        // 如果是其他格式，尝试直接使用
        rechargeRecords.value = []
        totalRechargeRecords.value = 0
      }
      
      // 记录当前页码和页大小
      currentRechargeRecordsPage.value = response.data.data?.page || currentRechargeRecordsPage.value
      rechargePageSize.value = response.data.data?.size || rechargePageSize.value
      
      console.log('充值记录数据:', response.data.data)
    } else {
      // 如果API返回错误，设置空数据
      rechargeRecords.value = []
      totalRechargeRecords.value = 0
    }
  } catch (error) {
    console.error('获取充值记录出错:', error)
    // 发生错误时设置空数据
    rechargeRecords.value = []
    totalRechargeRecords.value = 0
    // 只在第一次加载时显示错误消息，避免重复显示
    if (currentRechargeRecordsPage.value === 1 && pageSize.value === 10) {
      ElMessage.warning('获取充值记录失败，可能暂无记录或数据加载出错')
    }
  } finally {
    loadingRechargeRecords.value = false
  }
}

// 保存站点设置
const saveSettings = async () => {
  savingSettings.value = true
  try {
    const response = await axios.post('/api/subsite/update-settings', {
      name: siteSettings.name,
      logo: siteSettings.logo,
      enableAnnouncement: siteSettings.enableAnnouncement
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0) {
      ElMessage.success('站点设置保存成功')
      await fetchSubsiteInfo()
    } else {
      ElMessage.error(response.data.message || '保存站点设置失败')
    }
  } catch (error) {
    console.error('保存站点设置出错:', error)
    ElMessage.error('保存站点设置出错')
  } finally {
    savingSettings.value = false
  }
}

// Logo上传前的验证
const beforeLogoUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isSVG = file.type === 'image/svg+xml'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG && !isSVG) {
    ElMessage.error('Logo只能是JPG/PNG/SVG格式!')
    return false
  }
  
  if (!isLt2M) {
    ElMessage.error('Logo大小不能超过2MB!')
    return false
  }
  
  return true
}

// Logo上传成功回调
const handleLogoSuccess = (response) => {
  if (response.code === 0 && response.data) {
    siteSettings.logo = response.data.url
    ElMessage.success('Logo上传成功')
    // 上传成功后立即保存设置
    saveSettings()
  } else {
    ElMessage.error(response.message || 'Logo上传失败')
  }
}

// 用户搜索处理
const handleUserSearch = () => {
  refreshUserList()
}

// 刷新用户列表
const refreshUserList = () => {
  currentPage.value = 1
  fetchUserList()
}

// 刷新充值记录
const refreshRechargeRecords = () => {
  currentRechargeRecordsPage.value = 1
  fetchRechargeRecords()
}

// 分页处理 - 用户列表
const handleSizeChange = (size) => {
  pageSize.value = size
  fetchUserList()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchUserList()
}

// 分页处理 - 充值记录
const handleRechargeSizeChange = (size) => {
  rechargePageSize.value = size
  fetchRechargeRecords()
}

const handleRechargeCurrentChange = (page) => {
  currentRechargeRecordsPage.value = page
  fetchRechargeRecords()
}

// 分页处理 - 用户明细
const handleUserDetailSizeChange = (size) => {
  userDetailPageSize.value = size
  fetchUserPowerRecords()
}

const handleUserDetailCurrentChange = (page) => {
  userDetailCurrentPage.value = page
  fetchUserPowerRecords()
}

// 显示充值弹窗
const showRechargeDialog = (user) => {
  selectedUser.value = user
  rechargeForm.amount = 0
  rechargeForm.remark = ''
  rechargeDialogVisible.value = true
}

// 确认充值
const confirmRecharge = async () => {
  if (!rechargeForm.amount || rechargeForm.amount <= 0) {
    ElMessage.error('请输入有效的充值金额')
    return
  }
  
  if (rechargeForm.amount > userInfo.value?.power) {
    ElMessage.error('充值金额不能超过您的可用算力')
    return
  }
  
  submittingRecharge.value = true
  try {
    const response = await axios.post('/api/subsite/recharge', {
      userId: selectedUser.value.id,
      amount: rechargeForm.amount,
      remark: rechargeForm.remark
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0) {
      ElMessage.success('充值成功')
      rechargeDialogVisible.value = false
      
      // 更新用户列表和充值记录
      fetchUserList()
      fetchRechargeRecords()
      
      // 更新我的算力 - 直接从当前算力中减去充值金额
      if (userInfo.value && userInfo.value.power !== undefined) {
        userInfo.value.power -= rechargeForm.amount
        // 触发用户信息更新事件
        window.dispatchEvent(new CustomEvent('user-info-updated'))
      }
    } else {
      ElMessage.error(response.data.message || '充值失败')
    }
  } catch (error) {
    console.error('充值出错:', error)
    ElMessage.error(error.response?.data?.message || '充值出错')
  } finally {
    submittingRecharge.value = false
  }
}

// 显示用户明细
const showUserDetail = async (user) => {
  selectedUser.value = user
  userDetailDialogVisible.value = true
  userDetailCurrentPage.value = 1
  
  await fetchUserPowerRecords()
}

// 获取用户算力记录
const fetchUserPowerRecords = async () => {
  if (!selectedUser.value) return
  
  loadingUserDetail.value = true
  try {
    const response = await axios.get(`/api/subsite/user/${selectedUser.value.id}/power-records`, {
      params: {
        page: userDetailCurrentPage.value,
        size: userDetailPageSize.value
      },
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0 && response.data.data) {
      // 处理后端返回的不同数据格式
      if (Array.isArray(response.data.data.content)) {
        // 如果返回的是content字段
        userPowerRecords.value = response.data.data.content || []
        totalUserDetail.value = response.data.data.totalElements || response.data.data.content.length || 0
        
        // 记录当前页码和页大小
        userDetailCurrentPage.value = response.data.data.page || userDetailCurrentPage.value
        userDetailPageSize.value = response.data.data.size || userDetailPageSize.value
      } else if (Array.isArray(response.data.data.list)) {
        // 如果返回的是list字段
      userPowerRecords.value = response.data.data.list || []
      totalUserDetail.value = response.data.data.total || 0
      
      // 记录当前页码和页大小
      userDetailCurrentPage.value = response.data.data.page || userDetailCurrentPage.value
      userDetailPageSize.value = response.data.data.size || userDetailPageSize.value
      } else if (Array.isArray(response.data.data)) {
        // 如果直接返回数组
        userPowerRecords.value = response.data.data || []
        totalUserDetail.value = userPowerRecords.value.length || 0
      } else {
        // 如果是其他格式，设置为空数组
        userPowerRecords.value = []
        totalUserDetail.value = 0
      }
      
      console.log('用户算力记录:', response.data.data)
    } else {
      ElMessage.error('获取用户算力记录失败')
    }
  } catch (error) {
    console.error('获取用户算力记录出错:', error)
    ElMessage.error('获取用户算力记录出错')
  } finally {
    loadingUserDetail.value = false
  }
}

// 获取充值记录分页
const changePage = (page) => {
  currentRechargeRecordsPage.value = page
  fetchRechargeRecords()
}

// 保存公告状态
const saveAnnouncementStatus = () => {
  saveSettings()
}

// 获取站点设置
const fetchSiteSettings = async () => {
  try {
    const response = await axios.get('/api/subsite/settings', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    
    if (response.data.code === 0) {
      const data = response.data.data
      siteSettings.name = data.name || ''
      siteSettings.logo = data.logo || ''
      siteSettings.announcement = data.announcement || ''
      siteSettings.enableAnnouncement = data.enableAnnouncement !== false // 默认为true
    }
  } catch (error) {
    console.error('获取站点设置出错:', error)
    ElMessage.error('获取站点设置出错')
  }
}
</script>

<style scoped>
.avatar-uploader {
  width: 178px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}

.avatar {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 分页器样式 */
.pagination-wrapper :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #6366f1;
}

.pagination-wrapper :deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #6366f1;
}

/* 对话框样式 */
.recharge-dialog :deep(.el-dialog__header) {
  background: linear-gradient(to right, #22c55e, #14b8a6);
  padding: 15px 20px;
  margin-right: 0;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0 0;
}

.recharge-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.recharge-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.recharge-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #e5e7eb;
  padding: 15px 20px;
}

/* 富文本编辑器对话框样式 */
.announcement-dialog :deep(.el-dialog__header) {
  background: linear-gradient(to right, #4f46e5, #8b5cf6);
  padding: 15px 20px;
  margin-right: 0;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0 0;
}

.announcement-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.announcement-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.announcement-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #e5e7eb;
  padding: 15px 20px;
}

/* 富文本编辑器样式 */
.rich-text-editor {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
}

.editor-toolbar {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.editor-content {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  padding: 1rem;
  background-color: white;
  outline: none;
}

.editor-content:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

.editor-content img {
  max-width: 100%;
  height: auto;
}

.editor-content a {
  color: #6366f1;
  text-decoration: underline;
}

.editor-content h1 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.5em 0;
}

.editor-content h2 {
  font-size: 1.25em;
  font-weight: 600;
  margin: 0.5em 0;
}

.editor-content h3 {
  font-size: 1.125em;
  font-weight: 600;
  margin: 0.5em 0;
}

.editor-content p {
  margin-bottom: 0.5em;
}

.editor-content ul, 
.editor-content ol {
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

.editor-content li {
  margin-bottom: 0.25em;
}

.editor-content hr {
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 1em 0;
}

/* 公告预览样式 */
.announcement-preview {
  overflow-y: auto;
  max-height: 200px;
}

.announcement-preview :deep(h1),
.announcement-preview :deep(h2),
.announcement-preview :deep(h3) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.announcement-preview :deep(h1) {
  font-size: 1.5em;
}

.announcement-preview :deep(h2) {
  font-size: 1.25em;
}

.announcement-preview :deep(h3) {
  font-size: 1.125em;
}

.announcement-preview :deep(p) {
  margin-bottom: 0.5em;
}

.announcement-preview :deep(ul),
.announcement-preview :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

.announcement-preview :deep(li) {
  margin-bottom: 0.25em;
}

.announcement-preview :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 0.5em 0;
}

.announcement-preview :deep(a) {
  color: #6366f1;
  text-decoration: underline;
}

.announcement-preview :deep(blockquote) {
  border-left: 3px solid #e5e7eb;
  padding-left: 1em;
  color: #6b7280;
  margin: 0.5em 0;
}

.user-detail-dialog :deep(.el-dialog__header) {
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  padding: 15px 20px;
  margin-right: 0;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0 0;
}

.user-detail-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.user-detail-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.user-detail-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #e5e7eb;
  padding: 15px 20px;
}

.user-detail-tabs :deep(.el-tabs__header) {
  background-color: #f9fafb;
}

.user-detail-tabs :deep(.el-tabs__item.is-active) {
  color: #6366f1;
}

.user-detail-tabs :deep(.el-tabs__active-bar) {
  background-color: #6366f1;
}

/* 表格悬停动画 */
.el-table tr {
  transition: all 0.3s ease;
}

/* 输入框动画 */
.el-input__inner,
.el-textarea__inner {
  transition: all 0.3s ease;
}

/* 按钮动画 */
.el-button {
  transition: all 0.3s ease;
}

/* 奇特的光效按钮 */
.fancy-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

/* 按钮通知点动画 */
.notification-dot {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
}

/* 装饰元素的浮动动画 */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-medium {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-fast {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* 特殊阴影效果 */
.shadow-glow {
  box-shadow: 0 0 15px rgba(149, 128, 255, 0.4);
}

/* 3D触感按钮 */
.recharge-btn, .detail-btn {
  transform-style: preserve-3d;
  perspective: 800px;
}

.recharge-btn:active, .detail-btn:active {
  transform: translateY(2px) rotate(1deg) scale(0.98);
}

/* 玻璃态效果 */
.backdrop-filter {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.w-e-text-container {
  height: 600px !important;
}

/* 预览容器样式 */
.preview-container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.preview-dialog {
  width: 900px;
  max-width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.preview-header {
  background: linear-gradient(to right, #4f46e5, #8b5cf6);
  padding: 15px 20px;
  border-bottom: 1px solid #e5e7eb;
  color: white;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
}

.preview-body {
  padding: 20px;
}

.preview-footer {
  border-top: 1px solid #f0f0f0;
  padding: 10px;
}

.preview-container .announcement-content {
  max-height: 600px;
  overflow-y: auto;
  line-height: 1.6;
  background-color: white;
  padding: 20px;
}

/* 复制公告组件的样式以确保一致性 */
.announcement-content :deep(h1),
.announcement-content :deep(h2),
.announcement-content :deep(h3) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.announcement-content :deep(h1) {
  font-size: 1.5em;
}

.announcement-content :deep(h2) {
  font-size: 1.25em;
}

.announcement-content :deep(h3) {
  font-size: 1.125em;
}

.announcement-content :deep(p) {
  margin-bottom: 0.5em;
}

.announcement-content :deep(ul),
.announcement-content :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

.announcement-content :deep(li) {
  margin-bottom: 0.25em;
}

.announcement-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 0.5em 0;
}

.announcement-content :deep(a) {
  color: #6366f1;
  text-decoration: underline;
}

.announcement-content :deep(blockquote) {
  border-left: 3px solid #e5e7eb;
  padding-left: 1em;
  color: #6b7280;
  margin: 0.5em 0;
}

.announcement-content :deep(pre) {
  background-color: #f3f4f6;
  padding: 0.75em 1em;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin: 0.5em 0;
}

.announcement-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: monospace;
}

.announcement-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.5em 0;
}

.announcement-content :deep(table th),
.announcement-content :deep(table td) {
  border: 1px solid #d1d5db;
  padding: 0.5em;
}

.announcement-content :deep(table th) {
  background-color: #f9fafb;
}

.announcement-content :deep(hr) {
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 1em 0;
}

.announcement-content :deep(mark) {
  background-color: #fef3c7;
  padding: 0.1em 0.2em;
}
</style> 
