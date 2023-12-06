<template>
  <div class="search-container" :class="{ active: searchActive }">
    <font-awesome-icon
      class="search-icon"
      :icon="['fas', 'magnifying-glass']"
      beat
      @click="() => (searchActive = true)"
    />
    <input
      class="search-input"
      type="text"
      ref="searchInput"
      @keydown.enter="handleReturn"
      v-model="searchValue"
      v-click-away="() => (searchActive = false)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)

const searchInput = ref<HTMLInputElement | null>(null)
const searchActive = ref(false)
const searchValue = ref<string>()

watch(searchActive, (newValue) => {
  if (newValue) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

const emit = defineEmits<{
  (e: 'search', val?: string): void
}>()

const handleReturn = () => {
  // console.log('success!!', event)
  emit('search', searchValue.value)
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 0.625rem;

  .search-icon {
    font-size: 1rem;
    cursor: pointer;
    right: 1rem;
    z-index: 2;
  }

  .search-input {
    width: 0;
    padding: 0;
    transition: all 0.5s ease;
    height: 2rem;
    border: none;
    background-color: transparent;
    right: 4rem;
    opacity: 0;
    z-index: 1;
    caret-color: var(--light-text-color);
    font-weight: bold;
    color: var(--light-text-color);

    &:focus {
      outline: none;
    }
  }

  &.active {
    border-bottom: 2px solid var(--light-text-color);
    .search-input {
      width: 10rem;
      opacity: 1;
    }
  }
}
</style>
