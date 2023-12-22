<script setup lang="ts">
import './assets/global.scss'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import BackToTop from './components/icons/BackToTop.vue'
import SearchModal from './components/SearchModal.vue'
</script>

<template>
  <nav-bar />
  <router-view :key="$route.fullPath" />
  <footer-section />
  <back-to-top />
  <search-modal />
</template>

<style scoped></style>
