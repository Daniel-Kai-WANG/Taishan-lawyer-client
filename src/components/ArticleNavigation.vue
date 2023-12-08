<template>
  <div class="article-navigation">
    <button v-if="prevId" @click="goToPrev" class="nav-btn left h5-style">{{ props.prevName }}</button>
    <button v-if="nextId" @click="goToNext" class="nav-btn right h5-style">{{ props.nextName }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  prevId?: number
  nextId?: number
  prevName: string
  nextName: string
}>()

const emits = defineEmits(['navigate'])

const goToPrev = () => {
  emits('navigate', props.prevId)
}

const goToNext = () => {
  emits('navigate', props.nextId)
}
</script>

<style lang="scss" scoped>
.article-navigation {
  display: flex;
  position: relative;
  margin-top: 2rem;
  margin-left: 1rem;
  width: 40rem;
  gap: 24rem;
  .nav-btn {
    position: absolute;
    margin: 3rem 0;
    max-width: 8rem;
    background-color: transparent;
    color: var(--text-color);
    border: none;
    cursor: pointer;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }
}

@media (max-width: 768px) {
  .article-navigation {
    width: 20rem;
    margin-left: 0;

    .nav-btn {
      margin-top: -5rem;
    }
  }
}
</style>
