const normalizeReferenceDate = () => dayjs().toISOString()

<template>
  <div class="flex h-[calc(100vh-96px)] min-h-0 bg-slate-50 dark:bg-dark-bg overflow-hidden">
    <!-- 左侧：对话列表 -->
    <aside class="w-50 min-w-[220px] flex flex-col border-r border-slate-200/50 dark:border-dark-border bg-white dark:bg-dark-card">
      <header class="px-4 py-3.5 border-b border-slate-200/50 dark:border-dark-border">
        <button
          @click="createNewConversation"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-100 text-white dark:text-slate-900 text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          新建对话
        </button>
      </header>
      <section class="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar space-y-1.5">
        <div
          v-for="conv in conversations"
          :key="conv.id"
          @click="loadConversation(conv.id)"
          class="group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-all"
          :class="currentConversationId === conv.id 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-sm ring-1 ring-blue-200/50 dark:ring-blue-700/50' 
            : 'hover:bg-slate-50/80 dark:hover:bg-dark-card2/60 hover:shadow-sm'"
        >
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <svg class="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div class="truncate font-medium text-slate-700 dark:text-slate-200">{{ conv.title || '新对话' }}</div>
            </div>
          <button
            @click.stop="deleteConversationConfirm(conv.id)"
            class="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-rose-500 transition-all"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
          </div>
        <div v-if="conversations.length === 0" class="pt-16 pb-8 text-center">
          <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <svg class="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        </div>
          <p class="text-xs text-slate-400">暂无对话记录</p>
      </div>
      </section>
      <footer class="px-4 py-3 border-t border-slate-200/50 dark:border-dark-border bg-gradient-to-t from-slate-50/50">
        <button
          @click="showApiKeyModal = true"
          class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
          :class="apiKey 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800 hover:ring-emerald-300' 
            : 'bg-slate-100 dark:bg-dark-card2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-card3'"
        >
          <svg class="w-4 h-4" :class="apiKey ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span>{{ apiKey ? '✓ API 已配置' : '配置 API Key' }}</span>
        </button>
      </footer>
    </aside>

    <!-- 右侧主体 -->
    <section class="flex-1 flex flex-col min-h-0 bg-white dark:bg-dark-card">

      <!-- 聊天区 -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto custom-scrollbar px-8 py-8 bg-white dark:bg-dark-bg">
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full gap-6 text-slate-400 dark:text-slate-500">
          <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
            AI
                </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">开始您的创作之旅</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">选择AI角色或直接开始对话</p>
            <button
              @click="roleModalVisible = true"
              class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
              选择AI角色
            </button>
          </div>
              </div>
        <div v-else class="space-y-6 max-w-4xl mx-auto">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="flex gap-3"
            :class="message.role === 'user' ? 'flex-row-reverse' : ''"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0"
                 :class="message.role === 'user' 
                   ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' 
                   : 'bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 text-white'">
              {{ message.role === 'user' ? '我' : 'AI' }}
            </div>
            <div class="flex-1 min-w-0" :class="message.role === 'user' ? 'flex justify-end' : ''">
              <div class="inline-block max-w-[85%]">
                <!-- 编辑模式 -->
                <div v-if="message.editing" class="space-y-2">
                  <textarea
                    v-model="message.editContent"
                    class="w-full px-4 py-3 border-2 border-blue-400 dark:border-blue-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-card2 dark:text-slate-200 resize-none text-sm"
                    rows="3"
                  ></textarea>
                  <div class="flex items-center gap-2">
                    <button 
                      @click="resendMessage(index)"
                      class="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      重新发送
                </button>
                    <button 
                      @click="cancelEdit(message)"
                      class="px-3 py-1.5 bg-slate-100 dark:bg-dark-card2 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-dark-card3 transition-colors text-xs"
                    >
                      取消
            </button>
        </div>
      </div>
      
                <!-- 正常显示模式 -->
                <div v-else>
                  <div class="space-y-2">
                    <!-- 思考过程（仅推理模式） -->
                    <div v-if="message.role === 'assistant' && message.useReasoning && (message.reasoning || message.isStreaming)" 
                         class="px-4 py-3 rounded-2xl bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50">
                      <button 
                        @click="message.reasoningTime ? (message.showReasoning = !message.showReasoning) : null"
                        class="flex items-center justify-between w-full font-medium text-amber-700 dark:text-amber-400 text-[11px]"
                        :class="message.reasoningTime ? 'cursor-pointer' : 'cursor-default opacity-80'"
                      >
                        <div class="flex items-center gap-2">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span v-if="message.reasoningTime">已深度思考（用时 {{ message.reasoningTime }} 秒）</span>
                          <span v-else-if="message.reasoning">正在深度思考…</span>
                          <span v-else class="flex items-center gap-1">
                            <span class="inline-block w-1.5 h-1.5 bg-amber-600 dark:bg-amber-500 rounded-full animate-bounce"></span>
                            <span class="inline-block w-1.5 h-1.5 bg-amber-600 dark:bg-amber-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                            <span class="inline-block w-1.5 h-1.5 bg-amber-600 dark:bg-amber-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                          </span>
            </div>
                        <svg
                          v-if="message.reasoningTime"
                          class="w-4 h-4 transition-transform"
                          :class="message.showReasoning ? 'rotate-180' : ''"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div v-if="message.showReasoning && message.reasoning" class="mt-2 pt-2 border-t border-amber-200/50 dark:border-amber-800/50 text-[12px] leading-5 text-amber-800 dark:text-amber-300 whitespace-pre-wrap">
                        {{ message.reasoning }}
          </div>
        </div>
        
                    <!-- 消息内容 -->
                    <div
                      v-if="message.role === 'user' || message.content || (!message.useReasoning && message.isStreaming)"
                      class="px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed markdown-content"
                      :class="message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm'
                        : 'bg-slate-50/80 dark:bg-dark-card2/80 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-dark-border shadow-sm'"
                    >
                      <div v-if="message.role === 'user'" class="whitespace-pre-wrap">{{ message.content }}</div>
                      <div v-else-if="message.content" v-html="renderMarkdown(message.content)"></div>
                      <div v-else class="flex items-center gap-1 text-slate-400">
                        <span class="inline-block w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                        <span class="inline-block w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                        <span class="inline-block w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </div>
                    </div>
                  </div>
                  <div class="mt-1.5 flex items-center gap-2 px-1">
                    <button
                      @click="copyToClipboard(message.content)"
                      class="text-xs px-2 py-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-card3 transition-all flex items-center gap-1"
                    >
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                      复制
                    </button>
                    <button
                      v-if="message.role === 'user'"
                      @click="enableEdit(message, index)"
                      class="text-xs px-2 py-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-card3 transition-all flex items-center gap-1"
                    >
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      编辑
                    </button>
                    <button
                      v-if="message.role === 'assistant' && !message.isStreaming && message.content"
                      @click="regenerateMessage(index)"
                      class="text-xs px-2 py-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-card3 transition-all flex items-center gap-1"
                    >
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      重新生成
          </button>
                </div>
              </div>
                </div>
              </div>
        </div>
      </div>
    </div>
    
      <!-- 输入区 -->
      <footer class="border-t border-slate-200/50 dark:border-dark-border px-6 py-4 bg-white dark:bg-dark-card">
        <div class="max-w-4xl mx-auto space-y-3">
          <!-- 功能控制条 -->
          <div class="flex items-center justify-between px-2">
            <div class="flex items-center gap-2">
              <button
                @click="roleModalVisible = true"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-card2 border border-slate-200 dark:border-dark-border text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-purple-400 hover:shadow-md transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                选择角色
                <span v-if="selectedRole" class="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-[10px] font-bold">{{ selectedRole.name }}</span>
                </button>
              <button
                @click="referenceDrawerVisible = true"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-card2 border border-slate-200 dark:border-dark-border text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                参考文案
                <span v-if="selectedReferenceCount > 0" class="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-[10px] font-bold">{{ selectedReferenceCount }}</span>
              </button>
              <button
                @click="translateUserInput"
                :disabled="!userInput.trim() || !apiKey || isTranslating"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-card2 border border-slate-200 dark:border-dark-border text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg v-if="!isTranslating" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 12a8 8 0 018-8" />
                </svg>
                {{ isTranslating ? '翻译中...' : '翻译' }}
              </button>
              <div class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-dark-card2 rounded-lg border border-slate-200 dark:border-dark-border shadow-sm">
                <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span class="text-xs font-medium text-slate-600 dark:text-slate-300">深度推理</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" v-model="deepReasoning" />
                  <div class="w-9 h-5 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600"></div>
                  <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-4"></div>
                </label>
                </div>
              </div>
            <div class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Enter 发送 · Shift+Enter 换行
            </div>
          </div>
        
          <!-- 输入框 -->
          <div class="flex items-end gap-2.5 bg-white dark:bg-dark-card2 border border-slate-200 dark:border-dark-border rounded-xl px-3.5 py-2.5 hover:border-blue-400 dark:hover:border-blue-500 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 transition-all shadow-sm">
              <textarea
                ref="textareaRef"
                v-model="userInput"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.enter.shift.exact="userInput += '\n'"
                @input="autoResizeTextarea"
                placeholder="输入您的创作需求..."
                rows="1"
                class="flex-1 bg-transparent focus:outline-none text-sm text-slate-700 dark:text-slate-100 resize-none placeholder:text-slate-400 leading-6"
                :disabled="!apiKey || isGenerating || isTranslating"
                style="max-height: 120px; overflow-y: auto; min-height: 24px;"
              ></textarea>
              <button
                @click="sendMessage"
                :disabled="isGenerating || !userInput.trim() || !apiKey"
                class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
          </button>
        </div>
        </div>
      </footer>
    </section>

    <!-- 参考文案抽屉 -->
    <el-drawer v-model="referenceDrawerVisible" direction="rtl" size="460px" :with-header="false">
      <div class="h-full flex flex-col bg-white dark:from-dark-card dark:to-dark-bg">
        <header class="px-5 py-4 border-b border-slate-200/50 dark:border-dark-border bg-slate-50 dark:from-dark-card dark:to-dark-card">
          <div class="flex items-center justify-between mb-2">
            <div class="space-y-1">
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">参考文案库</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">选择文案作为创作上下文</p>
              <div class="flex items-center gap-2">
                <button
                  @click.stop="downloadReferenceTemplate"
                  class="px-2.5 py-1 rounded-md border border-slate-200 dark:border-dark-border text-[11px] text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 flex items-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="referenceImporting"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </svg>
                  下载模板
                </button>
                <label class="px-2.5 py-1 rounded-md border border-slate-200 dark:border-dark-border text-[11px] text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600 flex items-center gap-1 transition-all cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4" />
                  </svg>
                  导入Excel
                  <input type="file" accept=".xlsx,.xls" class="hidden" :disabled="referenceImporting" @change="handleReferenceImport" />
                </label>
          </div>
            </div>
            <button 
              @click="openGroupModal()"
              class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              新建类目
          </button>
        </div>
          <div class="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800">
            <p class="text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              已选择 <span class="font-semibold">{{ selectedReferenceCount }}</span> 条参考文案
              <span v-if="referenceImporting" class="ml-2 inline-flex items-center gap-1 text-emerald-600">
                <svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 12a8 8 0 018-8" />
                </svg>
                正在导入...
              </span>
            </p>
          </div>
        </header>
        <div class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3">
          <div v-for="group in referenceGroups" :key="group.id" class="rounded-2xl border border-slate-200/70 dark:border-dark-border bg-white dark:bg-dark-card2 shadow-sm transition-shadow">
            <!-- 分组头部 - 可点击折叠 -->
            <div 
              @click="group.collapsed = !group.collapsed"
              class="px-4 py-3 flex items-center justify-between cursor-pointer bg-gradient-to-r from-slate-50/50 to-transparent dark:from-dark-card3/50 hover:bg-slate-100/50 dark:hover:bg-dark-card3/70 transition-colors"
            >
              <div class="flex items-center gap-2.5">
                <svg 
                  class="w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform"
                  :class="group.collapsed ? '' : 'rotate-90'"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <input 
                  type="checkbox" 
                  v-model="group.selected" 
                  @change.stop="toggleGroup(group)"
                  @click.stop
                  class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ group.name }}</span>
                <span class="text-xs text-slate-400 dark:text-slate-500">({{ group.items.length }})</span>
              </div>
              <div class="flex items-center gap-2" @click.stop>
                <button 
                  @click="openItemModal(group)"
                  class="text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all font-medium"
                >
                  + 添加
                </button>
                <button 
                  @click="confirmDeleteGroup(group)"
                  class="text-xs px-2 py-1 rounded-md text-slate-400 hover:text-white hover:bg-rose-500 transition-all"
                >
                  删除
                </button>
      </div>
    </div>
    
            <!-- 分组内容 - 可折叠 -->
            <div v-show="!group.collapsed" class="border-t border-slate-100/70 dark:border-dark-border">
              <div class="max-h-60 overflow-y-auto custom-scrollbar px-3 py-3 space-y-2">
                <div 
                  v-for="item in group.items" 
                  :key="item.id" 
                  class="group/item rounded-xl border bg-slate-50 dark:from-dark-card3 dark:to-dark-bg/50 px-3 py-2.5 text-xs transition-colors"
                  :class="item.selected ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200/50 dark:border-dark-border hover:border-blue-200'"
                >
                  <div class="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      v-model="item.selected" 
                      @change="syncGroup(group)"
                      class="w-3.5 h-3.5 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-xs truncate">{{ item.content }}</p>
          </div>
                    <div class="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0">
                      <button 
                        @click="openItemModal(group, item)"
                        class="p-1 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-all"
                        title="编辑"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                      </button>
                      <button 
                        @click="removeItem(group, item)"
                        class="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded transition-all"
                        title="删除"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
          </div>
        </div>
                </div>
                <p v-if="group.items.length === 0" class="text-xs text-slate-400 text-center py-4">暂无文案，点击上方添加</p>
              </div>
            </div>
          </div>
          <div v-if="referenceGroups.length === 0" class="text-center py-16">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">还没有参考类目</p>
            <p class="text-xs text-slate-400 mt-1">点击右上角新建类目开始管理</p>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 类目弹窗 -->
    <el-dialog v-model="groupModal.visible" :title="groupModal.id ? '编辑类目' : '新建类目'" width="420px" :close-on-click-modal="false">
      <el-input v-model="groupModal.name" placeholder="类目名称" />
      <template #footer>
        <div class="flex justify-end gap-3">
          <el-button @click="groupModal.visible = false">取消</el-button>
          <el-button type="primary" @click="saveGroup">保存</el-button>
          </div>
              </template>
    </el-dialog>

    <!-- 文案弹窗 -->
    <el-dialog v-model="itemModal.visible" :title="itemModal.id ? '编辑文案' : '新建文案'" width="560px" :close-on-click-modal="false">
      <div>
        <label class="block text-sm mb-2 text-slate-600 dark:text-slate-200">文案内容</label>
        <el-input type="textarea" :rows="8" v-model="itemModal.content" placeholder="请输入参考文案内容" />
            </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <el-button @click="itemModal.visible = false">取消</el-button>
          <el-button type="primary" @click="saveItem">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 角色选择弹窗 -->
    <el-dialog v-model="roleModalVisible" title="选择AI角色" width="720px" :close-on-click-modal="false">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold">选择AI角色</span>
          <button
            @click="openCreateRoleModal"
            class="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            新建角色
          </button>
            </div>
              </template>
      <div class="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div
          v-for="role in aiRoles"
          :key="role.id"
          class="group/role p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-purple-400 hover:shadow-md relative"
          :class="selectedRole?.id === role.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-slate-200 dark:border-dark-border'"
          @click="selectRole(role)"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
              {{ getRoleIcon(role) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ role.name }}</h4>
                <span v-if="role.isDefault && !role.isModified" class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] rounded">默认</span>
                <span v-if="role.isModified" class="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] rounded">已修改</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{{ role.description }}</p>
          </div>
        </div>
        
          <!-- 编辑删除按钮 -->
          <div class="absolute top-2 right-2 opacity-0 group-hover/role:opacity-100 transition-opacity flex items-center gap-1" @click.stop>
            <button
              @click="openEditRoleModal(role)"
              class="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-all"
              title="编辑"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              v-if="!role.isDefault || role.isModified"
              @click="deleteRoleConfirm(role)"
              class="p-1.5 text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded transition-all"
              :class="role.isModified ? 'hover:text-amber-600' : 'hover:text-rose-500'"
              :title="role.isModified ? '恢复默认' : '删除'"
            >
              <svg v-if="role.isModified" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            </div>
          </div>
        <div v-if="aiRoles.length === 0" class="col-span-2 text-center py-12">
          <p class="text-sm text-slate-400">暂无可用角色</p>
        </div>
      </div>
    </el-dialog>

    <!-- 新建/编辑角色弹窗 -->
    <el-dialog v-model="createRoleModalVisible" :title="editingRoleId ? '编辑AI角色' : '新建AI角色'" width="560px" :close-on-click-modal="false">
      <div class="space-y-4">
        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-200">角色名称</label>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
              {{ roleForm.name ? roleForm.name.charAt(0) : '角' }}
          </div>
            <el-input v-model="roleForm.name" placeholder="如：文案策划师" />
        </div>
          <p class="text-xs text-slate-400 mt-1">图标将自动使用角色名称的首字</p>
      </div>
        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-200">角色描述</label>
          <el-input type="textarea" :rows="2" v-model="roleForm.description" placeholder="简短描述这个角色的用途" />
        </div>
        <div>
          <label class="block text-sm mb-1 text-slate-600 dark:text-slate-200">角色提示词（System Prompt）</label>
          <el-input type="textarea" :rows="6" v-model="roleForm.prompt" placeholder="如：你是一位专业的文案策划师，擅长创作营销文案..." />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <el-button @click="createRoleModalVisible = false">取消</el-button>
          <el-button type="primary" @click="saveRole">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- API Key -->
    <el-dialog v-model="showApiKeyModal" title="配置 DeepSeek API Key" width="480px">
      <div class="space-y-4">
        <div class="space-y-2">
          <el-input v-model="tempApiKey" type="password" show-password placeholder="sk-..." />
          <p class="text-xs text-slate-400">密钥仅保存在浏览器本地，不会上传到服务器</p>
        </div>
        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800">
          <div class="flex items-start gap-2">
            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="flex-1">
              <p class="text-xs text-blue-700 dark:text-blue-400 mb-2">还没有 API Key？</p>
              <a 
                href="https://platform.deepseek.com/api_keys" 
                target="_blank"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all border border-blue-200 dark:border-blue-700"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                前往 DeepSeek 获取 API Key
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <el-button @click="showApiKeyModal = false">取消</el-button>
          <el-button type="primary" @click="saveApiKey">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { marked } from 'marked'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import request from '@/utils/request'

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
})

