<template>
  <div v-if="dialogVisible" class="announcement-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="网站公告"
      width="900px"
      center
      :before-close="handleClose"
      class="announcement-dialog"
    >
      <div class="announcement-content" v-html="sanitizedAnnouncement"></div>
      <div class="announcement-footer flex justify-between items-center mt-4">
        <el-checkbox v-model="dontShowToday" class="text-gray-600">今日不再提示</el-checkbox>
        <el-button type="primary" @click="handleClose" class="bg-gradient-to-r from-indigo-600 to-purple-600">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DOMPurify from 'dompurify';

const props = defineProps({
  announcement: {
    type: String,
    required: true
  },
  enableAnnouncement: {
    type: Boolean,
    default: true
  },
  subsiteId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['close']);

const dialogVisible = ref(false);
const dontShowToday = ref(false);

// 净化HTML内容，防止XSS攻击
const sanitizedAnnouncement = computed(() => {
  if (!props.announcement) return '';
  return DOMPurify.sanitize(props.announcement);
});

// 关闭弹窗
const handleClose = () => {
  dialogVisible.value = false;
  if (dontShowToday.value) {
    // 如果勾选了"今日不再提示"，则在本地存储中设置标志
    const today = new Date().toISOString().split('T')[0]; // 获取当前日期，格式如 YYYY-MM-DD
    const storageKey = `dontShowAnnouncement_${props.subsiteId}_${today}`;
    localStorage.setItem(storageKey, 'true');
  }
  emit('close');
};

// 显示对话框
const showDialog = () => {
  console.log('showDialog called', {
    enableAnnouncement: props.enableAnnouncement,
    announcement: props.announcement,
    subsiteId: props.subsiteId
  });
  
  if (!props.enableAnnouncement || !props.announcement) {
    console.log('公告未启用或内容为空，不显示公告');
    return;
  }
  
  // 检查是否设置了"今日不再提示"
  const today = new Date().toISOString().split('T')[0];
  const storageKey = `dontShowAnnouncement_${props.subsiteId}_${today}`;
  const dontShow = localStorage.getItem(storageKey) === 'true';
  
  if (!dontShow) {
    console.log('显示公告弹窗');
    dialogVisible.value = true;
  } else {
    console.log('用户今日已选择不再显示公告');
  }
};

// 暴露方法给父组件
defineExpose({
  showDialog
});
</script>

<style scoped>
.announcement-content {
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
  line-height: 1.6;
}

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
