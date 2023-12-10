<template>
  <div class="search-container" :style="{ display: searchStore.search ? 'block' : 'none' }">
    <div class="search-overlay">
      <div class="search-modal">
        <div class="search-box">
          <font-awesome-icon
            class="search-inside-icon"
            :icon="['fas', 'magnifying-glass']"
            beat
            @click="performSearch"
          />
          <input
            class="search-input"
            type="text"
            autofocus
            @keydown.enter="performSearch"
            v-model="searchValue"
            ref="searchInput"
          />
        </div>
        <button class="search-cancel h5-style" @click="toggleModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useSearchStore } from '@/store/search'
import { useRouter } from 'vue-router'

library.add(faMagnifyingGlass)

const searchStore = useSearchStore()
const searchValue = ref('')
const router = useRouter()
const searchInput = ref<HTMLInputElement | null>(null)

const performSearch = () => {
  const trimmedValue = searchValue.value.trim()
  if (trimmedValue) {
    searchStore.changeSearch(false)
    router.push({ name: 'SearchResult', query: { keyword: trimmedValue } })
  }
}

const toggleModal = () => {
  searchStore.changeSearch(false)
}

watch(
  () => searchStore.search,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        searchInput.value?.focus()
      })
    }
  },
)
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  position: fixed;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  .search-outside-icon {
    font-size: 1rem;
    cursor: pointer;
    z-index: 2;
  }

  .search-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);

    .search-modal {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 3.5rem;
      padding: 0.5rem;

      .search-box {
        display: flex;
        position: relative;
        flex: 1;
        flex-direction: row;
        border-radius: 0.25rem;
        border: 0.125rem solid var(--photo-background);

        .search-inside-icon {
          position: absolute;
          top: 35%;
          left: 5%;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          cursor: pointer;
          z-index: 999;
        }
        .search-input {
          flex: 1;
          height: 100%;
          width: 100%;
          background-color: transparent;
          z-index: 998;
          caret-color: var(--photo-background);
          font-weight: bold;
          color: var(--photo-background);
          padding-left: 3rem;
          border: none;
        }
      }

      .search-cancel {
        display: flex;
        width: 3rem;
        color: var(--photo-background);
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
