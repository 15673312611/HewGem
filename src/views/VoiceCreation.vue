<template>
  <div class="fixed inset-0 z-50 flex flex-row w-screen h-screen bg-gradient-to-br from-blue-100/90 via-white/90 to-blue-100/90 backdrop-blur-xl">
    <!-- 左上角返回 -->
    <button @click="goBack" class="absolute top-8 left-8 flex items-center text-gray-700 hover:text-blue-500 text-lg font-bold px-4 py-2 rounded-lg bg-white/80 shadow-md z-50">
      <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      返回
    </button>
    <!-- 左侧语音合成 -->
    <div class="w-[420px] h-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/30 border-r border-gray-100 p-10">
      <!-- 标题、输入、文件名、生成按钮 -->
      <div class="w-full">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">语音合成</span>
          <div class="ml-3 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">专业版</div>
        </h2>
        <div class="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 shadow-lg border border-blue-200/40 mb-8">
          <div class="flex items-center">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg relative overflow-hidden">
              <div class="absolute inset-0 bg-white/10 rounded-full"></div>
              <span class="text-lg">AI</span>
              <div class="absolute w-full h-1/3 bottom-0 left-0 bg-black/10"></div>
            </div>
            <div class="ml-4">
              <div class="text-sm text-gray-500">当前声音</div>
              <div class="font-bold text-xl text-gray-800">{{ currentVoiceName || '未选择声音' }}</div>
            </div>
          </div>
          <button @click="showVoiceSelector = true" class="flex items-center space-x-1 bg-white px-4 py-2.5 rounded-xl text-blue-600 font-medium shadow-md hover:shadow-xl transition-all border border-blue-200 hover:border-blue-300 transform hover:-translate-y-0.5 active:translate-y-0">
            <span>切换声音</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <!-- 文案输入 -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <div class="text-xl font-bold text-gray-800">文本输入</div>
            <div class="flex space-x-3">
              <button class="text-sm text-gray-600 hover:text-blue-500 flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all" @click="aiCreate">
                <svg class="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="none">
                  <path d="M9.5 19H14.5M12 15V19M5 11H19C20.1046 11 21 10.1046 21 9V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V9C3 10.1046 3.89543 11 5 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                AI创作
              </button>
              <button class="text-sm text-gray-600 hover:text-blue-500 flex items-center px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all" @click="clearText">
                <svg class="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6H4M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                清空
              </button>
            </div>
          </div>
          <div class="relative">
            <textarea 
              v-model="textContent"
              rows="7"
              placeholder="请输入您要合成的文本内容..."
              class="w-full p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none resize-none text-gray-700 placeholder-gray-400 font-medium text-lg"
              :maxlength="450"
            ></textarea>
            <div class="absolute bottom-4 right-5 text-sm font-medium text-gray-400 bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
              {{ textContent.length }}/450
            </div>
          </div>
        </div>
        <!-- 文件名称 -->
        <div class="mb-8">
          <div class="mb-4 text-xl font-bold text-gray-800">声音名称 <span class="text-red-500">*</span></div>
          <div class="relative mb-5">
            <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none">
                <path d="M13 3L21 11M21 11L13 19M21 11H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <input 
              v-model="fileName" 
              placeholder="请输入声音名称" 
              class="w-full pl-14 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none text-gray-700 text-lg font-medium"
              required
            />
          </div>
          <button 
            @click="generateVoice" 
            class="w-full h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group"
          >
            <div class="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="absolute inset-0 w-full h-full flex items-center justify-center">
              <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 16C15.59 16 15.25 15.78 15.08 15.45C14.9 15.12 14.92 14.73 15.13 14.42L15.55 13.74C15.89 13.18 15.89 12.49 15.54 11.93L13.75 9.06C13.39 8.5 12.76 8.18 12.08 8.18C11.4 8.18 10.77 8.5 10.42 9.06L8.34 12.42C8.07 12.85 7.56 13.07 7.07 12.92C6.58 12.76 6.24 12.27 6.24 11.72V11.72C6.24 11.38 6.4 11.06 6.66 10.86L9.45 8.75C10.34 8.09 11.48 7.82 12.58 8.01C13.69 8.21 14.64 8.84 15.23 9.79L15.91 10.89C16.32 11.56 16.04 12.42 15.37 12.83C14.7 13.25 13.84 12.97 13.42 12.3L12.84 11.36C12.65 11.05 12.28 10.89 11.91 10.95C11.54 11.01 11.25 11.27 11.12 11.62L10.75 12.69C10.56 13.23 10.65 13.83 10.99 14.29L13.26 17.17C13.67 17.69 14.41 17.78 14.93 17.38C15.46 16.97 15.55 16.22 15.15 15.71L15.02 15.53C14.77 15.2 14.77 14.75 15.03 14.42C15.15 14.26 15.32 14.15 15.51 14.09C15.69 14.03 15.89 14.04 16.07 14.1L16.28 14.18C16.7 14.36 16.98 14.79 16.98 15.25C16.98 15.66 16.55 16 16 16Z" fill="currentColor"/>
              </svg>
              立即生成
            </span>
            <div class="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/5"></div>
            <div class="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-white/5"></div>
          </button>
        </div>
      </div>
    </div>
    <!-- 中间播放区 -->
    <div class="flex-1 h-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50/40 relative p-12">
      <transition name="fade">
        <div>
          <div v-if="!showPlayer && !isGenerating" key="empty" class="flex flex-col items-center justify-center">
            <div class="relative mb-10">
              <div class="w-64 h-64 rounded-full bg-blue-50 flex items-center justify-center animate-pulse-slow">
                <div class="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
                  <div class="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center">
                    <svg class="w-20 h-20 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center">
                <svg class="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3M12 15L8 11M12 15L16 11M3 12V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-3xl font-bold text-gray-800 mb-3">AI语音合成</h3>
              <p class="text-gray-500 max-w-md text-lg">输入文本，点击"立即生成"按钮，即可生成高品质AI语音</p>
            </div>
          </div>
          <div v-else-if="isGenerating" key="generating" class="flex flex-col items-center justify-center">
            <div class="relative mb-10">
              <div class="w-64 h-64 rounded-full bg-blue-50 flex items-center justify-center animate-pulse-slow">
                <div class="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
                  <div class="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-3xl font-bold text-gray-800 mb-3">正在生成语音</h3>
              <p class="text-gray-500 max-w-md text-lg">请稍候，我们正在为您生成高品质AI语音...</p>
            </div>
          </div>
          <div v-else key="player" class="flex flex-col items-center">
            <div class="w-[550px] bg-white rounded-3xl shadow-2xl flex flex-col items-center p-10 animate-fade-in relative mb-8 border border-gray-100">
              <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-base font-bold shadow-lg">
                已生成
              </div>
              <div class="w-72 h-72 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-8 relative">
                <button 
                  @click="togglePlay" 
                  class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group"
                >
                  <div class="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg v-if="!isPlaying" viewBox="0 0 24 24" class="w-16 h-16 text-white">
                    <polygon points="6,3 20,12 6,21" fill="currentColor"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" class="w-16 h-16 text-white">
                    <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                    <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                  </svg>
                </button>
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="46" 
                    fill="none" 
                    stroke="#3B82F6" 
                    stroke-width="3" 
                    stroke-dasharray="289.6" 
                    :stroke-dashoffset="289.6 - (playProgress / 100) * 289.6" 
                    transform="rotate(-90 50 50)"
                    class="transition-all duration-300"
                  />
                </svg>
              </div>
              <div class="text-center mb-8 w-full">
                <h3 class="text-2xl font-bold text-gray-800 mb-3 truncate">{{ currentAudio.name || '未命名音频' }}</h3>
                <div class="text-base text-gray-400 mb-5">时长：{{ currentAudio.duration }}</div>
                <div class="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative">
                  <div class="absolute inset-0 bg-gray-200 rounded-full opacity-50 scale-y-50 transform translate-y-1/4"></div>
                  <div 
                    class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 relative" 
                    :style="{ width: playProgress + '%' }"
                  >
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-500 shadow-md"></div>
                  </div>
                </div>
              </div>
              <div class="flex space-x-4">
                <button 
                  @click="restartAudio" 
                  class="flex items-center justify-center px-5 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-gray-800 hover:border-gray-300"
                >
                  <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.51472 3 7.26472 4.00736 5.63604 5.63604M5 2V6H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  重播
                </button>
                <button 
                  @click="downloadResult" 
                  class="flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all font-medium relative overflow-hidden group"
                >
                  <div class="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
                    <path d="M12 15V3M12 15L8 11M12 15L16 11M3 12V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  下载音频
                </button>
              </div>
              <audio ref="audioRef" :src="currentAudio.url" @ended="onAudioEnded" @timeupdate="onTimeUpdate" class="hidden" />
            </div>
            <div class="flex items-center text-gray-500 text-base">
              <div class="w-24 h-0.5 bg-gray-200 mr-4"></div>
              <span>生成于 {{ formatTime(currentAudio.createdAt) }}</span>
              <div class="w-24 h-0.5 bg-gray-200 ml-4"></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 右侧历史记录 -->
    <div class="w-[420px] h-full flex flex-col bg-white/90 rounded-l-3xl shadow-2xl border-l border-blue-100 p-10 overflow-y-auto">
      <div class="text-2xl font-bold text-gray-800 mb-8 flex items-center">
        <svg class="w-7 h-7 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none"><path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        历史生成记录
      </div>
      <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div v-if="historyList.length === 0" class="text-gray-400 text-center py-8 bg-gray-50 rounded-xl">暂无历史记录</div>
        <div v-else class="space-y-6">
          <div v-for="item in historyList" :key="item.id" class="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start border border-blue-100 hover:shadow-2xl transition-all">
            <div class="flex items-center mb-2 w-full">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-md mr-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-bold text-lg text-gray-800 truncate">{{ item.name || '未命名音频' }}</span>
            </div>
            <div class="text-gray-400 text-sm mb-2">时长：{{ item.duration }} &nbsp;|&nbsp; 生成于 {{ formatTime(item.createdAt) }}</div>
            <audio :ref="el => audioRefs[item.id] = el" :src="item.url" @ended="onHistoryAudioEnded(item.id)" @timeupdate="onHistoryTimeUpdate(item.id)" class="hidden" />
            <div class="flex items-center space-x-3 mt-2">
              <button @click="toggleHistoryPlay(item.id)" class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg hover:scale-105 transition-all">
                <svg v-if="!historyPlaying[item.id]" viewBox="0 0 24 24" class="w-7 h-7 text-white"><polygon points="6,3 20,12 6,21" fill="currentColor"/></svg>
                <svg v-else viewBox="0 0 24 24" class="w-7 h-7 text-white"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>
              </button>
              <button @click="downloadHistory(item)" class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold shadow hover:from-blue-500 hover:to-blue-600 transition-all">下载</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 声音选择模态框 -->
    <div v-if="showVoiceSelector" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showVoiceSelector = false"></div>
      <div class="relative bg-white rounded-xl w-[900px] h-[600px] overflow-hidden flex flex-col">
        <!-- 头部标题和关闭按钮 -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-800">选择声音</h3>
          <button @click="showVoiceSelector = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 主体内容 -->
        <div class="flex-1 overflow-hidden flex">
          <!-- 左侧分类 -->
          <div class="w-48 bg-gray-50 p-4 overflow-y-auto">
            <div class="mb-6">
              <div class="font-semibold text-gray-500 text-sm mb-2">我的声音</div>
              <button 
                @click="handleCategoryChange('favorite')"
                class="flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors mb-2"
                :class="[selectedCategory === 'favorite' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700']"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor === 'favorite' ? '#3B82F6' : 'none'" />
                </svg>
                <span>我的收藏</span>
              </button>
            </div>
            
            <div>
              <div class="font-semibold text-gray-500 text-sm mb-2">声音分类</div>
              <button 
                @click="handleCategoryChange('all')"
                class="w-full text-left px-4 py-2 rounded-lg transition-colors mb-2"
                :class="[selectedCategory === 'all' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700']"
              >
                全部声音
              </button>
              <button 
                v-for="category in voiceCategories" 
                :key="category.id"
                @click="handleCategoryChange(category.id)"
                class="w-full text-left px-4 py-2 rounded-lg transition-colors mb-2"
                :class="[selectedCategory === category.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700']"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
          
          <!-- 右侧声音列表 -->
          <div class="flex-1 p-6 overflow-y-auto">
            <div v-if="loadingVoices" class="flex items-center justify-center h-full">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            
            <div v-else-if="voices.length === 0" class="flex flex-col items-center justify-center h-full text-gray-500">
              <svg class="w-16 h-16 mb-4 text-gray-300" viewBox="0 0 24 24" fill="none">
                <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p>该分类下暂无声音</p>
            </div>
            
            <div v-else class="grid grid-cols-2 gap-4">
              <div 
                v-for="voice in voices" 
                :key="voice.id"
                class="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                :class="{ 'border-blue-500': selectedVoice?.id === voice.id }"
                @click="selectVoice(voice)"
              >
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none">
                      <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-800">{{ voice.name }}</span>
                      <div class="flex items-center space-x-1">
                        <button 
                          @click.stop="toggleVoiceFavorite(voice)"
                          class="p-1.5 rounded-full hover:bg-gray-100"
                          :class="{ 'text-blue-500': voice.isFavorite, 'text-gray-400': !voice.isFavorite }"
                        >
                          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="voice.isFavorite ? 'currentColor' : 'none'" />
                          </svg>
                        </button>
                        <button 
                          @click.stop="playPreviewVoice(voice)"
                          class="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                        >
                          <svg v-if="!voicePlayingMap[voice.id]" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                          </svg>
                          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500">{{ getCategoryName(voice.categoryId) }}</div>
                    <div class="mt-2 text-sm text-blue-500 font-medium" v-if="selectedVoice?.id === voice.id">
                      已选择
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部按钮 -->
        <div class="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button 
            @click="showVoiceSelector = false" 
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            @click="confirmVoiceSelection" 
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            :disabled="!selectedVoice"
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
    <!-- AI文案创作弹窗（性能优化版） -->
    <div v-if="showAICreation" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div class="relative w-full max-w-[680px] mx-auto rounded-3xl shadow-lg overflow-hidden">
        <!-- 卡片主体 -->
        <div class="bg-white rounded-3xl px-10 pt-8 pb-8 flex flex-col border border-gray-100">
          <!-- 头部 -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center space-x-2">
              <svg class="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e0f2fe"/><path d="M12 7v5l3 3" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span class="text-2xl font-extrabold text-gray-800 tracking-wide">AI文案创作</span>
            </div>
            <button @click="closeAICreation" class="text-gray-400 hover:text-blue-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <!-- 步骤1：输入 -->
          <div v-if="aiStep===1" class="flex flex-col gap-6">
            <div>
              <label class="block text-base font-semibold mb-2 text-gray-700">话题 <span class="text-red-500">*</span></label>
              <textarea v-model="aiTopic" rows="3" maxlength="200" placeholder="请输入你想要生成的文案主题或灵感..." class="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none bg-white text-gray-800 placeholder-gray-400 transition-colors"></textarea>
              <div class="text-xs text-gray-400 mt-1 text-right">{{ aiTopic.length }}/200</div>
            </div>
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-base font-semibold mb-2 text-gray-700">字数</label>
                <div class="select-container">
                  <select v-model="aiWordType" class="w-full">
                    <option value="100">约100字 ≈ 20s</option>
                    <option value="200">约200字 ≈ 40s</option>
                    <option value="300">约300字 ≈ 60s</option>
                  </select>
                </div>
              </div>
              <div class="flex-1">
                <label class="block text-base font-semibold mb-2 text-gray-700">生成数量</label>
                <div class="select-container">
                  <select v-model="aiCount" class="w-full">
                    <option v-for="n in [1,2,3,4,5]" :key="n" :value="n">{{ n }}条</option>
                  </select>
                </div>
              </div>
            </div>
            <div v-if="aiError" class="text-red-500 text-sm text-center">{{ aiError }}</div>
            <button @click="handleAIGenerate" :disabled="aiLoading" class="w-full h-12 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl shadow hover:from-blue-600 hover:to-blue-700 transition-colors text-lg flex items-center justify-center gap-2 group">
              <span v-if="aiLoading" class="flex items-center">
                <svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                正在生成...
              </span>
              <span v-else>立即生成</span>
            </button>
            <div class="text-xs text-blue-400 mt-2 text-center">消耗 <span class="font-bold">1</span> 算力/条</div>
          </div>
          <!-- 步骤2：结果 -->
          <div v-else class="flex flex-col gap-4">
            <div class="flex items-center justify-between mb-2">
              <button @click="aiStep=1" class="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors">返回修改</button>
              <span class="text-lg font-bold text-gray-800">AI文案创作结果</span>
            </div>
            <div class="divide-y divide-gray-100 rounded-xl overflow-hidden bg-white border border-gray-100 max-h-[500px] overflow-y-auto custom-scrollbar">
              <div v-for="(item, idx) in aiResults" :key="idx" class="group flex flex-col gap-3 p-6 hover:bg-gray-50/50 transition-colors">
                <div class="flex items-center gap-2 mb-1">
                  <span class="inline-block w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center">{{ idx+1 }}</span>
                  <span class="font-semibold text-gray-700 text-base">文案{{ idx+1 }}</span>
                </div>
                <div class="text-gray-700 mb-3 whitespace-pre-line leading-relaxed text-base">{{ item }}</div>
                <div class="flex gap-2 justify-end">
                  <button @click="copyAICreation(item)" class="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">复制</button>
                  <button @click="useAICreation(item)" class="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors">去使用</button>
                </div>
              </div>
            </div>
            <button @click="handleAIGenerateAgain" class="w-full h-11 mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl shadow hover:from-blue-600 hover:to-blue-700 transition-colors text-lg flex items-center justify-center">
              <span v-if="aiLoading" class="flex items-center">
                <svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                正在生成...
              </span>
              <span v-else>重新生成</span>
            </button>
            <div class="text-xs text-blue-400 mt-2 text-center">消耗 <span class="font-bold">1</span> 算力/条</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { debounce } from 'lodash-es'