const apiKey = ref('')
const tempApiKey = ref('')
const showApiKeyModal = ref(false)
const deepReasoning = ref(false)
const referenceDrawerVisible = ref(false)

const referenceGroups = ref([])
const groupModal = ref({ visible: false, id: null, name: '' })
const itemModal = ref({ visible: false, groupId: null, id: null, content: '' })
const referenceImporting = ref(false)
const referenceImportSummary = ref({ addedGroups: 0, addedItems: 0, updatedItems: 0, skippedRows: 0 })
const referenceImportErrorRows = ref([])
const referenceTemplateHeaders = ['类目名称', '文案内容']
const referenceTemplateFilename = '参考文案模板.xlsx'
const referenceImportAllowedExtensions = ['.xlsx', '.xls']
const maxReferenceTitleLength = 20
const maxReferenceRows = 500
const referenceImportAllowedMIMEs = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel'
]
const normalizeReferenceDate = () => dayjs().toISOString()
const createTempId = () => Date.now() + Math.floor(Math.random() * 1000)
const buildReferenceTemplate = () => [[...referenceTemplateHeaders], ['爆款主题', '这里填写完整的参考文案内容，建议200字以内']]
const resetReferenceImportState = () => {
  referenceImporting.value = false
  referenceImportSummary.value = { addedGroups: 0, addedItems: 0, updatedItems: 0, skippedRows: 0 }
  referenceImportErrorRows.value = []
}

