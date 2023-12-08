<template>
  <div class="news">
    <div class="news-container">
      <RouterView />
    </div>
    <div class="news-sidebar">
      <SideBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
</script>

<style lang="scss" scoped>
.news {
  display: flex;
  flex-direction: row;
  max-width: 70rem;
  min-height: 100rem;
  background-color: var(--photo-background);
  margin-bottom: 1.25rem;
  margin: 0 auto;

  &-container {
    display: flex;
    flex: 1;
  }

  &-sidebar {
    display: flex;
    flex-direction: column;
    width: 20.5rem;
  }
}

@media (max-width: 768px) {
  .news {
    flex-direction: column;
    align-items: center;

    &-sidebar {
      align-items: center;
      margin-top: -8rem;
      margin-bottom: 3rem;
    }
  }
}
</style>