// 获取用户 store
const userStore = useUserStore()

const textContent = ref('')
const fileName = ref('')
const showPlayer = ref(false)
const isPlaying = ref(false)
const playProgress = ref(0)
const audioRef = ref(null)
const currentVoiceId = ref('')
const currentVoiceName = ref('')
const synthesisStatus = ref('')
const synthesisId = ref(null)
const statusCheckInterval = ref(null)

const historyList = ref([])
const currentAudio = ref({})

// 添加在组件的 script 部分适当位置
const historyRecords = ref([])

// 获取历史记录
const fetchHistoryRecords = async () => {
  try {
    const response = await fetch(`/api/voice-synthesis-record/list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    
    const result = await response.json()
    if (result.code === 200) {
      console.log('获取历史记录成功:', result.data)
      
      historyList.value = (result.data || []).map(record => {
        console.log('处理记录:', record.id, '音频URL:', record.voiceUrl)
        return {
          id: record.id,
          name: record.fileName,
          url: record.voiceUrl,
          createdAt: record.createTime,
          duration: '00:30', // 默认时长
          text: record.textContent
        }
      })
      
      console.log('处理后的历史列表:', historyList.value)
    } else {
      console.error('获取历史记录失败:', result.message)
      ElMessage.error('获取历史记录失败: ' + result.message)
    }
  } catch (error) {
    console.error('获取历史记录失败:', error)
    ElMessage.error('获取历史记录失败: ' + error.message)
  }
}

// 从路由参数获取声音ID和名称
onMounted(() => {
  const route = useRoute()
  currentVoiceId.value = route.query.voiceId || ''
  currentVoiceName.value = route.query.voiceName || ''
  
  // 获取历史记录，不需要依赖当前音色ID
  fetchHistoryRecords()
})

// 添加生成状态
const isGenerating = ref(false)

// 使用防抖优化频繁操作
const debouncedGenerateVoice = debounce(async () => {
  if (!textContent.value.trim()) {
    ElMessage({
      message: '请输入要合成的文本内容',
      type: 'warning',
      customClass: 'custom-message'
    })
    return
  }

  if (!fileName.value.trim()) {
    ElMessage({
      message: '请输入声音名称',
      type: 'warning',
      customClass: 'custom-message'
    })
    return
  }

  try {
    isGenerating.value = true
    showPlayer.value = true
    
    const response = await fetch('/api/voice/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        textContent: textContent.value,
        fileName: fileName.value,
        voiceId: currentVoiceId.value
      })
    })

    const result = await response.json()
    if (result.code === 200) {
      synthesisId.value = result.data.id
      synthesisStatus.value = '1'
      startStatusCheck()
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    isGenerating.value = false
    showPlayer.value = false
    ElMessage({
      message: error.message || '语音生成失败',
      type: 'error',
      customClass: 'custom-message'
    })
  }
}, 300)

// 修复立即生成按钮无效，补充generateVoice方法
const generateVoice = () => {
  debouncedGenerateVoice()
}

// 修改轮询状态检查方法
const startStatusCheck = () => {
  if (statusCheckInterval.value) {
    clearInterval(statusCheckInterval.value)
  }
  
  statusCheckInterval.value = setInterval(async () => {
    if (!synthesisId.value) return
    
    try {
      const response = await fetch(`/api/voice/status/${synthesisId.value}`, {
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      const result = await response.json()
      
      if (result.code === 200) {
        const record = result.data
        synthesisStatus.value = record.status
        
        if (record.status === '2') {
          clearInterval(statusCheckInterval.value)
          isGenerating.value = false
          
          requestAnimationFrame(() => {
            currentAudio.value = {
              id: record.id,
              name: record.fileName,
              duration: '00:05',
              url: record.voiceUrl,
              createdAt: record.createTime
            }
          })
          
          await nextTick()
          if (audioRef.value) {
            audioRef.value.src = record.voiceUrl
            playAudio()
          }
          
          await fetchHistoryRecords()
          
          ElMessage({
            message: '语音生成成功',
            type: 'success',
            customClass: 'custom-message'
          })
        } else if (record.status === '3') {
          clearInterval(statusCheckInterval.value)
          isGenerating.value = false
          showPlayer.value = false
          ElMessage({
            message: record.errorMessage || '语音生成失败',
            type: 'error',
            customClass: 'custom-message'
          })
        }
      }
    } catch (error) {
      console.error('检查状态失败:', error)
      clearInterval(statusCheckInterval.value)
      isGenerating.value = false
      showPlayer.value = false
      ElMessage({
        message: '检查生成状态失败',
        type: 'error',
        customClass: 'custom-message'
      })
    }
  }, 3000)
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (statusCheckInterval.value) {
    clearInterval(statusCheckInterval.value)
  }
})

const playAudio = () => {
  if (!audioRef.value) return
  
  // 先停止当前播放
  if (!audioRef.value.paused) {
    audioRef.value.pause()
    isPlaying.value = false
  }
  
  // 重置音频时间
  audioRef.value.currentTime = 0
  
  // 等待音频加载完成后再播放
  audioRef.value.addEventListener('canplaythrough', () => {
    audioRef.value.play().catch(error => {
      console.error('播放音频失败:', error)
      ElMessage.error('播放失败: ' + error.message)
    })
    isPlaying.value = true
  }, { once: true })
}

const togglePlay = () => {
  if (!audioRef.value) return
  
  requestAnimationFrame(() => {
    if (audioRef.value.paused) {
      // 确保音频已加载完成
      if (audioRef.value.readyState >= 3) {
        audioRef.value.play().catch(error => {
          console.error('播放音频失败:', error)
          ElMessage.error('播放失败: ' + error.message)
        })
        isPlaying.value = true
      } else {
        // 等待音频加载完成
        audioRef.value.addEventListener('canplaythrough', () => {
          audioRef.value.play().catch(error => {
            console.error('播放音频失败:', error)
            ElMessage.error('播放失败: ' + error.message)
          })
          isPlaying.value = true
        }, { once: true })
      }
    } else {
      audioRef.value.pause()
      isPlaying.value = false
    }
  })
}

const restartAudio = () => {
  if (!audioRef.value) return
  
  // 先停止当前播放
  if (!audioRef.value.paused) {
    audioRef.value.pause()
  }
  
  // 重置音频时间
  audioRef.value.currentTime = 0
  
  // 等待音频加载完成后再播放
  audioRef.value.addEventListener('canplaythrough', () => {
    audioRef.value.play().catch(error => {
      console.error('重播音频失败:', error)
      ElMessage.error('重播失败: ' + error.message)
    })
    isPlaying.value = true
  }, { once: true })
}

const onAudioEnded = () => {
  isPlaying.value = false
  playProgress.value = 0
}

const onTimeUpdate = () => {
  if (!audioRef.value) return
  playProgress.value = (audioRef.value.currentTime / audioRef.value.duration) * 100
}

const downloadResult = () => {
  if (!currentAudio.value?.url) return
  
  requestAnimationFrame(() => {
    ElMessage({
      message: '音频下载中...',
      type: 'info',
      customClass: 'custom-message'
    })
    
    const link = document.createElement('a')
    link.href = currentAudio.value.url
    link.download = `${currentAudio.value.name || '未命名语音'}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setTimeout(() => {
      ElMessage({
        message: '下载完成',
        type: 'success',
        customClass: 'custom-message'
      })
    }, 500)
  })
}

