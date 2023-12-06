<template>
  <div class="search-container">
    <font-awesome-icon
      v-if="!searchActive"
      class="search-outside-icon"
      :icon="['fas', 'magnifying-glass']"
      beat
      @click="toggleModal"
    />
    <div v-if="searchActive" class="search-overlay">
      <div class="search-modal">
        <div class="search-box">
          <font-awesome-icon
            class="search-inside-icon"
            :icon="['fas', 'magnifying-glass']"
            beat
            @click="handleReturn"
          />
          <input class="search-input" type="text" autofocus @keydown.enter="handleReturn" v-model="searchValue" />
        </div>
        <button class="search-cancel" @click="toggleModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)

const searchValue = ref('')
const searchActive = ref(false)

const handleReturn = () => {
  searchActive.value = false
  console.log('Search:', searchValue.value)
}

const toggleModal = () => {
  searchActive.value = !searchActive.value
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;

  .search-outside-icon {
    font-size: 1rem;
    cursor: pointer;
    z-index: 2;
  }

  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    // align-items: center;
    backdrop-filter: blur(5px);
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
          left: 2%;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          cursor: pointer;
          z-index: 3;
        }
        .search-input {
          flex: 1;
          height: 100%;
          width: 100%;
          background-color: transparent;
          z-index: 2;
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