const downloadReferenceTemplate = () => {
  try {
    const data = buildReferenceTemplate()
    const worksheet = XLSX.utils.aoa_to_sheet(data, { origin: 'A1' })
    worksheet['!cols'] = [{ wch: 16 }, { wch: 60 }]
    const workbook = XLSX.utils.book_new()
    workbook.Props = {
      Title: 'AI参考文案导入模板',
      Subject: '参考文案导入',
      Author: 'AI文案助手',
      CreatedDate: new Date()
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, '参考文案')
    XLSX.writeFile(workbook, referenceTemplateFilename)
    ElMessage.success('模板已下载')
  } catch (error) {
    console.error('❌ 下载模板失败', error)
    ElMessage.error('下载模板失败，请重试')
  }
}

const validateReferenceFile = (file) => {
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
  if (!referenceImportAllowedExtensions.includes(extension)) {
    throw new Error('仅支持 .xlsx / .xls 文件')
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('文件过大，请控制在 5MB 以内')
  }
  if (file.type && !referenceImportAllowedMIMEs.includes(file.type)) {
    console.warn('⚠️ 文件 MIME 类型异常:', file.type)
  }
}

const parseReferenceWorkbook = (data) => {
  const workbook = XLSX.read(data, { type: 'array' })
  const sheetName = workbook.SheetNames[0]
  if (!sheetName) {
    throw new Error('Excel 中没有找到数据页')
  }
  const worksheet = workbook.Sheets[sheetName]
  const parsed = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
  if (parsed.length <= 1) {
    throw new Error('Excel 中没有有效数据，请填写后再导入')
  }
  return parsed
}

const normalizeReferenceRow = (row, rowNumber) => {
  const [rawGroupName, rawContent] = row
  const groupName = String(rawGroupName || '').trim()
  const content = String(rawContent || '').trim()
  if (!groupName && !content) {
    return null
  }
  if (!groupName) {
    throw new Error(`第 ${rowNumber} 行缺少类目名称`)
  }
  if (!content) {
    throw new Error(`第 ${rowNumber} 行缺少文案内容`)
  }
  if (content.length < 4) {
    throw new Error(`第 ${rowNumber} 行文案内容过短，请至少填写4个字符`)
  }
  if (content.length > 2000) {
    throw new Error(`第 ${rowNumber} 行文案内容太长，请控制在2000字以内`)
  }
  return { groupName, content }
}

const handleReferenceImport = async (event) => {
  const fileInput = event?.target
  const file = fileInput?.files?.[0]
  if (!file) {
    return
  }

  // 允许重复选择同一个文件
  fileInput.value = ''

  resetReferenceImportState()
  referenceImporting.value = true

  const summary = { addedGroups: 0, addedItems: 0, updatedItems: 0, skippedRows: 0 }
  const rowErrors = []

  try {
    validateReferenceFile(file)

    const buffer = await file.arrayBuffer()
    const parsedRows = parseReferenceWorkbook(buffer)
    const dataRows = parsedRows.slice(1)

    const effectiveRowCount = dataRows.filter(row => Array.isArray(row) && row.some(cell => String(cell ?? '').trim() !== '')).length
    if (effectiveRowCount === 0) {
      throw new Error('未检测到有效数据，请填写模板后再导入')
    }
    if (effectiveRowCount > maxReferenceRows) {
      throw new Error(`单次最多导入 ${maxReferenceRows} 条参考文案，请拆分后上传`)
    }

    dataRows.forEach((row, index) => {
      const rowNumber = index + 2 // Excel 行号
      try {
        const normalized = normalizeReferenceRow(row, rowNumber)
        if (!normalized) {
          summary.skippedRows += 1
          return
        }

        const { groupName, content } = normalized
        const now = normalizeReferenceDate()

        let group = referenceGroups.value.find(g => g.name === groupName)
        if (!group) {
          group = {
            id: createTempId(),
            name: groupName,
            selected: false,
            collapsed: false,
            items: [],
            createTime: now,
            updateTime: now,
            needSync: true
          }
          referenceGroups.value.unshift(group)
          summary.addedGroups += 1
        }

        group.collapsed = false
        group.updateTime = now

        const title = content.slice(0, maxReferenceTitleLength)

        const sameContentItem = group.items.find(item => item.content === content)
        if (sameContentItem) {
          sameContentItem.selected = true
          sameContentItem.updateTime = now
          summary.skippedRows += 1
          return
        }

        const similarItem = group.items.find(item => item.title === title)
        if (similarItem) {
          similarItem.content = content
          similarItem.updateTime = now
          similarItem.selected = true
          summary.updatedItems += 1
        } else {
          group.items.unshift({
            id: createTempId(),
            title,
            content,
            selected: true,
            createTime: now,
            updateTime: now
          })
          summary.addedItems += 1
        }

        group.needSync = true
        syncGroup(group)
      } catch (rowError) {
        summary.skippedRows += 1
        rowErrors.push({ row: rowNumber, error: rowError.message || String(rowError) })
      }
    })

    referenceImportSummary.value = summary
    referenceImportErrorRows.value = rowErrors

    if (summary.addedItems > 0 || summary.updatedItems > 0) {
      ElMessage.success(`导入完成：新增 ${summary.addedItems} 条，更新 ${summary.updatedItems} 条`)
    }

    if (rowErrors.length > 0) {
      console.warn('⚠️ Excel 导入存在异常行:', rowErrors)
      ElMessage.warning(`有 ${rowErrors.length} 行导入失败，详情见控制台`) 
    } else if (summary.addedItems === 0 && summary.updatedItems === 0) {
      ElMessage.info('没有可导入的新文案，已跳过')
    }

    debouncedSaveReferences()
  } catch (error) {
    console.error('❌ 导入参考文案失败', error)
    ElMessage.error(error.message || '导入失败，请检查文件格式')
  } finally {
    referenceImporting.value = false
  }
}

const conversations = ref([])
const currentConversationId = ref(null)
const messages = ref([])
const userInput = ref('')
const isGenerating = ref(false)
const isTranslating = ref(false)
const chatContainer = ref(null)
const textareaRef = ref(null)

// 同步状态
const isSyncing = ref(false)
const lastSyncTime = ref(null)

// 角色相关
const aiRoles = ref([])
const roleModalVisible = ref(false)
const selectedRole = ref(null)
const createRoleModalVisible = ref(false)
const roleForm = ref({ id: null, name: '', description: '', prompt: '' })
const editingRoleId = ref(null)