const formatTime = (dateObj) => {
  if (!dateObj) return '-'
  const date = new Date(dateObj)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

// 清空按钮方法
const clearText = () => {
  textContent.value = ''
}

// AI创作按钮方法（占位）
// const aiCreate = () => {
//   // 这里可以实现AI创作逻辑
// }

// 历史记录音频播放状态
const historyPlaying = ref({})
const audioRefs = ref({})

// 切换历史记录播放
const toggleHistoryPlay = (id) => {
  const audio = audioRefs.value[id]
  if (!audio) return
  
  requestAnimationFrame(() => {
    if (audio.paused) {
      Object.keys(audioRefs.value).forEach(key => {
        if (key !== String(id)) {
          audioRefs.value[key]?.pause()
          historyPlaying.value[key] = false
        }
      })
      
      audio.play().catch(error => {
        console.error('播放音频失败:', error)
        ElMessage.error('播放失败: ' + error.message)
        historyPlaying.value[id] = false
      })
      historyPlaying.value[id] = true
    } else {
      audio.pause()
      historyPlaying.value[id] = false
    }
  })
}
const onHistoryAudioEnded = (id) => {
  historyPlaying.value[id] = false
}
const onHistoryTimeUpdate = (id) => {}
const downloadHistory = (item) => {
  if (!item || !item.url) {
    console.error('下载失败：无效的音频URL', item)
    ElMessage.error('下载失败：音频URL不存在')
    return
  }
  
  console.log('开始下载音频:', item.name, '音频URL:', item.url)
  
  try {
    const link = document.createElement('a')
    link.href = item.url
    link.download = `${item.name || '未命名语音'}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    ElMessage({
      message: '下载成功',
      type: 'success',
      customClass: 'custom-message'
    })
  } catch (error) {
    console.error('下载失败:', error)
    ElMessage.error('下载失败: ' + error.message)
  }
}

// 返回按钮方法
const goBack = () => {
  window.history.back()
}

// 添加格式化日期的辅助函数
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// 声音选择相关
const showVoiceSelector = ref(false)
const selectedCategory = ref('all')
const voiceCategories = ref([])
const voices = ref([])
const loadingVoices = ref(false)
const selectedVoice = ref(null)
const voicePlayingMap = ref({})
const voicePreviewElements = ref({})

// 获取声音分类
const fetchVoiceCategories = async () => {
  try {
    const response = await fetch('/api/voice/categories', {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    const result = await response.json()
    voiceCategories.value = result || []
  } catch (error) {
    console.error('获取声音分类失败:', error)
  }
}

// 获取声音列表
const fetchVoices = async (categoryId) => {
  loadingVoices.value = true
  try {
    let url = '/api/voice/list'
    if (categoryId === 'favorite') {
      url = '/api/voice/favorite/list'
    } else if (categoryId !== 'all') {
      url = `/api/voice/list/${categoryId}`
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    })
    
    const result = await response.json()
    
    // 获取收藏状态
    if (categoryId !== 'favorite') {
      const favoriteResponse = await fetch('/api/voice/favorite/status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        },
        params: {
          voiceIds: result.map(v => v.id).join(',')
        }
      })
      const favoriteStatus = await favoriteResponse.json()
      
      voices.value = result.map(voice => ({
        ...voice,
        isFavorite: favoriteStatus[voice.id] || false
      }))
    } else {
      voices.value = result.map(voice => ({
        ...voice,
        isFavorite: true
      }))
    }
  } catch (error) {
    console.error('获取声音列表失败:', error)
    voices.value = []
  } finally {
    loadingVoices.value = false
  }
}

// 切换分类
const handleCategoryChange = (categoryId) => {
  selectedCategory.value = categoryId
  fetchVoices(categoryId)
}

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = voiceCategories.value.find(c => c.id === categoryId)
  return category ? category.name : '未知分类'
}

// 选择声音
const selectVoice = (voice) => {
  selectedVoice.value = voice
}

// 确认选择声音
const confirmVoiceSelection = () => {
  if (selectedVoice.value) {
    currentVoiceId.value = selectedVoice.value.voiceId || selectedVoice.value.id
    currentVoiceName.value = selectedVoice.value.name
    showVoiceSelector.value = false
  }
}

// 播放预览声音
const playPreviewVoice = (voice) => {
  // 停止其他声音
  Object.keys(voicePlayingMap.value).forEach(id => {
    if (id !== voice.id && voicePlayingMap.value[id]) {
      const audio = voicePreviewElements.value[id]
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      voicePlayingMap.value[id] = false
    }
  })
  
  // 播放或暂停当前声音
  if (!voicePreviewElements.value[voice.id]) {
    // 创建新的音频元素
    const audio = new Audio(voice.voiceUrl)
    audio.addEventListener('ended', () => {
      voicePlayingMap.value[voice.id] = false
    })
    voicePreviewElements.value[voice.id] = audio
  }
  
  const audio = voicePreviewElements.value[voice.id]
  if (voicePlayingMap.value[voice.id]) {
    audio.pause()
    voicePlayingMap.value[voice.id] = false
  } else {
    audio.play().catch(error => {
      console.error('播放预览失败:', error)
    })
    voicePlayingMap.value[voice.id] = true
  }
}

// 收藏/取消收藏声音
const toggleVoiceFavorite = async (voice) => {
  try {
    if (voice.isFavorite) {
      // 取消收藏
      await fetch(`/api/voice/favorite/${voice.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      voice.isFavorite = false
    } else {
      // 收藏
      await fetch(`/api/voice/favorite/${voice.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userStore.token}`
        }
      })
      voice.isFavorite = true
    }
    
    // 如果当前是收藏分类，刷新列表
    if (selectedCategory.value === 'favorite') {
      fetchVoices('favorite')
    }
  } catch (error) {
    console.error('操作收藏失败:', error)
  }
}

