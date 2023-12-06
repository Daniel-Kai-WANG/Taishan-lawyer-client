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
    <el-skeleton v-if="isLoading" :rows="8" animated class="member-loading" />
    <div v-if="currentMember" class="member-container">
      <!-- <MemberCarousel v-model:current="currentIndex" :members="members ?? []" /> -->

      <div class="member-info">
        <div class="member-desc">
          <h2 class="member-name h2-style">{{ currentMember.name }}</h2>
          <h3 class="member-position h3-style">{{ currentMember.position }}</h3>
        </div>
        <h3 class="member-head h3-style">工作经历{{ currentIndex }}</h3>
        <h5 class="member-detail h5-style">{{ currentMember.workExperience }}</h5>
        <h3 class="member-head h3-style">服务领域</h3>
        <div class="member-fields">
          <span class="field-item h5-style" v-for="field in fieldArray" :key="field">{{ field }}</span>
        </div>
        <h4 class="member-head h3-style">联系方式</h4>
        <div class="member-contact">
          <div class="phone">
            <SvgIcon name="phone" style="width: 1rem; height: 1rem" />
            <h6 class="contact-detail h6-style">{{ currentMember.phoneNumber }}</h6>
          </div>
          <div class="wechat">
            <SvgIcon name="wechat" style="width: 1rem; height: 1rem" />
            <h6 class="contact-detail h6-style">{{ currentMember.wechat }}</h6>
          </div>
        </div>

        <h3 class="member-head h3-style">个人荣誉</h3>
        <p class="member-honor p-style" v-html="honorArray"></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ApiResponse, Member } from '@/typings'
import { computed, ref } from 'vue'
// import MemberCarousel from './components/MemberCarousel.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const currentIndex = ref(0)
const { data: members, isLoading } = useQuery<Member[]>({
  queryKey: ['getMembers'],
  queryFn: async () => {
    const response = await axios.get<ApiResponse<Member[]>>('/api/getMembers')
    return response.data.data
  },
})
const currentMember = computed(() => members.value?.[currentIndex.value])

// watch(currentIndex, (newIndex) => {
//   if (members.value && newIndex >= 0 && newIndex < members.value.length) {
//     const memberId = members.value[newIndex].id.toString()
//     router.push({ name: 'TeamMember', params: { id: memberId } })
//   }
// })

const fieldArray = computed(() => currentMember.value?.fields.split(',') || [])
const honorArray = computed(() => currentMember.value?.personalHonor.join('<br/><br/>'))
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

    .member-info {
      display: flex;
      flex: 1.2;
      // margin-right: -11.875rem;
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
</style>
