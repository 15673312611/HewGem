<template>
  <nav class="bg-white/90 dark:bg-dark-card/95 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] backdrop-filter backdrop-blur-md sticky top-0 z-20 transition-all duration-300">
    <div class="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <!-- 导航链接 -->
        <div class="flex items-center space-x-6">
          <!-- 导航链接已移至侧边栏 -->
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <!-- 主题切换按钮 -->
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg v-if="themeStore.isDarkMode" class="w-5 h-5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <!-- 算力显示 -->
        <div v-if="isLoggedIn" class="flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-600 dark:text-blue-200 border border-blue-200 dark:border-blue-700 shadow-sm">
          <span class="text-blue-500 dark:text-blue-300 mr-2">⚡</span>
          <span class="font-medium">{{ userInfo.power || 0 }}</span>
        </div>
        
        <!-- 分站按钮 - 根据用户是否已有分站来显示不同按钮，同时受系统配置控制 -->
        <router-link v-if="isLoggedIn && !hasSubsite && enableSubsiteFeature"
                     to="/subsite-create"
                     @click="handleSubsiteCreate"
                     class="px-5 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:shadow-md hover:from-purple-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          开通分站
        </router-link>
        <router-link v-if="isLoggedIn && hasSubsite && enableSubsiteFeature" to="/subsite-admin" class="px-5 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:shadow-md hover:from-purple-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          分站管理
        </router-link>
        
        <!-- 未登录状态 -->
        <button v-if="!isLoggedIn" 
                @click="showLoginModal()"
                class="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-md hover:from-blue-600 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          登录
        </button>
        
        <button v-if="!isLoggedIn" 
                @click="showRegisterModalWithCaptcha()"
                class="ml-2 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-md hover:from-green-600 hover:to-emerald-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          注册
        </button>
        
        <!-- 已登录状态 -->
        <div v-else class="relative flex items-center">
          <button @click="showUserMenu = !showUserMenu" 
                  class="user-menu-button flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white shadow-sm overflow-hidden">
              <UserIcon class="w-5 h-5" />
            </div>
            <span class="text-gray-700 dark:text-gray-200 font-medium">{{ userInfo.username }}</span>
            <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- 用户菜单 -->
          <div v-if="showUserMenu" 
               class="user-menu absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-card rounded-xl shadow-xl py-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div class="font-semibold text-gray-900 dark:text-gray-200">{{ userInfo.username }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ userInfo.email }}</div>
            </div>
            <router-link to="/user-center" class="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
              <svg class="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              个人中心
            </router-link>
            <button @click="handleLogout" 
                    class="flex items-center w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-300 transition-colors">
              <svg class="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- 登录弹窗 -->
  <div v-if="loginModalVisible" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="hideLoginModal"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] rounded-2xl p-8 shadow-2xl transition-colors duration-300"
         :class="[
           themeStore.isDarkMode 
             ? 'bg-dark-card text-dark-text border border-gray-700' 
             : 'bg-white text-gray-900'
         ]">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold transition-colors duration-300"
            :class="[
              themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
            ]">
          {{ isRegister ? '创建新账号' : (subsiteInfo?.name || '轻剪数字人') }}
        </h2>
        <button @click="hideLoginModal" 
                class="transition-colors duration-300"
                :class="[
                  themeStore.isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-400 hover:text-gray-500'
                ]">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      
      <p class="text-base mb-8 transition-colors duration-300"
         :class="[
           themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-500'
         ]">
        {{ !isRegister ? '智能数字人，为您服务' : '加入数字人平台' }}
      </p>

      <!-- 错误提示条 -->
      <div v-if="globalError" 
           class="mb-6 p-4 border rounded-lg flex items-start transition-colors duration-300"
           :class="[
             themeStore.isDarkMode 
               ? 'bg-red-900/20 border-red-700' 
               : 'bg-red-50 border-red-200'
           ]">
        <ExclamationCircleIcon class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div class="ml-3">
          <p class="text-sm transition-colors duration-300"
             :class="[
               themeStore.isDarkMode ? 'text-red-300' : 'text-red-700'
             ]">{{ globalError }}</p>
        </div>
        <button @click="globalError = ''" 
                class="ml-auto -mx-1.5 -my-1.5 p-1.5 text-red-500 hover:text-red-700 rounded-lg focus:ring-2 focus:ring-red-400">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 账号 -->
        <div class="space-y-2">
          <div class="relative">
            <input type="text" 
                   v-model="form.username" 
                   placeholder="请输入账号"
                   @blur="validateUsername"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <UserIcon class="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                     :class="[
                       themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-400'
                     ]" />
          </div>
          <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</p>
        </div>
        
        <!-- 邮箱 (仅注册时显示) -->
        <div v-if="isRegister" class="space-y-2">
          <div class="relative">
            <input type="email" 
                   v-model="form.email" 
                   placeholder="邮箱"
                   @blur="validateEmail"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <EnvelopeIcon class="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                         :class="[
                           themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-400'
                         ]" />
          </div>
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <!-- 密码 -->
        <div class="space-y-2">
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'"
                   v-model="form.password" 
                   placeholder="密码"
                   @blur="validatePassword"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 pr-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <LockClosedIcon class="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                           :class="[
                             themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-400'
                           ]" />
            <button type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                    ]">
              <EyeIcon v-if="showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>

        <!-- 确认密码 (仅注册时显示) -->
        <div v-if="isRegister" class="space-y-2">
          <div class="relative">
            <input :type="showConfirmPassword ? 'text' : 'password'"
                   v-model="form.confirmPassword" 
                   placeholder="确认密码"
                   @blur="validateConfirmPassword"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 pr-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <LockClosedIcon class="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                           :class="[
                             themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-400'
                           ]" />
            <button type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                    ]">
              <EyeIcon v-if="showConfirmPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
        </div>
                <!-- 验证码 (仅注册时显示) -->
                <div v-if="isRegister" class="space-y-2">
          <div class="flex space-x-2">
            <div class="relative flex-1">
              <input type="text" 
                     v-model="form.captcha" 
                     placeholder="请输入验证码"
                     @blur="validateCaptcha"
                     :class="[
                       'w-full px-4 py-3.5 rounded-lg pl-11 border transition-colors duration-300',
                       themeStore.isDarkMode 
                         ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                         : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                       errors.captcha ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                     ]" />
              <ShieldCheckIcon class="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                              :class="[
                                themeStore.isDarkMode ? 'text-gray-400' : 'text-gray-400'
                              ]" />
            </div>
            <img :src="captchaImage" 
                 @click="refreshCaptcha" 
                 class="h-[52px] rounded-lg cursor-pointer" 
                 alt="验证码" />
          </div>
          <p v-if="errors.captcha" class="text-red-500 text-sm">{{ errors.captcha }}</p>
        </div>

        <!-- 用户协议 -->
        <div class="flex items-center">
          <input type="checkbox" 
                 v-model="agreedToTerms" 
                 id="agreement" 
                 @change="validateAgreement"
                 class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-300" />
          <label for="agreement" class="ml-2 text-sm transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-500'
                 ]">
            我已阅读并同意
            <button type="button" 
                    @click="showAgreement = true"
                    class="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300">
              《用户协议》
            </button>
          </label>
        </div>
        <p v-if="errors.agreement" class="text-red-500 text-sm mt-1">{{ errors.agreement }}</p>

        <!-- 提交按钮 -->
        <button type="submit" 
                :disabled="!isFormValid || isLoading"
                class="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            处理中...
          </span>
          <span v-else>{{ isRegister ? '注册账号' : '登录' }}</span>
        </button>

        <!-- 切换登录/注册 -->
        <div class="text-center">
          <button type="button" 
                  @click="toggleRegister" 
                  class="text-sm transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'
                  ]">
            {{ isRegister ? '已有账号？立即登录' : '注册新账号' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 用户协议弹窗 - 移到最外层 -->
  <div v-if="showAgreement" class="fixed inset-0 z-[100]">
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="showAgreement = false"></div>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl rounded-2xl shadow-xl transition-colors duration-300"
         :class="[
           themeStore.isDarkMode 
             ? 'bg-dark-card text-dark-text border border-gray-700' 
             : 'bg-white text-gray-900'
         ]">
      <div class="px-6 pt-6 pb-4 sm:p-8 transition-colors duration-300"
           :class="[
             themeStore.isDarkMode ? 'bg-dark-card' : 'bg-white'
           ]">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-3xl font-bold mb-8 text-center transition-colors duration-300"
                :class="[
                  themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                ]">用户协议</h3>
            <div class="mt-2 max-h-[70vh] overflow-y-auto px-6">
              <h4 class="text-2xl font-semibold mb-6 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">数字人系统用户协议</h4>
              <p class="text-lg mb-4 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">版本号：1.0</p>
              <p class="text-lg mb-8 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">生效日期：2025年2月27日</p>
              
              <p class="text-lg mb-8 leading-relaxed transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">欢迎使用我们的数字人系统（以下简称"本平台"）。请您在使用本平台前，仔细阅读并理解本用户协议（以下简称"本协议"）。您一旦注册、登录并使用本平台，即表示您已同意遵守本协议的各项条款。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">一、定义</h5>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户：指通过注册成为本平台会员并使用本平台服务的个人或实体。</p>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">数字形象：指用户在本平台上创建、上传、展示的虚拟形象、图像、音频等内容。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">音色定制：指用户在本平台上定制或使用的个性化声音特征。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">二、用户资格</h5>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户须具备完全民事权利能力和行为能力，具有签订和履行本协议的资格。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">未满18周岁的未成年人需在法定监护人的陪同下使用本平台。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">三、用户内容的提交与授权</h5>
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">合法授权：</p>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户在本平台提交的所有数字形象、文案、音色定制等内容，必须拥有合法的知识产权或已获得合法授权。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户保证其提交的内容不侵犯任何第三方的知识产权、肖像权、隐私权及其他合法权利。</p>
              
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">授权范围：</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户同意授予本平台在全球范围内、免费、不可撤销、永久性的使用权，包括但不限于复制、展示、修改、分发、传播和衍生作品的制作权。</p>
              
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">禁止行为：</p>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">禁止用户上传、提交任何未经授权的第三方版权作品。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">禁止上传、提交含有违法、侵权、诽谤、淫秽、暴力等不良内容的数字形象或文案。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">四、平台权利与义务</h5>
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">内容审核：</p>
              <p class="text-lg mb-6 leading-relaxed transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本平台会在自身能力范围内对用户提交的大量数据进行分析、检测，包括但不限于内容的合法性、合规性和版权归属。本平台将尽力履行内容审核义务，但由于审核机制可能依赖于算法等技术手段，平台不能保证100%的准确性。用户有义务确保其提交的内容符合相关法律法规，并承担由此产生的法律责任。</p>
              
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">违规处理：</p>
              <ul class="list-disc pl-8 mb-6 text-lg">
                <li class="mb-2 transition-colors duration-300"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    ]">删除相关内容；</li>
                <li class="mb-2 transition-colors duration-300"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    ]">暂停或终止用户的账号；</li>
                <li class="mb-2 transition-colors duration-300"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    ]">向相关执法部门报告；</li>
                <li class="mb-2 transition-colors duration-300"
                    :class="[
                      themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    ]">追究用户的法律责任。</li>
              </ul>
              
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">免责条款：</p>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本平台对用户提交内容的真实性、合法性不作保证。用户因使用本平台服务而导致的任何损失，本平台不承担任何责任。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">对于因第三方权利主张而导致的纠纷，本平台不承担任何责任，用户应自行承担相应的法律责任。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">五、知识产权</h5>
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">平台权利：</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本平台拥有平台运营过程中产生的所有内容的知识产权，包括但不限于软件、界面设计、商标等。</p>
              
              <p class="text-lg font-medium mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                 ]">用户权利：</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户对其合法上传的内容保留所有权利，但同意按照本协议授予本平台使用权。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">六、隐私保护</h5>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本平台承诺保护用户的隐私，严格按照《中华人民共和国个人信息保护法》等相关法律法规处理用户的个人信息。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户同意本平台按照隐私政策收集、使用、存储和披露其个人信息。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">七、协议的修改与终止</h5>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本平台有权随时修改本协议条款，修改后的协议将在平台上公布，并自公布之日起生效。</p>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">用户在协议修改后继续使用本平台服务，视为接受修改后的协议。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本平台有权在任何时候终止或暂停对用户的服务，且无需事先通知。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">八、法律适用与争议解决</h5>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本协议的签订、履行及解释均适用中华人民共和国法律。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">因本协议引起的或与本协议有关的任何争议，双方应友好协商解决；协商不成的，任何一方均可向平台开发者所在地——永济市人民法院提起诉讼。</p>
              
              <h5 class="text-xl font-semibold mb-4 transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
                  ]">九、其他条款</h5>
              <p class="text-lg mb-3 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">本协议构成用户与本平台之间关于使用本平台服务的完整协议，取代任何先前的口头或书面协议。</p>
              <p class="text-lg mb-6 transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                 ]">如果本协议的任何条款被认定为无效或不可执行，其余条款仍然有效。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse transition-colors duration-300"
           :class="[
             themeStore.isDarkMode ? 'bg-dark-card2' : 'bg-gray-50'
           ]">
        <button type="button"
                @click="showAgreement = false"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-lg transition-colors duration-300">
          关闭
        </button>
      </div>
    </div>
  </div>

  <!-- 注册弹窗 -->
  <div v-if="registerModalVisible" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="hideRegisterModal"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] rounded-2xl p-8 transition-colors duration-300"
         :class="[
           themeStore.isDarkMode 
             ? 'bg-dark-card text-dark-text border border-gray-700' 
             : 'bg-white text-gray-900'
         ]">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold transition-colors duration-300"
            :class="[
              themeStore.isDarkMode ? 'text-dark-text' : 'text-gray-900'
            ]">创建新账号</h2>
        <button @click="hideRegisterModal" 
                class="transition-colors duration-300"
                :class="[
                  themeStore.isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-400 hover:text-gray-500'
                ]">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      
      <p class="text-base mb-8 transition-colors duration-300"
         :class="[
           themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-500'
         ]">加入数字人平台</p>

      <!-- 错误提示条 -->
      <div v-if="globalError" 
           class="mb-6 p-4 border rounded-lg flex items-start transition-colors duration-300"
           :class="[
             themeStore.isDarkMode 
               ? 'bg-red-900/20 border-red-700' 
               : 'bg-red-50 border-red-200'
           ]">
        <ExclamationCircleIcon class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div class="ml-3">
          <p class="text-sm transition-colors duration-300"
             :class="[
               themeStore.isDarkMode ? 'text-red-300' : 'text-red-700'
             ]">{{ globalError }}</p>
        </div>
        <button @click="globalError = ''" 
                class="ml-auto -mx-1.5 -my-1.5 p-1.5 text-red-500 hover:text-red-700 rounded-lg focus:ring-2 focus:ring-red-400">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- 账号 -->
        <div class="space-y-2">
          <div class="relative">
            <input type="text" 
                   v-model="form.username" 
                   placeholder="请输入账号"
                   @blur="validateUsername"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <UserIcon class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          </div>
          <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</p>
        </div>
        
        <!-- 邮箱 -->
        <div class="space-y-2">
          <div class="relative">
            <input type="email" 
                   v-model="form.email" 
                   placeholder="邮箱"
                   @blur="validateEmail"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <EnvelopeIcon class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          </div>
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <!-- 密码 -->
        <div class="space-y-2">
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'"
                   v-model="form.password" 
                   placeholder="密码"
                   @blur="validatePassword"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 pr-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                   ]" />
            <LockClosedIcon class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <button type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <EyeIcon v-if="showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
        </div>

        <!-- 确认密码 -->
        <div class="space-y-2">
          <div class="relative">
            <input :type="showConfirmPassword ? 'text' : 'password'"
                   v-model="form.confirmPassword" 
                   placeholder="确认密码"
                   @blur="validateConfirmPassword"
                   :class="[
                     'w-full px-4 py-3.5 rounded-lg pl-11 pr-11 border transition-colors duration-300',
                     themeStore.isDarkMode 
                       ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                       : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                     errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                   ]" />
            <LockClosedIcon class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <button type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <EyeIcon v-if="showConfirmPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
        </div>

        <!-- 验证码 -->
        <div class="space-y-2">
          <div class="flex space-x-2">
            <div class="relative flex-1">
              <input type="text" 
                     v-model="form.captcha" 
                     placeholder="请输入验证码"
                     @blur="validateCaptcha"
                     :class="[
                       'w-full px-4 py-3.5 rounded-lg pl-11 border transition-colors duration-300',
                       themeStore.isDarkMode 
                         ? 'bg-dark-card3 text-dark-text border-gray-600 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400' 
                         : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500',
                       errors.captcha ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                     ]" />
              <ShieldCheckIcon class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            </div>
            <img :src="captchaImage" 
                 @click="refreshCaptcha" 
                 class="h-[52px] rounded-lg cursor-pointer" 
                 alt="验证码" />
          </div>
          <p v-if="errors.captcha" class="text-red-500 text-sm">{{ errors.captcha }}</p>
        </div>

        <!-- 用户协议 -->
        <div class="flex items-center">
          <input type="checkbox" 
                 v-model="agreedToTerms" 
                 id="agreement" 
                 @change="validateAgreement"
                 class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-300" />
          <label for="agreement" class="ml-2 text-sm transition-colors duration-300"
                 :class="[
                   themeStore.isDarkMode ? 'text-gray-300' : 'text-gray-500'
                 ]">
            我已阅读并同意
            <button type="button" 
                    @click="showAgreement = true"
                    class="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300">
              《用户协议》
            </button>
          </label>
        </div>
        <p v-if="errors.agreement" class="text-red-500 text-sm mt-1">{{ errors.agreement }}</p>

        <!-- 提交按钮 -->
        <button type="submit" 
                :disabled="!isFormValid || isLoading"
                class="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            处理中...
          </span>
          <span v-else>{{ isRegister ? '注册账号' : '登录' }}</span>
        </button>

        <!-- 切换到登录 -->
        <div class="text-center">
          <button type="button" 
                  @click="hideRegisterModal(); showLoginModal()" 
                  class="text-sm transition-colors duration-300"
                  :class="[
                    themeStore.isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'
                  ]">
            已有账号？立即登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useLoginModal } from '@/composables/useLoginModal'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { 
  UserIcon, 
  XMarkIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
import request from '@/utils/request'
import { RouterLink } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRegisterModal } from '@/composables/useRegisterModal'
import { useSiteStore } from '@/stores/site'