// 在 onMounted 中加载声音分类和列表
onMounted(() => {
  // 已有的初始化代码...
  
  // 加载声音分类和默认列表
  fetchVoiceCategories()
  fetchVoices('all')
})

// 在 onUnmounted 中清理音频资源
onUnmounted(() => {
  // 已有的清理代码...
  
  // 清理声音预览资源
  Object.values(voicePreviewElements.value).forEach(audio => {
    if (audio) {
      audio.pause()
      audio.src = ''
    }
  })
})

// AI文案创作弹窗相关
const showAICreation = ref(false)
const aiStep = ref(1) // 1=输入，2=结果
const aiTopic = ref('')
const aiCount = ref(3)
const aiWordType = ref(100) // 100=约100字
const aiLoading = ref(false)
const aiResults = ref([])
const aiError = ref('')
const aiCost = ref(0)
const aiHotList = ref([
  { title: '朝鲜驱逐舰下水事故细节披露', tag: '通用 20s' },
  { title: '我国从海上发射一箭4星', tag: '专业 60s' },
  { title: '今日小满色彩渐满', tag: '友好 120s' }
])

// 打开AI创作弹窗
const aiCreate = () => {
  showAICreation.value = true
  aiStep.value = 1
  aiTopic.value = ''
  aiCount.value = 3
  aiWordType.value = 100
  aiResults.value = []
  aiError.value = ''
  aiCost.value = 0
}