// 默认预设角色（系统内置，ID使用负数）
const defaultRoles = [
  {
    id: -1,
    name: '口播文案师',
    description: '专业口播脚本创作，打造爆款短视频文案',
    prompt: '你是顶尖的短视频口播文案创作者，专门生成适用于短视频爆款的纯文本脚本。\n\n重要规则：\n- 只输出纯文本内容，不要任何markdown格式、粗体、斜体、符号标记\n- 不要解释、不要分析、不要多余的描述\n- 开头必须抓眼球，用悬念或痛点直击\n- 全程口语化，像聊天一样自然，多用短句\n- 适合口播，节奏紧凑，每句话都有信息量\n- 结尾引导互动，如"双击点赞"、"评论区告诉我"\n\n直接输出完整的口播文案，不要前后缀说明，让配音软件可以直接读出来。',
    isDefault: true
  },
  {
    id: -2,
    name: '文案策划师',
    description: '专业的营销文案创作，擅长各类宣传推广内容',
    prompt: '你是一位资深的文案策划师，拥有10年以上的营销文案创作经验。你擅长创作各类营销推广文案，包括产品介绍、广告语、社交媒体文案等。你的文案风格多变，能根据不同场景调整语气，既能写出专业严谨的商务文案，也能创作轻松活泼的社交媒体内容。请用简洁有力的语言，抓住读者注意力。',
    isDefault: true
  },
  {
    id: -3,
    name: '小红书博主',
    description: '打造爆款小红书笔记，流量密码专家',
    prompt: '你是一位经验丰富的小红书博主，深谙平台规则和流量密码。你擅长创作吸引眼球的标题，使用emoji让内容更生动，懂得如何利用话题标签提升曝光。你的文案风格真诚自然，善于用第一人称分享，让读者产生共鸣。请用口语化、接地气的方式创作内容。',
    isDefault: true
  },
  {
    id: -4,
    name: '抖音文案师',
    description: '短视频脚本创作，打造爆款内容',
    prompt: '你是一位专业的短视频文案创作者，深谙抖音平台的内容规律。你擅长创作3秒吸引注意、15秒讲完故事的短视频脚本。你懂得如何设置悬念、制造反转、引导互动。文案要简短有力，节奏紧凑，适合口播或字幕展示。',
    isDefault: true
  },
  {
    id: -5,
    name: '电商客服',
    description: '专业客服话术，提升转化率和好评率',
    prompt: '你是一位专业且亲切的电商客服，拥有丰富的客户沟通经验。你的回复既专业又有温度，能准确理解客户需求，耐心解答疑问，妥善处理投诉。你懂得如何引导客户下单，提升转化率，同时维护品牌形象。回复要礼貌、高效、有针对性。',
    isDefault: true
  },
  {
    id: -6,
    name: '产品文档撰写',
    description: '清晰的产品说明和使用指南',
    prompt: '你是一位专业的产品文档撰写专家，擅长将复杂的功能用简单易懂的语言表达。你的文档结构清晰，逻辑严密，既有概述也有细节，配合适当的示例说明。你懂得站在用户角度思考，让文档既专业又易读。',
    isDefault: true
  },
  {
    id: -7,
    name: '故事创作者',
    description: '引人入胜的故事和剧本创作',
    prompt: '你是一位富有创意的故事创作者，擅长构思引人入胜的故事情节。你懂得如何塑造鲜明的人物形象，设置吸引人的冲突，营造适当的节奏。无论是短篇故事、长篇小说还是影视剧本，你都能创作出让人印象深刻的作品。',
    isDefault: true
  },
  {
    id: -8,
    name: '专业翻译',
    description: '准确流畅的中英文互译',
    prompt: '你是一位专业的中英文翻译，不仅精通两种语言，更了解中西方文化差异。你的翻译既准确又自然，能根据语境选择最恰当的表达方式。你擅长各类文本的翻译，包括文学作品、商务文件、技术文档等。翻译时请保持原文的语气和风格。',
    isDefault: true
  },
  {
    id: -9,
    name: 'AI绘画提示词',
    description: '为Midjourney、Stable Diffusion等生成专业提示词',
    prompt: '你是AI绘画提示词专家，精通Midjourney、Stable Diffusion、DALL-E等AI绘画工具的提示词编写规则。你能将用户的描述转化为详细、准确的英文提示词，包括主体描述、风格、光影、构图、参数设置等。你的提示词能帮助生成高质量的AI艺术作品。',
    isDefault: true
  }
]

const selectedReferenceCount = computed(() => referenceGroups.value.reduce((sum, group) => sum + group.items.filter(item => item.selected).length, 0))
const selectedReferenceItems = computed(() => referenceGroups.value.flatMap(group => group.items.filter(item => item.selected)))

onMounted(() => {
  loadFromStorage()
  // 延迟从服务器加载对话列表和角色
  setTimeout(() => {
    loadConversationsFromServer()
    loadAiRoles()
  }, 500)
  
  // 初始化 textarea 高度
  nextTick(() => autoResizeTextarea())
})

const loadFromStorage = () => {
  const key = localStorage.getItem('deepseek_api_key')
  if (key) {
    apiKey.value = key
    tempApiKey.value = key
  }
  const groups = localStorage.getItem('ai_reference_groups')
  if (groups) {
    referenceGroups.value = JSON.parse(groups).map(g => ({
      ...g,
      collapsed: g.collapsed !== false  // 默认折叠，除非明确设置为false
    }))
  }
  const convs = localStorage.getItem('ai_conversations')
  conversations.value = convs ? JSON.parse(convs) : []
  
  const syncTime = localStorage.getItem('last_sync_time')
  if (syncTime) {
    lastSyncTime.value = syncTime
  }
}

// 防抖保存当前对话函数
const debouncedSaveCurrentConversation = debounce(async () => {
  console.log('⏰ 防抖触发，准备保存当前对话到服务器...')
  if (!navigator.onLine) {
    console.log('📡 当前离线，跳过上传')
    return
  }
  await saveCurrentConversationToServer()
}, 2000)

const debouncedSaveReferences = debounce(async () => {
  console.log('⏰ 防抖触发，准备上传参考文案...')
  if (!navigator.onLine) {
    console.log('📡 当前离线，跳过上传')
    return
  }
  await uploadReferenceData()
}, 2000)

watch(referenceGroups, () => {
  console.log('📝 参考文案发生变化，保存到本地')
  localStorage.setItem('ai_reference_groups', JSON.stringify(referenceGroups.value))
  debouncedSaveReferences()
}, { deep: true })

// 只监听conversations的变化保存到本地，不自动上传
watch(conversations, () => {
  console.log('📝 对话发生变化，保存到本地, 总数:', conversations.value.length)
  localStorage.setItem('ai_conversations', JSON.stringify(conversations.value))
}, { deep: true })

// Debounce 工具函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ========== 服务器同步相关 ==========

// 从服务器加载对话列表（只拉取，不上传）
const loadConversationsFromServer = async () => {
  if (isSyncing.value) {
    console.log('⏳ 正在加载中，跳过')
    return
  }
  if (!navigator.onLine) {
    console.log('📡 当前离线，跳过加载')
    return
  }
  
  isSyncing.value = true
  console.log('🔄 从服务器加载对话列表...')
  
  try {
    // 获取服务器的对话和参考文案
    const [serverConversations, serverReferences] = await Promise.all([
      request.get('/api/ai/conversations'),
      request.get('/api/ai/references')
    ])
    
    console.log('📊 服务器数据:', {
      对话数: serverConversations.data?.length || 0,
      参考分组数: serverReferences.data?.length || 0
    })
    
    // 合并数据（以服务器为准，补充本地没有的）
    const localConvIds = new Set(conversations.value.map(c => c.id))
    const serverConvs = serverConversations.data || []
    
    // 添加本地没有的对话
    serverConvs.forEach(serverConv => {
      if (!localConvIds.has(serverConv.id)) {
        conversations.value.push({
          ...serverConv,
          needSync: false
        })
        console.log(`  ✓ 从服务器加载对话: ${serverConv.title} (ID: ${serverConv.id})`)
      }
    })
    
    // 合并参考文案
    referenceGroups.value = mergeReferences(referenceGroups.value, serverReferences.data || [])
    
    // 保存到本地
    localStorage.setItem('ai_conversations', JSON.stringify(conversations.value))
    localStorage.setItem('ai_reference_groups', JSON.stringify(referenceGroups.value))
    
    // 更新同步时间
    const now = new Date().toISOString()
    lastSyncTime.value = now
    localStorage.setItem('last_sync_time', now)
    
    console.log('✅ 对话列表加载完成')
  } catch (error) {
    console.error('❌ 加载对话列表失败', error)
  } finally {
    isSyncing.value = false
  }
}

