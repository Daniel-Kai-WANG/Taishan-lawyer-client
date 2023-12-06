<template>
  <!-- <div class="member-carousel">
    <Carousel
      ref="myCarousel"
      :modelValue="current"
      @update:modelValue="(val: number) => emit('update:current', val)"
      :itemsToShow="2"
      :wrapAround="true"
      :navigationEnabled="false"
      :paginationEnabled="false"
      snapAlign="start"
      class="carousel-item"
    >
      <Slide v-for="member in members" :key="member.id">
        <div class="image-box">
          <img :src="member.avatar" class="member-avatar" />
          <div class="avatar-background"></div>
        </div>
      </Slide>
    </Carousel>
    <div class="member-buttons">
      <button class="member-btn" @click="() => myCarousel.prev()">
        <SvgIcon name="left-arrow" style="height: 1.875rem; width: 1.875rem" />
      </button>
      <button class="member-btn" @click="() => myCarousel.next()">
        <SvgIcon name="right-arrow" style="height: 1.875rem; width: 1.875rem" />
      </button>
    </div>
  </div> -->
  <div class="image-box">
    <img :src="member.avatar" class="member-avatar" />
    <div class="avatar-background"></div>
  </div>
</template>

<script setup lang="ts">
import { Member } from '@/typings'
// import { Carousel, Slide } from 'vue3-carousel'
// import { ref } from 'vue'
// import SvgIcon from '@/components/SvgIcon.vue'
// import 'vue3-carousel/dist/carousel.css'

defineProps<{
  // current: number
  // members: Member[]
  member: Member
}>()

// const emit = defineEmits<{
//   (e: 'update:current', val: number): void
// }>()
// const myCarousel = ref<any>(null)
</script>

<style lang="scss" scoped>
.member-carousel {
  display: flex;
  flex-direction: column;
  flex: 0.8;
  width: 26rem;
  height: 28.5rem;
  padding-left: 6.25rem;
  justify-content: center;
  background-color: transparent;
  .carousel__slide {
    transform: scale(0.8);
    transition: all;
    // padding: 5px;
  }

  .carousel__viewport {
    perspective: 2000px;
  }

  .carousel__track {
    transform-style: preserve-3d;
  }

  .carousel__slide--sliding {
    transition: 5s;
  }

  .carousel__slide {
    opacity: 0.9;
    // transform: rotateY(-20deg);
  }

  .carousel__slide--active ~ .carousel__slide {
  }

  .carousel__slide--prev {
    opacity: 0;
    // transform: translateX(-8rem) scale(0.8);
  }

  .carousel__slide--next {
    opacity: 1;
    transform: translate(-13rem, 1rem) scale(0.8);
  }

  .carousel__slide--active {
    opacity: 1;
    z-index: 3;
    // transform: translate(2rem, 3.5rem) scale(0.8);
    // transform: rotateY(0);
  }
  .image-box {
    width: 100%;
    height: 28.5rem;

    .member-avatar {
      width: 22rem;
      height: 25.5rem;
      border-radius: 0.75rem;
    }

    .avatar-background {
      width: 22rem;
      height: 25.5rem;
      border-radius: 0.75rem;
      background-color: var(--secondary-color);
    }
  }

  .member-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 3.6rem;
    height: 2.5rem;
    margin-bottom: 2rem;
    margin-left: 18rem;
    justify-content: space-between;

    .member-btn {
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid var(--secondary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
