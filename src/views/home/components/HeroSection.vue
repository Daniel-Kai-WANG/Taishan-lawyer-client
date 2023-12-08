<template>
  <div
    class="hero"
    :style="{
      backgroundImage: 'url(https://i.imgs.ovh/2023/11/24/MomNX.png)',
    }"
  >
    <div class="hero-content">
      <h1 class="hero-slogan h1-style">法律援助<br />让公正无需高昂代价</h1>
      <el-button class="hero-button" type="primary" round @click="navigateToTeam">法律援助咨询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToTeam = () => {
  router.push('/team')
}
</script>

<style lang="scss" scoped>
.hero {
  background-size: cover;
  background-position: center 70%;
  background-repeat: no-repeat;
  display: flex;
  position: relative;
  width: 100%;
  height: 40rem;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);

  &-content {
    display: flex;
    flex-direction: column;
    width: 70rem;
    align-items: center;
    justify-content: center;
    gap: 5.625rem;
    z-index: 2;

    .hero-slogan {
      display: flex;
      text-align: center;
      color: var(--secondary-color);
    }

    .hero-button {
      display: flex;
      background-color: var(--secondary-color);
      border: 2px solid var(--secondary-color);
      padding: 1.4rem 2.25rem;
      border-radius: 2.25rem;
    }

    .hero-button:hover {
      background-color: var(--background-color);
      border: 2px solid var(--secondary-color);
      font-weight: 700;
      color: var(--secondary-color);
    }
  }
}

@media (max-width: 768px) {
  .hero {
    background-position: top center;
    background-size: auto 100%;
    height: 12rem;

    &-content {
      width: 12.2rem;
      gap: 0.7rem;
      z-index: unset;
      // position: relative;
      .hero-slogan {
        // position: absolute;
        // bottom: -0.5rem;
        font-family: Montserrat;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.875rem; /* 150% */
        letter-spacing: 0.0125rem;
      }

      .hero-button {
        // position: absolute;
        width: 7.25rem;
        // top: 1.2rem;
      }
    }
  }
}
</style>