// 保存当前对话到服务器
const saveCurrentConversationToServer = async () => {
  if (!currentConversationId.value) {
    console.log('⚠️  没有当前对话，跳过保存')
    return
  }
  
  const currentConv = conversations.value.find(c => c.id === currentConversationId.value)
  if (!currentConv) {
    console.log('⚠️  找不到当前对话，跳过保存')
    return
  }
  
  console.log('💾 保存当前对话到服务器:', {
    id: currentConv.id,
    title: currentConv.title,
    消息数: currentConv.messages?.length || 0
  })
  
  try {
    // 转换数据格式
    const formattedConv = {
      ...currentConv,
      messages: currentConv.messages?.map(msg => ({
        ...msg,
        useReasoning: msg.useReasoning ? 1 : 0
      }))
    }
    
    // 调用单个保存接口
    const result = await request.post('/api/ai/conversations', formattedConv)
    
    console.log('✅ 服务器返回:', result)
    
    if (result.code === 200 && result.data) {
      const savedConv = result.data
      
      // 如果ID发生了变化（临时ID → 真实ID）
      if (currentConv.id !== savedConv.id) {
        const oldId = currentConv.id
        const newId = savedConv.id
        
        console.log(`🔄 ID映射: ${oldId} → ${newId}`)
        
        // 更新对话ID
        currentConv.id = newId
        currentConversationId.value = newId
        
        console.log(`  ✓ 当前对话ID已更新: ${newId}`)
      }
      
      // 清除同步标记
      currentConv.needSync = false
      
      // 保存到本地
      localStorage.setItem('ai_conversations', JSON.stringify(conversations.value))
      
      console.log('✅ 对话保存成功')
  } else {
      console.error('❌ 服务器返回错误:', result.message)
    }
  } catch (error) {
    console.error('❌ 保存对话失败', error)
  }
}

// 合并对话数据
const mergeConversations = (localData, serverData) => {
  const merged = new Map()
  
  localData.forEach(conv => {
    merged.set(conv.id, { ...conv, source: 'local' })
  })
  
  serverData.forEach(conv => {
    const existing = merged.get(conv.id)
    
    if (!existing) {
      merged.set(conv.id, { ...conv, source: 'server', needSync: false })
    } else {
      const localTime = new Date(existing.updateTime).getTime()
      const serverTime = new Date(conv.updateTime).getTime()
      
      if (serverTime > localTime) {
        merged.set(conv.id, { ...conv, source: 'server', needSync: false })
      } else if (localTime > serverTime) {
        merged.set(conv.id, { ...existing, needSync: true })
      }
    }
  })
  
  return Array.from(merged.values()).sort((a, b) => 
    new Date(b.updateTime || 0) - new Date(a.updateTime || 0)
  )
}

// 合并参考文案数据
const mergeReferences = (localData, serverData) => {
  const merged = new Map()
  
  localData.forEach(group => {
    merged.set(group.id, { ...group, source: 'local' })
  })
  
  serverData.forEach(group => {
    const existing = merged.get(group.id)
    
    if (!existing) {
      merged.set(group.id, { 
        ...group, 
        collapsed: true,  // 从服务器加载的默认折叠
        source: 'server', 
        needSync: false 
      })
    } else {
      const localTime = new Date(existing.updateTime || 0).getTime()
      const serverTime = new Date(group.updateTime || 0).getTime()
      
      if (serverTime > localTime) {
        merged.set(group.id, { 
          ...group, 
          collapsed: existing.collapsed !== false,  // 保留本地的折叠状态
          source: 'server', 
          needSync: false 
        })
      } else if (localTime > serverTime) {
        merged.set(group.id, { ...existing, needSync: true })
      }
    }
  })
  
  return Array.from(merged.values())
}


// 上传参考文案数据
const uploadReferenceData = async () => {
  const pendingReferences = referenceGroups.value.filter(g => g.needSync)
  
  console.log('⬆️  检查待上传参考文案:', {
    总数: referenceGroups.value.length,
    待上传: pendingReferences.length
  })
  
  if (pendingReferences.length === 0) {
    console.log('✅ 没有待上传的参考文案')
    return
  }
  
  try {
    console.log('🔄 开始上传', pendingReferences.length, '个参考分组到服务器...')
    
    // 使用request工具，自动带token
    const result = await request.post('/api/ai/references/batch-sync', pendingReferences)
    
    console.log('✅ 服务器返回:', result)
    
    if (result.code === 200) {
      referenceGroups.value.forEach(group => {
        group.needSync = false
      })
      localStorage.setItem('ai_reference_groups', JSON.stringify(referenceGroups.value))
      console.log('✅ 参考文案上传成功')
    } else {
      console.error('❌ 服务器返回错误:', result.message)
    }
  } catch (error) {
    console.error('❌ 上传参考文案失败', error)
  }
}

// ========== 角色相关 ==========

// 默认角色图标映射
const defaultRoleIcons = {
  '文案': '✨',
  '营销': '📢',
  '策划': '📝',
  '编剧': '🎬',
  '作家': '📚',
  '翻译': '🌐',
  '客服': '💬',
  '助手': '🤝',
  '老师': '👨‍🏫',
  '专家': '🎓'
}

// 获取角色图标（取名称首字）
const getRoleIcon = (role) => {
  if (role.name && role.name.length > 0) {
    return role.name.charAt(0)
  }
  return '角'
}

// 加载AI角色列表
const loadAiRoles = async () => {
  try {
    const result = await request.get('/api/ai/roles')
    console.log('📥 角色列表响应:', result)
    
    let userRoles = []
    if (result.code === 200) {
      userRoles = result.data || []
      console.log('✅ 加载了', userRoles.length, '个用户自定义角色')
  } else {
      console.warn('⚠️  角色列表返回异常:', result)
    }
    
    // 合并默认角色和用户角色
    // 1. 先检查用户是否修改了默认角色
    const userRoleMap = new Map(userRoles.map(r => [r.id, r]))
    
    // 2. 处理默认角色：如果用户有修改版本，使用用户版本
    const mergedDefaultRoles = defaultRoles.map(defaultRole => {
      // 查找是否有对应的用户修改版本（通过ID查找）
      const userVersion = userRoles.find(ur => ur.id === defaultRole.id)
      if (userVersion) {
        return { ...userVersion, isDefault: true, isModified: true }
      }
      return defaultRole
    })
    
    // 3. 用户创建的新角色（不包括修改默认角色的）
    const userCreatedRoles = userRoles.filter(ur => ur.id > 0)
    
    // 4. 最终列表：用户创建的 + 默认角色
    aiRoles.value = [...userCreatedRoles, ...mergedDefaultRoles]
    
    console.log('✅ 总共', aiRoles.value.length, '个角色（用户创建:', userCreatedRoles.length, ', 默认:', mergedDefaultRoles.length, '）')
  } catch (error) {
    console.error('❌ 加载AI角色失败', error)
    // 失败时至少显示默认角色
    aiRoles.value = [...defaultRoles]
  }
}

// 选择角色并创建新对话
const selectRole = (role) => {
  console.log('🎭 选择角色:', role.name)
  
  // 如果当前有对话，创建新对话
  if (messages.value.length > 0) {
    createNewConversation()
  }
  
  // 添加角色的介绍消息（AI回复）
  messages.value.push({
    role: 'assistant',
    content: role.prompt || `你好！我是 **${role.name}**\n\n${role.description || '我会尽力帮助您完成文案创作！'}`,
    isRoleIntro: true,  // 标记为角色介绍消息
    useReasoning: false
  })
  
  selectedRole.value = role
  roleModalVisible.value = false
  
  console.log('✅ 已选择角色:', role.name)
  
  nextTick(() => scrollToBottom(true))
}

// 打开新建角色弹窗
const openCreateRoleModal = () => {
  roleForm.value = { id: null, name: '', description: '', prompt: '' }
  editingRoleId.value = null
  createRoleModalVisible.value = true
  roleModalVisible.value = false
}

// 打开编辑角色弹窗
const openEditRoleModal = (role) => {
  roleForm.value = {
    id: role.id,
    name: role.name,
    description: role.description,
    prompt: role.prompt
  }
  editingRoleId.value = role.id
  createRoleModalVisible.value = true
  roleModalVisible.value = false
}

// 保存角色
const saveRole = async () => {
  if (!roleForm.value.name.trim()) {
    ElMessage.warning('请输入角色名称')
    return
  }
  if (!roleForm.value.prompt.trim()) {
    ElMessage.warning('请输入角色提示词')
    return
  }
  
  try {
    let result
    if (editingRoleId.value) {
      // 编辑角色
      if (editingRoleId.value < 0) {
        // 编辑默认角色 → 保存为用户自定义（使用默认角色的负ID）
        const saveData = {
          ...roleForm.value,
          id: editingRoleId.value  // 保持负ID，后端识别为修改默认角色
        }
        result = await request.post('/api/ai/roles', saveData)
      } else {
        // 编辑用户角色 → 直接更新
        result = await request.put(`/api/ai/roles/${editingRoleId.value}`, roleForm.value)
      }
    } else {
      // 新建角色
      result = await request.post('/api/ai/roles', roleForm.value)
    }
    
    if (result.code === 200) {
      ElMessage.success(editingRoleId.value ? '角色更新成功' : '角色创建成功')
      createRoleModalVisible.value = false
      
      // 重新加载角色列表
      await loadAiRoles()
      
      // 自动选择刚创建/更新的角色
      const savedRole = result.data
      if (savedRole && !editingRoleId.value) {
        selectRole(savedRole)
      }
    } else {
      ElMessage.error(result.message || '保存失败')
    }
  } catch (error) {
    console.error('❌ 保存角色失败', error)
    ElMessage.error('保存失败')
  }
}

