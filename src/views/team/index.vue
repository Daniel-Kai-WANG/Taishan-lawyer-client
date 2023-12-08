<template>
  <div class="member">
    <div
      class="member-header"
      :style="{
        backgroundImage: 'url(https://i.imgs.ovh/2023/11/24/MomNX.png)',
      }"
    >
      <h1 class="member-title h1-style">专业团队</h1>
      <h3 class="member-content h3-style">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的团队由经验丰富的专业律师组成，专注于劳动纠纷和工伤赔偿等法律服务。我们坚持以客户为中心，提供高效、同情心的法律解决方案，努力实现法律面前人人平等的宗旨。我们不仅提供专业服务，还承担着为社会正义奋斗的责任。
      </h3>
    </div>
    <!-- <el-skeleton v-if="isLoading" :rows="8" animated class="member-loading" /> -->
    <div v-if="member" class="member-container">
      <!-- <MemberCarousel v-model:current="currentIndex" :members="members ?? []" /> -->
      <div class="image-box">
        <div class="avatar-background"></div>
        <img :src="member[0].avatar" class="member-avatar" />
      </div>
      <div class="member-info">
        <div class="member-desc">
          <h2 class="member-name h2-style">{{ member[0].name }}</h2>
          <h3 class="member-position h3-style">{{ member[0].position }}</h3>
        </div>
        <h3 class="member-head h3-style">工作经历</h3>
        <h5 class="member-detail h5-style">{{ member[0].workExperience }}</h5>
        <h3 class="member-head h3-style">服务领域</h3>
        <div class="member-fields">
          <span class="field-item h5-style" v-for="field in fieldArray" :key="field">{{ field }}</span>
        </div>
        <h4 class="member-head h3-style">联系方式</h4>
        <div class="member-contact">
          <div class="phone">
            <SvgIcon name="phone" style="width: 1rem; height: 1rem" />
            <h6 class="contact-detail h6-style">{{ member[0].phoneNumber }}</h6>
          </div>
          <div class="wechat">
            <SvgIcon name="wechat" style="width: 1rem; height: 1rem" />
            <h6 class="contact-detail h6-style">{{ member[0].wechat }}</h6>
          </div>
        </div>

        <h3 class="member-head h3-style">个人荣誉</h3>
        <p class="member-honor p-style" v-html="honorArray"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useQuery } from '@tanstack/vue-query'
// import axios from 'axios'
// import { ApiResponse, Member } from '@/typings'
import { computed } from 'vue'
// import MemberCarousel from './components/MemberCarousel.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import members from '../../../JSON/members.json'

// const currentIndex = ref(0)
// const { data: members, isLoading } = useQuery<Member[]>({
//   queryKey: ['getMembers'],
//   queryFn: async () => {
//     const response = await axios.get<ApiResponse<Member[]>>('/api/getMembers')
//     return response.data.data
//   },
// })
// const currentMember = computed(() => members.value?.[currentIndex.value])

const member = members['data']

const fieldArray = computed(() => member[0].fields.split(',') || [])
const honorArray = computed(() => member[0].personalHonor.join('<br/><br/>'))
</script>

<style lang="scss" scoped>
.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--background-color);

  &-header {
    display: flex;
    background-size: cover;
    background-position: center 70%;
    background-repeat: no-repeat;
    flex-direction: column;
    width: 100%;
    height: 40rem;
    align-items: center;
    gap: 4rem;
    z-index: 2;

    .member-title {
      display: flex;
      text-align: center;
      margin-top: 8.4rem;
      color: var(--primary-color);
    }

    .member-content {
      width: 31rem;
      color: var(--text-color);
    }
  }

  &-loading {
    width: 53.875rem;
    margin-bottom: 6.25rem;
  }

  &-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0px;
    margin-bottom: 6.25rem;
    gap: 15rem;

    .image-box {
      display: flex;
      flex-direction: row;
      position: relative;
      margin-top: 5rem;
      margin-left: 9rem;
      width: 20rem;
      height: 24rem;

      .member-avatar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 17rem;
        height: 21.5rem;
        border-radius: 0.75rem;
        z-index: 2;
      }

      .avatar-background {
        position: absolute;
        top: 0;
        right: 0;
        width: 18rem;
        height: 21.5rem;
        border-radius: 0.75rem;
        background-color: var(--secondary-color);
      }
    }

    .member-info {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      .member-desc {
        display: flex;
        flex-direction: row;
        position: relative;
        margin-bottom: 1rem;
        .member-name {
          max-width: 7.6rem;
          text-align: left;
          color: var(--text-color);
        }

        .member-position {
          max-width: 20rem;
          color: var(--secondary-color);
          padding-top: 0.8rem;
        }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0.2rem;
          background-color: var(--secondary-color);
        }
      }

      .member-head {
        width: 6.4rem;
        color: #000;
      }

      .member-detail {
        max-width: 23rem;
        color: var(--text-color);
        margin-bottom: 1.5rem;
      }

      .member-fields {
        display: flex;
        flex-direction: row;
        gap: 0.6rem;
        margin-bottom: 1.5rem;

        .field-item {
          color: var(--secondary-color);
          text-align: center;
          border: 1px solid var(--secondary-color);
          padding: 0.625rem 1.25rem;
          justify-content: center;
          align-items: center;
          border-radius: 1rem;
        }
      }
      .member-contact {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 22.9375rem;
        margin-top: -0.625rem;
        margin-bottom: 1.3rem;
        gap: 2rem;

        .phone,
        .wechat {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;

          .contact-detail {
            max-width: 9rem;
            color: var(--text-color);
          }
        }
      }

      .member-honor {
        width: 42rem;
        color: var(--text-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .member-header {
    background-position: top center;
    background-size: auto 100%;
    height: 12rem;
    z-index: unset;
    gap: 0.8rem;

    .member-title {
      margin-top: 1.5rem;
      font-family: Martel;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; /* 133.333% */
      letter-spacing: 0.00625rem;
    }

    .member-content {
      width: 10.25rem;
      font-family: Open Sans;
      font-size: 0.625rem;
      font-style: normal;
      font-weight: 700;
      line-height: 0.875rem; /* 140% */
      letter-spacing: 0.0125rem;
    }
  }

  .member-container {
    flex-direction: column;
    margin-bottom: 0rem;
    align-items: center;
    gap: 3.5rem;

    .image-box {
      margin-top: 3rem;
      margin-left: 0rem;
      width: 14.4rem;
      height: 16.8rem;

      .member-avatar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 12rem;
        height: 15rem;
        border-radius: 0.75rem;
        z-index: unset;
      }

      .avatar-background {
        width: 12rem;
        height: 15rem;
      }
    }

    .member-info {
      width: 20rem;

      .member-name {
        font-family: Martel;
        font-size: 1.8rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2rem; /* 133.333% */
        letter-spacing: 0.00625rem;
      }

      .member-position {
        font-family: Montserrat;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.875rem; /* 150% */
        letter-spacing: 0.0125rem;
        padding-top: 0.2rem !important;
      }

      .member-head {
        width: 6.4rem;
        color: #000;
      }

      .member-detail {
        max-width: 20rem;
        color: var(--text-color);
        margin-bottom: 1.5rem;
      }

      .member-fields {
        flex-wrap: wrap;
      }
      .member-contact {
        width: 20rem;
      }

      .member-honor {
        width: 21rem !important;
        margin-bottom: 3rem;
      }
    }
  }
}
</style>