const userStore = useUserStore()
const { loginModalVisible, showLoginModal, hideLoginModal } = useLoginModal()
const { registerModalVisible, showRegisterModal, hideRegisterModal } = useRegisterModal()
const showUserMenu = ref(false)
const isRegister = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const globalError = ref('')
const userInfo = inject('userInfo')
const router = useRouter()
const showAgreement = ref(false)
const agreedToTerms = ref(false)
const hasSubsite = ref(false)
const enableSubsiteFeature = ref(true) // 默认启用分站功能
const siteStore = useSiteStore()
const subsiteInfo = computed(() => siteStore.siteInfo)
const themeStore = useThemeStore()

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false,
  captcha: ''
})

const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: '',
  captcha: ''
})

const captchaImage = ref('')
const captchaId = ref('')
const captcha = ref('')
const captchaError = ref('')

const refreshCaptcha = async () => {
  try {
    const response = await fetch('/api/captcha/generate')
    const data = await response.json()
    captchaImage.value = `data:image/jpeg;base64,${data.image}`
    captchaId.value = data.captchaId
    captchaError.value = ''
  } catch (error) {
    console.error('获取验证码失败:', error)
    captchaError.value = '获取验证码失败'
  }
}

const validateUsername = () => {
  if (!form.value.username) {
    errors.value.username = '请输入账号'
  } else if (form.value.username.length < 5) {
    errors.value.username = '账号至少需要5个字符'
  } else if (/[\u4e00-\u9fa5]/.test(form.value.username)) {
    // 检查是否包含汉字
    errors.value.username = '账号不能包含汉字'
  } else if (!/^[a-zA-Z0-9_\-\.]+$/.test(form.value.username)) {
    // 只允许英文字母、数字、下划线、连字符和点
    errors.value.username = '账号只能包含英文字母、数字、下划线、连字符和点'
  } else {
    errors.value.username = ''
  }
}

