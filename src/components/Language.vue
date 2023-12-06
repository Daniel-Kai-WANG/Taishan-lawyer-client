<template>
  <div>
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        {{ displayLanguage }}<el-icon class="el-icon--right"><arrow-down-bold /></el-icon>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu class="language-menu">
          <el-dropdown-item class="language" command="cn">中文</el-dropdown-item>
          <el-dropdown-item class="language" command="en">EN</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '../store/language'
import { storeToRefs } from 'pinia'
import { ArrowDownBold } from '@element-plus/icons-vue'
// const dropdownOpen = ref(false);
const { language } = storeToRefs(useLanguageStore())
const store = useLanguageStore()

const handleCommand = (command: any) => {
  store.changeLanguage(command)
}

const displayLanguage = computed(() => {
  if (language.value === 'en') {
    return 'EN'
  }
  return '中文'
})
</script>

<style lang="scss" scoped>
.el-dropdown {
  position: relative;
  cursor: pointer;
  .el-button {
    background-color: transparent;
    border: 1px solid transparent;
    width: 4.6875rem;
  }
}

@media (max-width: 768px) {
  :deep(.el-dropdown) {
    max-width: 3.5rem;
    z-index: 1;

    .el-button {
      padding: 0;
    }
  }
}
</style>
