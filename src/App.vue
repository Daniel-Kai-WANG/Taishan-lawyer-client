<script setup lang="ts">
import './assets/global.scss'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import BackToTop from './components/icons/BackToTop.vue'
</script>

<template>
  <nav-bar />
  <router-view />
  <footer-section />
  <back-to-top />
</template>

<style scoped></style>