const validateEmail = () => {
  if (isRegister.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.value.email) {
      errors.value.email = '请输入邮箱'
    } else if (!emailRegex.test(form.value.email)) {
      errors.value.email = '请输入有效的邮箱地址'
    } else {
      errors.value.email = ''
    }
  }
}

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = '请输入密码'
  } else if (form.value.password.length < 6) {
    errors.value.password = '密码至少需要6个字符'
  } else {
    errors.value.password = ''
  }
}

const validateConfirmPassword = () => {
  if (isRegister.value) {
    if (!form.value.confirmPassword) {
      errors.value.confirmPassword = '请确认密码'
    } else if (form.value.confirmPassword !== form.value.password) {
      errors.value.confirmPassword = '两次输入的密码不一致'
    } else {
      errors.value.confirmPassword = ''
    }
  }
}

const validateAgreement = () => {
  // 无论是登录还是注册，都需要验证用户协议
  if (!agreedToTerms.value) {
    errors.value.agreement = '请同意用户协议'
  } else {
    errors.value.agreement = ''
  }
}

const validateCaptcha = () => {
  if (!form.value.captcha) {
    errors.value.captcha = '请输入验证码'
  } else if (!/^\d{4}$/.test(form.value.captcha)) {
    errors.value.captcha = '验证码必须是4位数字'
  } else {
    errors.value.captcha = ''
  }
}

