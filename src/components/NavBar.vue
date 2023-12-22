<template>
  <nav class="nav-bar">
    <div class="company-logo">
      <img src="https://i.imgs.ovh/2023/11/24/Mofgs.png" />
    </div>
    <ul class="nav-menu" :class="{ 'mobile-mode': isMenuOpen }">
      <li class="nav-menu-item link-text-style" @click="toggleMenu">
        <router-link to="/" :class="{ 'is-active': route.path === '/' }" @click.prevent="forceReload('/')"
          >首页</router-link
        >
      </li>
      <li class="nav-menu-item link-text-style" @click="toggleMenu">
        <router-link
          to="/news"
          :class="{ 'is-active': route.path === '/news/list' }"
          @click.prevent="forceReload('/news')"
          >以案说法</router-link
        >
      </li>
      <li class="nav-menu-item link-text-style" @click="toggleMenu">
        <router-link to="/case" :class="{ 'is-active': route.path === '/case' }" @click.prevent="forceReload('/case')"
          >法律课堂</router-link
        >
      </li>
      <li class="nav-menu-item link-text-style" @click="toggleMenu">
        <router-link to="/team" :class="{ 'is-active': route.path === '/team' }" @click.prevent="forceReload('/team')"
          >专业团队</router-link
        >
      </li>
      <li class="nav-menu-item link-text-style" @click="toggleMenu">
        <router-link
          to="/contact"
          :class="{ 'is-active': route.path === '/contact' }"
          @click.prevent="forceReload('/contact')"
          >法律咨询</router-link
        >
      </li>
    </ul>
    <div class="nav-options">
      <search-bar class="search-bar" @search="handleSearch" />
      <font-awesome-icon class="search-modal-btn" :icon="['fas', 'magnifying-glass']" beat @click="handleModal" />
      <Language />
    </div>
    <button class="menu-icon" @click="toggleMenu">
      <template v-if="!isMenuOpen">
        <SvgIcon name="menu-open" />
      </template>
      <template v-else>
        <SvgIcon name="menu-close" />
      </template>
    </button>
  </nav>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue'
import Language from './Language.vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useSearchStore } from '@/store/search'
import SvgIcon from './SvgIcon.vue'

const isMobile = ref(window.innerWidth <= 768)

const updateMobileStatus = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  window.addEventListener('resize', updateMobileStatus)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobileStatus)
})

const router = useRouter()
const route = useRoute()
const forceReload = (path: string) => {
  if (route.path === path) {
    window.location.href = path
  } else {
    router.push(path)
  }
}

const searchStore = useSearchStore()
const handleModal = () => {
  searchStore.changeSearch(true)
}
const handleSearch = (val?: string) => {
  if (val) {
    router.push({ name: 'SearchResult', query: { keyword: val } })
  }
}

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem;
  height: 5rem;
  background-color: var(--nav-background);
  color: var(--photo-background);
  box-sizing: border-box;

  .company-logo {
    margin-left: 5.0625rem;

    img {
      width: 210px;
      height: 55px;
    }
  }

  .menu-icon {
    display: none;
    cursor: pointer;
    // background: none;
    // border: none;
    padding: 0;
  }
  .nav-menu {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    gap: 3rem;

    &-item {
      a {
        text-decoration: none;
        color: var(--photo-background);
        position: relative;

        &:hover {
          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.3125rem;
            width: 100%;
            height: 0.125rem;
            background-color: var(--photo-background);
          }
        }

        &.is-active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.3125rem;
          width: 100%;
          height: 0.125rem;
          background-color: var(--light-text-color);
        }
      }
    }
  }

  .nav-options {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-left: 2.9375rem;
    .search-bar {
      display: block;
    }
    .search-modal-btn {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .nav-bar {
    position: relative;
    padding: 0;

    .company-logo {
      margin-left: -1rem;
      scale: 0.65;
      flex: 1;
      img {
        width: auto;
      }
    }

    .nav-options {
      gap: 0.5rem;
      margin-right: 1rem;

      .search-bar {
        display: none;
      }
      .search-modal-btn {
        display: block;
      }
    }
    .menu-icon {
      display: block;
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 0.5rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    .nav-menu {
      display: none;

      &.mobile-mode {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 5rem;
        left: 0;
        background-color: var(--nav-background);
        z-index: 100;
        margin-bottom: 344px;
      }

      &-item {
        width: 100%;
        text-align: center;

        &:last-child {
          padding-bottom: 1.5rem;
        }
      }
    }

    .nav-menu[style*='display: none;'] {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
