<template>
  <router-link to="/team" class="member-link">
    <div class="member-block">
      <div class="image-block">
        <img :src="member.avatar" alt="image" class="member-image" />
      </div>
      <div class="member-info">
        <h3 class="member-name h3-style" v-html="name"></h3>
        <h4 class="member-detail h4-style">{{ member.position }}</h4>
        <h4 class="member-detail h4-style" v-html="field"></h4>
        <h4 class="member-detail h4-style">教育背景：{{ member.background }}</h4>
        <h4 class="member-detail h4-style">联系电话：{{ member.phoneNumber }}</h4>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Member } from '@/typings'

const props = defineProps<{
  member: Member
  keyword?: string
}>()
const name = computed(() => {
  if (!props.keyword) return props.member.name
  return props.member.name.replace(props.keyword, `<span style="color: skyblue">${props.keyword}</span>`)
})
const field = computed(() => {
  const keyword = props.keyword
  const memberfield = '服务领域：' + props.member.fields
  if (!keyword) return memberfield
  return memberfield.replace(keyword, `<span style="color: skyblue">${keyword}</span>`)
})
</script>

<style lang="scss" scoped>
.member-link {
  display: flex;
  text-decoration: none;
  justify-content: center;
  .member-block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 5rem;

    .image-block {
      width: 16.25rem;
      height: 16.25rem;
      border-radius: 0.75rem;
      overflow: hidden;
      background-color: var(--photo-background);

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    .member-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      .member-name {
        max-width: 8rem;
        color: var(--text-color);
        text-align: left;
        margin-bottom: 0.5rem;
      }
      .member-detail {
        color: var(--text-color);
        text-align: left;
        max-width: 37rem;
      }
    }

    &::after {
      content: '';
      position: absolute;
      left: 17%;
      bottom: -2rem;
      width: 65rem;
      height: 0.0625rem;
      background-color: var(--secondary-color);
    }
  }
}

@media (max-width: 768px) {
  .member-link {
    .member-block {
      flex-direction: column;
      gap: 2rem;

      .image-block {
        width: 11.6rem;
        height: 11.6rem;
        border-radius: 3.5rem;
        box-shadow: -20px -10px 25px 0px rgba(0, 0, 0, 0.3);
      }

      .member-info {
        align-items: center;
      }

      &::after {
        display: none;
        content: '';
        position: absolute;
        left: 17%;
        bottom: -2rem;
        width: 65rem;
        height: 0.0625rem;
        background-color: var(--secondary-color);
      }
    }
  }
}
</style>