watch(() => form.value.username, validateUsername)
watch(() => form.value.email, validateEmail)
watch(() => form.value.password, validatePassword)
watch(() => form.value.confirmPassword, validateConfirmPassword)
watch(() => form.value.agreement, validateAgreement)
watch(() => form.value.captcha, validateCaptcha)

const isLoggedIn = computed(() => userStore.isLoggedIn)

const isFormValid = computed(() => {
  if (isRegister.value) {
    return form.value.username && 
           form.value.password && 
           form.value.email && 
           form.value.captcha &&
           agreedToTerms.value &&
           Object.values(errors.value).every(error => !error);
  } else {
    return form.value.username && 
           form.value.password &&
           agreedToTerms.value &&  // 添加用户协议检查
           Object.values(errors.value).every(error => !error);
  }
});

const toggleRegister = () => {
  isRegister.value = !isRegister.value
  form.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
    captcha: ''
  }
  errors.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: '',
    captcha: ''
  }
  globalError.value = ''
  agreedToTerms.value = false
  
  // 如果切换到注册模式，立即加载验证码
  if (isRegister.value) {
    refreshCaptcha()
  }
}

const handleSubmit = async () => {
  try {
    // 检查是否同意用户协议
    if (!agreedToTerms.value) {
      ElMessage.error('请先阅读并同意用户协议');
      return;
    }
    
    if (isRegister.value) {
      // 注册逻辑
      // 检查是否同意用户协议
      if (!agreedToTerms.value) {
        ElMessage.error('请先阅读并同意用户协议');
        return;
      }

      // 验证表单
      if (!form.value.username || !form.value.password || !form.value.email || !form.value.captcha) {
        ElMessage.error('请填写所有必填项');
        return;
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.value.email)) {
        ElMessage.error('请输入有效的邮箱地址');
        return;
      }

      // 验证密码长度
      if (form.value.password.length < 6) {
        ElMessage.error('密码长度不能少于6位');
        return;
      }

      isLoading.value = true;

      // 发送注册请求
      const response = await axios.post('/api/auth/register', {
        username: form.value.username,
        password: form.value.password,
        email: form.value.email,
        captcha: form.value.captcha,
        captchaId: captchaId.value,
        inviteCode: router.currentRoute.value.query.inviteCode
      });

      if (response.data) {
        ElMessage.success('注册成功');
        // 保存token和用户信息
        userStore.setToken(response.data.token);
        userStore.setUser(response.data.user);
        // 保存userId到localStorage，确保任务列表可以正确获取
        if (response.data.user && response.data.user.id) {
          console.log('保存userId到localStorage:', response.data.user.id);
          localStorage.setItem('userId', response.data.user.id.toString());
        }
        
        // 确保分站信息也被正确存储
        if (response.data.subsite) {
          userStore.setSiteInfo({subsite: response.data.subsite});
        }
        
        // 不再需要手动更新 userInfo，它会自动跟随 userStore.user 的变化
        // userInfo.value = response.data.user;
        
        // 关闭注册弹窗
        hideLoginModal();
        // 重置表单
        form.value = {
          username: '',
          password: '',
          email: '',
          captcha: ''
        };
        captchaId.value = '';
        agreedToTerms.value = false;
        // 刷新验证码
        refreshCaptcha();
        // 触发登录成功事件
        window.dispatchEvent(new CustomEvent('login-success'));
      }
    } else {
      // 登录逻辑
      if (!form.value.username || !form.value.password) {
        ElMessage.error('请输入用户名和密码');
        return;
      }

      isLoading.value = true;
      console.log('开始登录请求...');

      const response = await axios.post('/api/auth/login', {
        username: form.value.username,
        password: form.value.password
      });

      if (response.data) {
        // 登录成功，先重置状态，避免后续操作异常影响登录状态
        isLoading.value = false;
        
        ElMessage.success('登录成功');
        console.log('登录成功，准备设置用户信息', response.data);
        
        // 保存token和用户信息
        userStore.setToken(response.data.token);
        userStore.setUser(response.data.user);
        
        // 保存userId到localStorage，确保任务列表可以正确获取
        if (response.data.user && response.data.user.id) {
          console.log('保存userId到localStorage:', response.data.user.id);
          localStorage.setItem('userId', response.data.user.id.toString());
        }
        
        // 确保分站信息也被正确存储
        if (response.data.subsite) {
          console.log('登录响应中包含分站信息', response.data.subsite);
          userStore.setSiteInfo({subsite: response.data.subsite});
        } else if (response.data.mainSiteName || response.data.mainSiteLogo) {
          console.log('登录响应中包含主站信息');
          userStore.setSiteInfo({
            mainSiteName: response.data.mainSiteName,
            mainSiteLogo: response.data.mainSiteLogo,
            mainSiteAnnouncement: response.data.mainSiteAnnouncement,
            enableMainSiteAnnouncement: response.data.enableMainSiteAnnouncement
          });
        }
        
        // 关闭登录弹窗
        hideLoginModal();
        // 重置表单
        form.value = {
          username: '',
          password: '',
          email: '',
          captcha: ''
        };
        
        // 触发登录成功事件
        console.log('触发登录成功事件');
        window.dispatchEvent(new CustomEvent('login-success'));
        
        // 检查当前是否在分站域名下，单独处理以避免影响主流程
        try {
          const hostname = window.location.hostname;
          const path = window.location.pathname;
          
          // 检查是否是分站域名格式（subdomain.cutb.cn）或者分站路径格式（/subsite/xxx）
          if (hostname.includes('.cutb.cn') || path.includes('/subsite/')) {
            console.log('检测到分站环境，尝试获取平台信息');
            // 获取平台信息
            const subsiteResponse = await axios.get('/api/subsite/public-info');
            if (subsiteResponse.data.code === 0 && subsiteResponse.data.data) {
              const subsiteInfo = subsiteResponse.data.data;
              console.log('获取到平台信息', subsiteInfo);
              // 更新store中的分站信息，确保公告能够正确显示
              userStore.setSiteInfo({subsite: subsiteInfo});
            }
          }
        } catch (subsiteError) {
          console.error('获取平台信息失败，但不影响登录状态:', subsiteError);
          // 这里不再显示错误消息，因为登录已经成功
        }
      }
    }
  } catch (error) {
    isLoading.value = false;
    console.error('登录/注册过程中发生错误:', error);
    
    if (error.response) {
      console.error('服务器返回错误:', error.response.status, error.response.data);
      ElMessage.error(error.response.data || (isRegister.value ? '注册失败' : '登录失败'));
    } else {
      console.error('请求错误详情:', error.message || '未知错误');
      ElMessage.error(isRegister.value ? '注册失败，请稍后重试' : '登录失败，请稍后重试');
    }
    // 如果是注册失败，刷新验证码
    if (isRegister.value) {
      refreshCaptcha();
    }
  } finally {
    // 确保loading状态被重置
    isLoading.value = false;
  }
};