<!-- 原先的team index -->
<!-- <template>
  <div
    class="team"
    :style="{
      backgroundImage: 'url(https://i.imgs.ovh/2023/11/29/pSjkV.png)',
    }"
  >
    <h1 class="team-title h1-style">专业团队</h1>
    <div class="team-stars">
      <SvgIcon name="star" v-for="star in 5" :key="star" :style="{ height: 26, weight: 26, fill: '#000' }" />
    </div>
    <h3 class="team-desc h5-style">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的团队由经验丰富的专业律师组成，专注于劳动纠纷和工伤赔偿等法律服务。我们坚持以客户为中心，提供高效、同情心的法律解决方案，努力实现法律面前人人平等的宗旨。我们不仅提供专业服务，还承担着为社会正义奋斗的责任。
    </h3>
    <div class="team-buttons">
      <div class="carousel-control left-button">
        <button class="left" @click="next">
          <svg
            t="1701241589789"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="20617"
            width="30"
            height="30"
          >
            <path
              d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z"
              fill="#6C3636"
              p-id="20618"
            ></path>
          </svg>
        </button>
      </div>
      <div class="carousel-control right-button">
        <button class="right" @click="prev">
          <svg
            t="1701241422520"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="19552"
            width="30"
            height="30"
          >
            <path
              d="M384 512l192 192 29.866667-29.866667-162.133334-162.133333 162.133334-162.133333-29.866667-29.866667L384 512z"
              fill="#6C3636"
              p-id="19553"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <Carousel
      ref="carousel"
      :wrapAround="true"
      :itemsToShow="3"
      :autoplay="6000"
      :navigationEnabled="false"
      :paginationEnabled="false"
      :transition="1000"
      class="team-carousel"
    >
      <Slide v-for="member in members" :key="member.id">
        <MemberListItem :member="member" />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import MemberListItem from '@/views/team/components/MemberListItem.vue'
import { ApiResponse, Member } from '@/typings'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import SvgIcon from '@/components/SvgIcon.vue'

const carousel = ref<typeof Carousel | null>(null)
const prev = () => {
  if (carousel.value) {
    carousel.value.prev()
  }
}

const next = () => {
  if (carousel.value) {
    carousel.value.next()
  }
}
const { data: members } = useQuery({
  queryKey: ['getMembers'],
  queryFn: async () => {
    const { data } = await axios.get<ApiResponse<Member[]>>('/api/getMembers')
    return data.data
  },
})
</script>

<style lang="scss" scoped>
.team {
  background-position: 160% 0;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  background-color: var(--light-background-color);
  align-items: flex-start;

  &-title {
    max-width: 15.75rem;
    padding-top: 5.5rem;
    padding-left: 15rem;
    color: var(--primary-color);
  }

  &-stars {
    display: flex;
    flex-direction: row;
    width: 9rem;
    gap: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 15.5rem;
  }
  &-desc {
    width: 30rem;
    color: var(--text-color);
    text-align: left;
    margin-top: 4rem;
    padding-left: 15rem;
    margin-bottom: 7rem;
  }

  &-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    width: 60.7rem;
    height: 2.5rem;
    margin-bottom: 2rem;
    .carousel-control {
      width: 2rem;
      height: 2rem;
      border: 1px solid var(--secondary-color);
      border-radius: 50%;
      display: flex;
      position: absolute;
      align-items: center;
      justify-content: center;

      &.left-button {
        left: 95%;
      }

      &.right-button {
        left: 90%;
      }
    }
  }

  &-carousel {
    width: 55rem;
    margin-left: 7.5rem;
    margin-bottom: 2rem;
  }
}
</style> -->