// 删除角色
const deleteRoleConfirm = (role) => {
  // 如果是默认角色且已修改，显示"恢复默认"
  if (role.isDefault && role.isModified) {
    ElMessageBox.confirm(`确定将角色「${role.name}」恢复为默认设置？`, '提示', {
      confirmButtonText: '恢复默认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      try {
        const result = await request.delete(`/api/ai/roles/${role.id}`)
        
        if (result.code === 200) {
          ElMessage.success('已恢复默认设置')
          await loadAiRoles()
          
          if (selectedRole.value?.id === role.id) {
            selectedRole.value = null
          }
        } else {
          ElMessage.error(result.message || '操作失败')
        }
      } catch (error) {
        console.error('❌ 恢复默认失败', error)
        ElMessage.error('操作失败')
      }
    }).catch(() => {})
  } else if (role.isDefault) {
    // 默认角色不能删除
    ElMessage.warning('默认角色不能删除，只能编辑')
  } else {
    // 用户创建的角色可以删除
    ElMessageBox.confirm(`确定删除角色「${role.name}」？`, '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      try {
        const result = await request.delete(`/api/ai/roles/${role.id}`)
        
        if (result.code === 200) {
    ElMessage.success('删除成功')
          await loadAiRoles()
          
          if (selectedRole.value?.id === role.id) {
            selectedRole.value = null
          }
        } else {
          ElMessage.error(result.message || '删除失败')
        }
  } catch (error) {
        console.error('❌ 删除角色失败', error)
        ElMessage.error('删除失败')
      }
    }).catch(() => {})
  }
}

const extractReasoningText = (value) => {
  if (!value) return ''

  if (Array.isArray(value)) {
    return value.map(item => extractReasoningText(item)).join('')
  }

  if (typeof value === 'object') {
    if (typeof value.text === 'string') return value.text
    if (typeof value.content === 'string') return value.content
    if (typeof value.message === 'string') return value.message

    return Object.values(value)
      .map(item => (typeof item === 'string' ? item : extractReasoningText(item)))
      .join('')
  }

  if (typeof value === 'string') return value

  return ''
}

const saveApiKey = () => {
  if (!tempApiKey.value.trim()) {
    ElMessage.warning('请输入 API Key')
    return
  }
  apiKey.value = tempApiKey.value.trim()
  localStorage.setItem('deepseek_api_key', apiKey.value)
  showApiKeyModal.value = false
  ElMessage.success('保存成功')
}

const createNewConversation = () => {
  currentConversationId.value = null
  messages.value = []
  selectedRole.value = null  // 清除选择的角色
  nextTick(() => scrollToBottom(true))
}

const loadConversation = (id) => {
  const conv = conversations.value.find(c => c.id === id)
  if (!conv) return
  currentConversationId.value = id
  messages.value = conv.messages || []
  nextTick(() => scrollToBottom(true))
}

const deleteConversationConfirm = (id) => {
  ElMessageBox.confirm('确定删除此对话？', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 立即删除本地数据（乐观更新，不等后端响应）
    conversations.value = conversations.value.filter(c => c.id !== id)
    localStorage.setItem('ai_conversations', JSON.stringify(conversations.value))
    
    if (currentConversationId.value === id) {
      createNewConversation()
    }
    
    ElMessage.success('删除成功')
    
    // 后台异步调用后端删除（不阻塞UI）
    if (id && id < 9999999999) {
      console.log('🗑️  删除对话（后台调用后端）:', id)
      request.delete(`/api/ai/conversations/${id}`)
        .then(result => {
          if (result.code === 200) {
            console.log('✅ 后端删除成功')
          } else {
            console.warn('⚠️  后端删除失败:', result.message)
          }
        })
        .catch(error => {
          console.error('❌ 后端删除失败', error)
        })
    } else {
      console.log('🗑️  删除对话（仅本地）:', id)
    }
  }).catch(() => {})
}

const openGroupModal = (group = null) => {
  groupModal.value = {
    visible: true,
    id: group?.id ?? null,
    name: group?.name ?? ''
  }
}

const saveGroup = () => {
  const { id, name } = groupModal.value
  if (!name.trim()) {
    ElMessage.warning('请输入类目名称')
    return
  }
  const now = new Date().toISOString()
  
  if (id) {
    const target = referenceGroups.value.find(g => g.id === id)
    if (target) {
      target.name = name.trim()
      target.updateTime = now
      target.needSync = true
    }
  } else {
    referenceGroups.value.unshift({ 
      id: Date.now(), 
      name: name.trim(), 
      selected: false,
      collapsed: true,  // 默认折叠
      items: [],
      createTime: now,
      updateTime: now,
      needSync: true
    })
  }
  groupModal.value.visible = false
}

const confirmDeleteGroup = (group) => {
  ElMessageBox.confirm(`删除类目「${group.name}」及其所有文案？`, '提示', {
    confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
  }).then(() => {
    referenceGroups.value = referenceGroups.value.filter(g => g.id !== group.id)
  }).catch(() => {})
}

const openItemModal = (group, item = null) => {
  itemModal.value = {
    visible: true,
    groupId: group.id,
    id: item?.id ?? null,
    content: item?.content ?? ''
  }
}

const saveItem = () => {
  const { groupId, id, content } = itemModal.value
  const group = referenceGroups.value.find(g => g.id === groupId)
  if (!group) return
  if (!content.trim()) {
    ElMessage.warning('请输入文案内容')
    return
  }
  const now = new Date().toISOString()
  
  if (id) {
    const target = group.items.find(i => i.id === id)
    if (target) {
      target.content = content.trim()
      target.updateTime = now
    }
  } else {
    // 新建文案，使用内容前20字作为标题
    const title = content.trim().substring(0, 20)
    group.items.unshift({ 
      id: Date.now(), 
      title: title,
      content: content.trim(), 
      selected: true,
      createTime: now,
      updateTime: now
    })
    group.selected = group.items.every(i => i.selected)
  }
  
  group.updateTime = now
  group.needSync = true
  itemModal.value.visible = false
}

const removeItem = (group, item) => {
  group.items = group.items.filter(i => i.id !== item.id)
  group.updateTime = new Date().toISOString()
  group.needSync = true
  syncGroup(group)
}

const toggleGroup = (group) => {
  group.items.forEach(item => item.selected = group.selected)
}

const syncGroup = (group) => {
  group.selected = group.items.length > 0 && group.items.every(item => item.selected)
}