const handleLogout = () => {
  userStore.logout()
  localStorage.removeItem('userId')
  showUserMenu.value = false
  userInfo.value = null
  // 跳转到首页并刷新
  router.push('/').then(() => {
    window.location.reload()
  })
}

watch(loginModalVisible, (newValue) => {
  if (!newValue) {
    globalError.value = ''
    errors.value = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreement: '',
      captcha: ''
    }
  }
})

// 监听登录状态变化
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    // 登录成功后关闭弹窗
    hideLoginModal();
  }
})

// 添加点击外部区域关闭菜单的处理函数
const handleClickOutside = (event) => {
  const menu = document.querySelector('.user-menu')
  const button = document.querySelector('.user-menu-button')
  if (menu && button && !menu.contains(event.target) && !button.contains(event.target)) {
    showUserMenu.value = false
  }
}

// 监听路由变化
watch(() => router.currentRoute.value, () => {
  showUserMenu.value = false
})

// 组件挂载时添加事件监听
onMounted(() => {
  if (isRegister.value) {
    refreshCaptcha()
  }
  
  // 点击其他地方关闭用户菜单
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('user-info-updated', async () => {
    if (userStore.isLoggedIn) {
      await checkUserSubsite()
    }
  })
})

// 添加注册处理方法
const handleRegister = async () => {
  try {
    // 检查是否同意用户协议
    if (!agreedToTerms.value) {
      ElMessage.error('请先阅读并同意用户协议');
      return;
    }

    // 验证表单
    if (!form.value.username || !form.value.password || !form.value.email || !form.value.captcha) {
      ElMessage.error('请填写所有必填项');
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.value.email)) {
      ElMessage.error('请输入有效的邮箱地址');
      return;
    }

    // 验证密码长度
    if (form.value.password.length < 6) {
      ElMessage.error('密码长度不能少于6位');
      return;
    }

    isLoading.value = true;

    // 发送注册请求
    const response = await axios.post('/api/auth/register', {
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
      captcha: form.value.captcha,
      captchaId: captchaId.value,
      inviteCode: router.currentRoute.value.query.inviteCode
    });

    if (response.data) {
      ElMessage.success('注册成功');
      // 保存token和用户信息
      userStore.setToken(response.data.token);
      userStore.setUser(response.data.user);
      // 保存userId到localStorage，确保任务列表可以正确获取
      if (response.data.user && response.data.user.id) {
        console.log('保存userId到localStorage:', response.data.user.id);
        localStorage.setItem('userId', response.data.user.id.toString());
      }
      
      // 确保分站信息也被正确存储
      if (response.data.subsite) {
        userStore.setSiteInfo({subsite: response.data.subsite});
      }
      
      // 不再需要手动更新 userInfo，它会自动跟随 userStore.user 的变化
      // userInfo.value = response.data.user;
      
      // 关闭注册弹窗
      hideRegisterModal();
      // 重置表单
      form.value = {
        username: '',
        password: '',
        email: '',
        captcha: ''
      };
      captchaId.value = '';
      agreedToTerms.value = false;
      // 刷新验证码
      refreshCaptcha();
    }
  } catch (error) {
    if (error.response) {
      ElMessage.error(error.response.data || '注册失败');
    } else {
      ElMessage.error('注册失败，请稍后重试');
    }
    refreshCaptcha();
  } finally {
    isLoading.value = false;
  }
};