// 关闭弹窗
const closeAICreation = () => {
  showAICreation.value = false
}

// 选择热点
const useHot = (item) => {
  aiTopic.value = item.title
  handleAIGenerate()
}

// 立即生成
const handleAIGenerate = debounce(async () => {
  if (!aiTopic.value.trim()) {
    aiError.value = '请输入话题'
    return
  }
  
  aiError.value = ''
  aiLoading.value = true
  aiResults.value = []
  aiCost.value = 0
  
  try {
    const res = await fetch('/api/ai-creation/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        topic: aiTopic.value,
        count: aiCount.value,
        wordCount: aiWordType.value
      })
    })
    
    const result = await res.json()
    if (result.code === 200) {
      requestAnimationFrame(() => {
        aiResults.value = result.data.creations || []
        aiCost.value = result.data.cost || 0
        aiStep.value = 2
        if (aiResults.value.length === 0) {
          aiError.value = '未生成文案，请换个话题重试'
        }
      })
    } else {
      aiError.value = result.message || '生成失败'
    }
  } catch (e) {
    aiError.value = e.message || '请求失败'
  } finally {
    aiLoading.value = false
  }
}, 300)

// 重新生成
const handleAIGenerateAgain = () => {
  handleAIGenerate()
}

// 复制
const copyAICreation = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    requestAnimationFrame(() => {
      ElMessage.success('已复制')
    })
  } catch {
    requestAnimationFrame(() => {
      ElMessage.error('复制失败')
    })
  }
}

// 去使用
const useAICreation = (text) => {
  textContent.value = text
  showAICreation.value = false
  ElMessage.success('已填入AI文案')
}
</script>

<style scoped>
/* 优化动画性能 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
  will-change: opacity;
  transform: translateZ(0);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 优化按钮点击响应 */
button {
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

button:active {
  transform: scale(0.98);
}

/* 优化下拉框样式和交互 */
.select-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-container select {
  width: 100%;
  padding: 0.625rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, border-color, box-shadow;
}

.select-container select:hover {
  border-color: #93c5fd;
}

.select-container select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 预加载下拉框内容 */
select option {
  background-color: white;
  color: #1f2937;
  padding: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: block;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 0 2px 1px;
}

/* 优化下拉框动画 */
@keyframes selectOpen {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

select:focus option {
  animation: selectOpen 0.2s ease-out;
}

/* 其他样式保持不变 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
  will-change: opacity;
  transform: translateZ(0);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e0e0e0 #f1f1f1;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
  will-change: transform;
}

input, textarea {
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: border-color;
}

.modal-content {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.history-item {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.audio-player {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

.progress-bar {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: width;
}

:deep(.custom-message) {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.hover-effect {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}

img {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}
</style> 