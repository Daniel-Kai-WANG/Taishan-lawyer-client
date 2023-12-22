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
  height: auto;
  background-color: var(--photo-background);
  margin: 0 auto;
  margin-bottom: 10rem;

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
