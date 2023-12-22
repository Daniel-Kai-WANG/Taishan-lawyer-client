<template>
  <div class="team">
    <div class="team-container">
      <h2 class="team-title h2-style">专业团队</h2>
      <!-- <Carousel
        ref="carousel"
        :itemsToShow="1"
        :wrapAround="true"
        :autoplay="6000"
        :navigationEnabled="false"
        :paginationEnabled="false"
        :transition="1000"
        class="carousel-content"
      >
        <Slide v-for="member in members" :key="member.id">
          <router-link :to="`/team/member/${member.id}`" class="member-card">
            <div class="member-info">
              <img :src="member.avatar" alt="avatar" class="member-avatar" />
              <h3 class="member-title h3-style">{{ member.name }}</h3>
            </div>
            <div class="member-description">
              <h4 class="h4-style">{{ member.position }}</h4>
              <h4 class="h4-style">工作经历：{{ member.workExperience }}</h4>
              <h4 class="h4-style">服务领域：{{ member.fields }}</h4>
              <h4 class="h4-style">教育背景：{{ member.background }}</h4>
              <h4 class="h4-style">联系电话：{{ member.phoneNumber }}</h4>
            </div>
          </router-link>
        </Slide>
      </Carousel> -->
      <!-- <button class="navigation-button prev" @click="prev">
        <svg
          t="1700979712745"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="19398"
        >
          <path
            d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z"
            p-id="19399"
          ></path>
        </svg>
      </button>
      <button class="navigation-button next" @click="next">
        <svg
          t="1700115890066"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3255"
        >
          <path
            d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z"
            p-id="3256"
          ></path>
        </svg>
      </button> -->
      <router-link :to="`/team`" class="member-card">
        <div class="member-info">
          <img :src="member[0].avatar" alt="avatar" class="member-avatar" />
          <h3 class="member-title h3-style">{{ member[0].name }}</h3>
        </div>
        <div class="member-description">
          <h4 class="h4-style">泰杉公司{{ member[0].position }}</h4>
          <h4 class="h4-style">工作经历：{{ member[0].workExperience }}</h4>
          <h4 class="h4-style">服务领域：{{ member[0].fields }}</h4>
          <h4 class="h4-style">教育背景：{{ member[0].background }}</h4>
          <h4 class="h4-style">联系电话：{{ member[0].phoneNumber }}</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { reactive } from 'vue'
import members from '~/JSON/members.json'
// import { Carousel, Slide } from 'vue3-carousel'
// import 'vue3-carousel/dist/carousel.css'
// import { ApiResponse, Member } from '@/typings'
// import { useQuery } from '@tanstack/vue-query'
// import axios from 'axios'
// import { url } from 'inspector'

// const carousel = ref<typeof Carousel | null>(null)
// const prev = () => {
//   if (carousel.value) {
//     carousel.value.prev()
//   }
// }

// const next = () => {
//   if (carousel.value) {
//     carousel.value.next()
//   }
// }

// const { data: members } = useQuery({
//   queryKey: ['getMembers'],
//   queryFn: async () => {
//     const { data } = await axios.get<ApiResponse<Member[]>>('/api/getMembers')
//     return data.data
//   },
// })

const member = members['data']
</script>

<style lang="scss" scoped>
.team {
  width: 100%;
  height: 28rem;
  display: flex;
  background-color: var(--photo-background);
  justify-content: center;

  &-container {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 65.625rem;
    justify-content: center;
    align-items: center;

    .team-title {
      color: var(--secondary-color);
      text-align: center;
      margin-top: 4rem;
    }

    // .carousel-content {
    //   width: 90rem;
    // }

    .member-card {
      display: flex;
      flex-direction: row;
      width: 65.625rem;
      height: 22.0625rem;
      justify-content: space-between;
      text-decoration: none;
      padding-left: 8.5rem;

      .member-info {
        flex: 0.9;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 6rem;
        justify-content: center;
        .member-avatar {
          object-fit: cover;
          width: 11rem;
          height: 14rem;
          border-radius: 3.5rem;
          box-shadow: -20px -10px 25px 0px rgba(0, 0, 0, 0.3);
        }
        .member-title {
          color: var(--text-color);
          padding-left: 3.25rem;
          margin-top: 1rem;
        }
      }

      .member-description {
        flex: 1.1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-bottom: 2rem;

        h4 {
          display: flex;
          text-align: left;
          align-items: flex-start;
          width: 37rem;
          color: var(--text-color);
          font-size: 1.0625rem;
          margin-bottom: 0.75rem;
          overflow-wrap: break-word;
          word-break: break-word;
          white-space: normal;
        }
      }
    }

    .navigation-button {
      position: absolute;
      top: 56%;
      transform: translateY(-50%);
      background-color: transparent;
      border: 2px solid var(--secondary-color);
      border-radius: 50%;
      cursor: pointer;
      z-index: 10;

      &.prev {
        left: 0.5rem;
        padding-right: 0.125rem;
      }

      &.next {
        right: -5.5rem;
        padding-left: 0.125rem;
      }

      svg {
        width: 1.875rem;
        height: 1.875rem;
        padding: 0.625rem;
        fill: var(--secondary-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .team {
    height: auto;

    &-container {
      width: 22rem;

      .team-title {
        margin-top: 2rem;
        font-family: Martel;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2rem; /* 133.333% */
        letter-spacing: 0.00625rem;
      }

      .member-card {
        flex-direction: column;
        width: 100%;
        height: auto;
        justify-content: center;
        text-decoration: none;
        padding: 0;

        .member-info {
          flex: 1;
          align-items: center;
          padding: 0;
          margin-top: 2rem;
          .member-avatar {
            object-fit: cover;
            height: 11rem;
          }
          .member-title {
            padding: 0;
            text-align: center;
            margin: 2.7rem 0;
          }
        }

        .member-description {
          flex: 1;
          padding-bottom: 2rem;
          width: 100%;
          gap: 1rem;

          h4 {
            justify-content: center;
            text-align: center;
            align-items: center;
            width: 100%;
            font-size: 1.25rem;
          }
        }
      }
    }
  }
}
</style>