// 获取系统配置
const fetchSystemConfig = async () => {
  try {
    const response = await axios.get('/api/system-config/public-info')
    if (response.data && response.data.code === 0) {
      enableSubsiteFeature.value = response.data.data.enableSubsiteFeature !== false
    }
  } catch (error) {
    console.error('获取系统配置失败:', error)
    // 如果获取失败，默认启用分站功能
    enableSubsiteFeature.value = true
  }
}

// 检查用户是否已有分站
const checkUserSubsite = async () => {
  if (!userStore.isLoggedIn) return

  try {
    const response = await fetch('/api/subsite/info', {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    const data = await response.json()

    if (response.ok && data.code === 0 && data.data) {
      hasSubsite.value = true
    } else {
      hasSubsite.value = false
    }
  } catch (error) {
    console.error('检查分站信息失败:', error)
    hasSubsite.value = false
  }
}

// 监听登录状态变化，更新分站状态
watch(() => userStore.isLoggedIn, async (newValue) => {
  if (newValue) {
    await checkUserSubsite()
  } else {
    hasSubsite.value = false
  }
})

// 组件挂载时检查分站状态
onMounted(async () => {
  // 获取系统配置
  await fetchSystemConfig()

  // 获取平台公开信息
  await siteStore.fetchSiteInfo()

  if (userStore.isLoggedIn) {
    await checkUserSubsite()
  }

  // 监听用户信息更新事件
  window.addEventListener('user-info-updated', async () => {
    if (userStore.isLoggedIn) {
      await checkUserSubsite()
    }
  })
})

// 重写showRegisterModal方法，在显示注册弹窗时立即加载验证码
const originalShowRegisterModal = showRegisterModal
const enhancedShowRegisterModal = () => {
  originalShowRegisterModal()
  // 立即加载验证码
  setTimeout(() => {
    refreshCaptcha()
  }, 100) // 添加小延迟确保DOM已更新
}
// 替换原始方法
const showRegisterModalWithCaptcha = enhancedShowRegisterModal

// 处理开通分站按钮点击事件
const handleSubsiteCreate = () => {
  // 这里可以添加一些逻辑，确保不会触发公告弹窗
  console.log('开通分站按钮被点击')
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.from-blue-500 {
  --tw-gradient-from: #3b82f6;
  --tw-gradient-to: #2563eb;
}

.to-blue-600 {
  --tw-gradient-to: #2563eb;
}

.hover\:from-blue-600:hover {
  --tw-gradient-from: #2563eb;
  --tw-gradient-to: #1d4ed8;
}

.hover\:to-blue-700:hover {
  --tw-gradient-to: #1d4ed8;
}
</style> 