const appendConversation = () => {
  if (messages.value.length === 0) return
  
  // 获取标题：使用用户的第一条消息，最多8个字
  let title = '新对话'
  const firstUserMessage = messages.value.find(m => m.role === 'user')
  if (firstUserMessage) {
    title = firstUserMessage.content.slice(0, 8) || '新对话'
  }
  
  const now = new Date().toISOString()
  
  if (currentConversationId.value) {
    const conv = conversations.value.find(c => c.id === currentConversationId.value)
    if (conv) {
      conv.title = title
      conv.messages = [...messages.value]
      conv.updateTime = now
      conv.needSync = true
      console.log('💾 更新对话:', { id: conv.id, title: conv.title, 消息数: conv.messages.length })
    }
  } else {
    const newConv = {
      id: Date.now(), // 本地临时ID（时间戳）
      title,
      messages: [...messages.value],
      createTime: now,
      updateTime: now,
      needSync: true
    }
    conversations.value.unshift(newConv)
    currentConversationId.value = newConv.id
    console.log('💾 创建新对话:', { id: newConv.id, title: newConv.title, 消息数: newConv.messages.length })
  }
  
  // 立即触发保存当前对话到服务器（防抖2秒）
  debouncedSaveCurrentConversation()
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isGenerating.value) return
  if (!apiKey.value) {
    ElMessage.warning('请先配置 API Key')
    showApiKeyModal.value = true
    return
  }
  
  messages.value.push({ role: 'user', content: userInput.value.trim() })
  userInput.value = ''
  nextTick(() => autoResizeTextarea())
  isGenerating.value = true
  
  // 添加一个临时的 AI 消息用于流式输出
  const assistantMsgIndex = messages.value.length
  messages.value.push({ 
    role: 'assistant', 
    content: '', 
    reasoning: '',
    reasoningTime: null,
    showReasoning: true,
    autoCollapseWhenDone: true,
    useReasoning: deepReasoning.value,
    isStreaming: true 
  })
  
  const reasoningStartTime = Date.now()
  nextTick(() => scrollToBottom(true))

  const refs = selectedReferenceItems.value
  
  const contextMessages = [...messages.value.slice(0, -1).slice(-8)]
  
  // 构建系统提示词
  let systemPrompt = ''
  
  // 1. 如果选择了角色，使用角色的prompt
  if (selectedRole.value && selectedRole.value.prompt) {
    systemPrompt = selectedRole.value.prompt
  }
  
  // 2. 如果选择了参考文案，添加参考文案内容
  if (refs.length > 0) {
    const referencesText = `\n\n参考以下文案：\n\n${refs.map((item, idx) => `${idx + 1}. ${item.content}`).join('\n\n')}\n\n生成时保持语气一致并给出创新点。`
    systemPrompt = systemPrompt ? systemPrompt + referencesText : `你是专业的中文文案助手。${referencesText}`
  }
  
  // 3. 添加系统提示词到上下文
  if (systemPrompt) {
    contextMessages.unshift({ role: 'system', content: systemPrompt })
  }

  const payload = {
    model: deepReasoning.value ? 'deepseek-reasoner' : 'deepseek-chat',
    messages: contextMessages,
    temperature: deepReasoning.value ? 0.5 : 0.7,
    max_tokens: deepReasoning.value ? 4096 : 2048,
    stream: true
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || '生成失败')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulatedContent = ''
    let accumulatedReasoning = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(line => line.trim() !== '')

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue

        const data = line.slice(6)
        if (data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data)
          const choice = parsed.choices?.[0]
          if (!choice) continue

          const assistantMessage = messages.value[assistantMsgIndex]
          if (!assistantMessage) continue

          const delta = choice.delta || {}

          const deltaReasoning = extractReasoningText(delta.reasoning_content ?? delta.reasoning ?? delta.thoughts)
          if (deltaReasoning) {
            accumulatedReasoning += deltaReasoning
            assistantMessage.reasoning = accumulatedReasoning
            nextTick(() => scrollToBottom())
          }

          const deltaContent = delta.content || ''
          if (deltaContent) {
            accumulatedContent += deltaContent
            assistantMessage.content = accumulatedContent
            
            // 正文开始输出时，立即折叠思考过程
            if (assistantMessage.autoCollapseWhenDone && assistantMessage.reasoning && assistantMessage.showReasoning) {
              assistantMessage.showReasoning = false
              if (!assistantMessage.reasoningTime) {
                assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
              }
            }
            
            nextTick(() => scrollToBottom())
          }

          const message = choice.message || {}

          const messageReasoning = extractReasoningText(message.reasoning ?? message.reasoning_content)
          if (messageReasoning) {
            accumulatedReasoning = messageReasoning
            assistantMessage.reasoning = accumulatedReasoning
            nextTick(() => scrollToBottom())
          }

          const messageContent = message.content || ''
          if (messageContent) {
            accumulatedContent = messageContent
            assistantMessage.content = accumulatedContent
            
            // 正文开始输出时，立即折叠思考过程
            if (assistantMessage.autoCollapseWhenDone && assistantMessage.reasoning && assistantMessage.showReasoning) {
              assistantMessage.showReasoning = false
              if (!assistantMessage.reasoningTime) {
                assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
              }
            }
            
            nextTick(() => scrollToBottom())
          }
        } catch (e) {
          console.error('解析流式数据失败', e)
        }
      }
    }

    const assistantMessage = messages.value[assistantMsgIndex]
    if (assistantMessage) {
      assistantMessage.isStreaming = false

      if (accumulatedReasoning && !assistantMessage.reasoningTime) {
        assistantMessage.reasoning = accumulatedReasoning
        assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
      }

      if (!assistantMessage.content && accumulatedContent) {
        assistantMessage.content = accumulatedContent
      }
    }
    
    appendConversation()
    nextTick(() => scrollToBottom(true))
  } catch (error) {
    console.error('生成失败', error)
    ElMessage.error(error.message || '生成失败，请检查 API Key')
    messages.value.splice(assistantMsgIndex, 1)
    messages.value.pop() // 移除用户消息
  } finally {
    isGenerating.value = false
  }
}

const scrollToBottom = (force = false) => {
  if (!chatContainer.value) return
  
  // 检查用户是否在底部附近（距离底部小于100px）
  const container = chatContainer.value
  const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
  
  // 只有用户在底部或强制滚动时才自动滚动
  if (force || isNearBottom) {
    container.scrollTop = container.scrollHeight
  }
}

const enableEdit = (message, index) => {
  message.editing = true
  message.editContent = message.content
  message.editIndex = index
}

const cancelEdit = (message) => {
  message.editing = false
  message.editContent = ''
  message.editIndex = null
}

const resendMessage = async (index) => {
  const message = messages.value[index]
  
  // 更新消息内容
  message.content = message.editContent
  message.editing = false
  
  // 删除该消息之后的所有消息（实现上下文跳跃）
  messages.value = messages.value.slice(0, index + 1)
  
  // 使用编辑后的内容重新发送（不放入 userInput，直接构建上下文）
  isGenerating.value = true
  
  // 添加一个临时的 AI 消息占位
    const assistantMsgIndex = messages.value.length
    const reasoningStartTime = Date.now()
    messages.value.push({
      role: 'assistant',
      content: '',
      reasoning: '',
      reasoningTime: null,
      showReasoning: true,
      autoCollapseWhenDone: true,
      useReasoning: deepReasoning.value,
      isStreaming: true
    })
  
  nextTick(() => scrollToBottom(true))
  
  try {
    const refs = selectedReferenceItems.value
    
    const contextMessages = [...messages.value.slice(0, -1).slice(-8)]
    
    // 只有选择了参考文案时才添加系统提示词
    if (refs.length > 0) {
      const systemPrompt = `你是专业的中文文案助手。参考以下文案：\n\n${refs.map((item, idx) => `${idx + 1}. ${item.title}\n${item.content}`).join('\n\n')}\n\n生成时保持语气一致并给出创新点。`
      contextMessages.unshift({ role: 'system', content: systemPrompt })
    }

    const payload = {
      model: deepReasoning.value ? 'deepseek-reasoner' : 'deepseek-chat',
      messages: contextMessages,
      temperature: deepReasoning.value ? 0.5 : 0.7,
      max_tokens: deepReasoning.value ? 4096 : 2048,
      stream: true
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || '生成失败')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulatedContent = ''
    let accumulatedReasoning = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(line => line.trim() !== '')

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue

        const data = line.slice(6)
        if (data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data)
          const choice = parsed.choices?.[0]
          if (!choice) continue

          const assistantMessage = messages.value[assistantMsgIndex]
          if (!assistantMessage) continue

          const delta = choice.delta || {}

          const deltaReasoning = extractReasoningText(delta.reasoning_content ?? delta.reasoning ?? delta.thoughts)
          if (deltaReasoning) {
            accumulatedReasoning += deltaReasoning
            assistantMessage.reasoning = accumulatedReasoning
            nextTick(() => scrollToBottom())
          }

          const deltaContent = delta.content || ''
          if (deltaContent) {
            accumulatedContent += deltaContent
            assistantMessage.content = accumulatedContent
            
            // 正文开始输出时，立即折叠思考过程
            if (assistantMessage.autoCollapseWhenDone && assistantMessage.reasoning && assistantMessage.showReasoning) {
              assistantMessage.showReasoning = false
              if (!assistantMessage.reasoningTime) {
                assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
              }
            }
            
            nextTick(() => scrollToBottom())
          }

          const message = choice.message || {}

          const messageReasoning = extractReasoningText(message.reasoning ?? message.reasoning_content)
          if (messageReasoning) {
            accumulatedReasoning = messageReasoning
            assistantMessage.reasoning = accumulatedReasoning
            nextTick(() => scrollToBottom())
          }

          const messageContent = message.content || ''
          if (messageContent) {
            accumulatedContent = messageContent
            assistantMessage.content = accumulatedContent
            
            // 正文开始输出时，立即折叠思考过程
            if (assistantMessage.autoCollapseWhenDone && assistantMessage.reasoning && assistantMessage.showReasoning) {
              assistantMessage.showReasoning = false
              if (!assistantMessage.reasoningTime) {
                assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
              }
            }
            
            nextTick(() => scrollToBottom())
          }
        } catch (e) {
          console.error('解析流式数据失败', e)
        }
      }
    }

    const assistantMessage = messages.value[assistantMsgIndex]
    if (assistantMessage) {
      assistantMessage.isStreaming = false

      if (accumulatedReasoning && !assistantMessage.reasoningTime) {
        assistantMessage.reasoning = accumulatedReasoning
        assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
      }

      if (!assistantMessage.content && accumulatedContent) {
        assistantMessage.content = accumulatedContent
      }
    }
    
    appendConversation()
    nextTick(() => scrollToBottom(true))
  } catch (error) {
    console.error('生成失败', error)
    ElMessage.error(error.message || '生成失败')
    messages.value.splice(assistantMsgIndex, 1)
  } finally {
    isGenerating.value = false
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      ElMessage.success('复制成功')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
}

