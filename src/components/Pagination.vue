<template>
  <div class="pagination">
    <el-pagination
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    pageSize?: number
    total: number
  }>(),
  {
    pageSize: 10,
  },
)

const emits = defineEmits(['update:page'])
const currentPage = ref(1)
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage
  emits('update:page', newPage)
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 5rem 0;

  :deep(.el-pagination) {
    .btn-prev,
    .btn-next {
      cursor: pointer;
      color: var(--secondary-color);

      .el-icon {
        font-size: 2rem;
      }
    }

    .el-pager {
      padding: 0 0.625rem;
      gap: 1rem;
      li {
        width: 2.9375rem;
        height: 2.9375rem;
        cursor: pointer;
        color: var(--secondary-color);
        font-family: Martel;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2rem; /* 133.333% */
        letter-spacing: 0.00625rem;
        padding: 0.8rem;

        &.is-active {
          background-color: var(--secondary-color);
          border-radius: 50%;
          color: var(--photo-background);
        }
      }
    }
  }
}
</style>