const renderMarkdown = (content) => {
  if (!content) return ''
  return marked(content)
}

const autoResizeTextarea = () => {
  const textarea = textareaRef.value
  if (!textarea) return
  
  // 重置高度以获取正确的 scrollHeight
  textarea.style.height = 'auto'
  
  // 设置新高度（最小1行，最大约6行，120px）
  const newHeight = Math.min(textarea.scrollHeight, 120)
  textarea.style.height = `${newHeight}px`
}

const detectLanguage = (text) => {
  // 简单的中文检测（包含中文字符）
  const chineseRegex = /[\u4e00-\u9fa5]/
  return chineseRegex.test(text) ? 'zh' : 'other'
}

const translateUserInput = async () => {
  if (!userInput.value.trim() || !apiKey.value || isTranslating.value) {
    return
  }

  const originalText = userInput.value.trim()
  const detectedLang = detectLanguage(originalText)
  
  isTranslating.value = true
  
  try {
    // 构建翻译提示词
    let translatePrompt = ''
    if (detectedLang === 'zh') {
      translatePrompt = '请将以下中文翻译成英文，只输出译文，不要解释：\n\n' + originalText
    } else {
      translatePrompt = '请将以下文本翻译成中文，只输出译文，不要解释：\n\n' + originalText
    }
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: translatePrompt }],
        temperature: 0.3,
        max_tokens: 2000,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || '翻译失败')
    }

    const data = await response.json()
    const translatedText = data.choices?.[0]?.message?.content?.trim()
    
    if (translatedText) {
      userInput.value = translatedText
      nextTick(() => autoResizeTextarea())
      ElMessage.success(detectedLang === 'zh' ? '已翻译为英文' : '已翻译为中文')
    } else {
      throw new Error('未获取到翻译结果')
    }
  } catch (error) {
    console.error('❌ 翻译失败', error)
    ElMessage.error(error.message || '翻译失败，请重试')
  } finally {
    isTranslating.value = false
  }
}

const regenerateMessage = async (index) => {
  // 找到这条 AI 消息对应的用户消息
  if (index === 0) return
  
  // 删除这条 AI 消息及之后的所有消息
  messages.value = messages.value.slice(0, index)
  
  // 重新生成
  isGenerating.value = true
  
  // 添加一个新的 AI 消息占位
  const assistantMsgIndex = messages.value.length
  const reasoningStartTime = Date.now()
  messages.value.push({ 
    role: 'assistant', 
    content: '', 
    reasoning: '',
    reasoningTime: null,
    showReasoning: true,
    autoCollapseWhenDone: true,
    useReasoning: deepReasoning.value,
    isStreaming: true 
  })
  
  nextTick(() => scrollToBottom(true))
  
  try {
    const refs = selectedReferenceItems.value
    
    const contextMessages = [...messages.value.slice(0, -1).slice(-8)]
    
    // 只有选择了参考文案时才添加系统提示词
    if (refs.length > 0) {
      const systemPrompt = `你是专业的中文文案助手。参考以下文案：\n\n${refs.map((item, idx) => `${idx + 1}. ${item.title}\n${item.content}`).join('\n\n')}\n\n生成时保持语气一致并给出创新点。`
      contextMessages.unshift({ role: 'system', content: systemPrompt })
    }

    const payload = {
      model: deepReasoning.value ? 'deepseek-reasoner' : 'deepseek-chat',
      messages: contextMessages,
      temperature: deepReasoning.value ? 0.5 : 0.7,
      max_tokens: deepReasoning.value ? 4096 : 2048,
      stream: true
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || '生成失败')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulatedContent = ''
    let accumulatedReasoning = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(line => line.trim() !== '')

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue

        const data = line.slice(6)
        if (data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data)
          const choice = parsed.choices?.[0]
          if (!choice) continue

          const assistantMessage = messages.value[assistantMsgIndex]
          if (!assistantMessage) continue

          const delta = choice.delta || {}

          const deltaReasoning = extractReasoningText(delta.reasoning_content ?? delta.reasoning ?? delta.thoughts)
          if (deltaReasoning) {
            accumulatedReasoning += deltaReasoning
            assistantMessage.reasoning = accumulatedReasoning
            nextTick(() => scrollToBottom())
          }

          const deltaContent = delta.content || ''
          if (deltaContent) {
            accumulatedContent += deltaContent
            assistantMessage.content = accumulatedContent
            
            // 正文开始输出时，立即折叠思考过程
            if (assistantMessage.autoCollapseWhenDone && assistantMessage.reasoning && assistantMessage.showReasoning) {
              assistantMessage.showReasoning = false
              if (!assistantMessage.reasoningTime) {
                assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
              }
            }
            
            nextTick(() => scrollToBottom())
          }

          const message = choice.message || {}

          const messageReasoning = extractReasoningText(message.reasoning ?? message.reasoning_content)
          if (messageReasoning) {
            accumulatedReasoning = messageReasoning
            assistantMessage.reasoning = accumulatedReasoning
            nextTick(() => scrollToBottom())
          }

          const messageContent = message.content || ''
          if (messageContent) {
            accumulatedContent = messageContent
            assistantMessage.content = accumulatedContent
            
            // 正文开始输出时，立即折叠思考过程
            if (assistantMessage.autoCollapseWhenDone && assistantMessage.reasoning && assistantMessage.showReasoning) {
              assistantMessage.showReasoning = false
              if (!assistantMessage.reasoningTime) {
                assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
              }
            }
            
            nextTick(() => scrollToBottom())
          }
        } catch (e) {
          console.error('解析流式数据失败', e)
        }
      }
    }

    const assistantMessage = messages.value[assistantMsgIndex]
    if (assistantMessage) {
      assistantMessage.isStreaming = false

      if (accumulatedReasoning && !assistantMessage.reasoningTime) {
        assistantMessage.reasoning = accumulatedReasoning
        assistantMessage.reasoningTime = Math.max(1, Math.round((Date.now() - reasoningStartTime) / 1000))
      }

      if (!assistantMessage.content && accumulatedContent) {
        assistantMessage.content = accumulatedContent
      }
    }
    
    appendConversation()
    nextTick(() => scrollToBottom(true))
  } catch (error) {
    console.error('生成失败', error)
    ElMessage.error(error.message || '生成失败')
    messages.value.splice(assistantMsgIndex, 1)
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
/* 性能优化的滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* 使用 GPU 加速 */
.custom-scrollbar {
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch;
}

/* Element Plus 样式优化 */
:deep(.el-drawer) {
  @apply rounded-l-2xl;
}

:deep(.el-dialog) {
  @apply dark:bg-dark-card dark:border dark:border-dark-border rounded-2xl;
}

:deep(.el-dialog__header) {
  @apply dark:border-dark-border border-b;
}

:deep(.el-dialog__title) {
  @apply dark:text-slate-200 font-semibold;
}

:deep(.el-input__wrapper) {
  @apply dark:bg-dark-card2 dark:border-dark-border rounded-xl;
}

:deep(.el-textarea__inner) {
  @apply dark:bg-dark-card2 dark:border-dark-border dark:text-slate-200 rounded-xl;
}

:deep(.el-button) {
  @apply rounded-lg;
}

:deep(.el-button--primary) {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 border-0;
}

/* 跳动动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Markdown 内容样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  @apply font-bold mt-4 mb-2;
}

.markdown-content :deep(h1) {
  @apply text-lg;
}

.markdown-content :deep(h2) {
  @apply text-base;
}

.markdown-content :deep(h3) {
  @apply text-sm;
}

.markdown-content :deep(p) {
  @apply my-2;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  @apply my-2 ml-4;
}

.markdown-content :deep(li) {
  @apply my-1;
}

.markdown-content :deep(code) {
  @apply px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono;
}

.markdown-content :deep(pre) {
  @apply my-3 p-3 bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-lg overflow-x-auto;
}

.markdown-content :deep(pre code) {
  @apply bg-transparent p-0 text-xs;
}

.markdown-content :deep(blockquote) {
  @apply border-l-4 border-slate-300 dark:border-slate-600 pl-3 my-2 text-slate-600 dark:text-slate-400 italic;
}

.markdown-content :deep(strong) {
  @apply font-bold;
}

.markdown-content :deep(em) {
  @apply italic;
}

.markdown-content :deep(a) {
  @apply text-blue-600 dark:text-blue-400 underline hover:text-blue-700;
}

.markdown-content :deep(table) {
  @apply w-full my-3 border-collapse;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  @apply border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-xs;
}

.markdown-content :deep(th) {
  @apply bg-slate-100 dark:bg-slate-800 font-semibold;
}

.markdown-content :deep(hr) {
  @apply my-4 border-slate-200 dark:border-slate-700;
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 
