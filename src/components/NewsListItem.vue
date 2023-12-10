<template>
  <div class="news-list-item" :style="{ width }">
    <div class="news-block">
      <div class="news-article">
        <h3 class="news-article-title h3-style" v-html="title"></h3>
        <p class="news-article-body p-style" v-html="desc"></p>
      </div>
      <div class="news-link">
        <router-link :to="`/news/detail/${news.id}`" class="link-button h5-style">
          <span class="link-name">阅读全文</span>
          <font-awesome-icon :icon="['fas', 'arrow-right']" class="link-arrow" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Article } from '@/typings'

const props = defineProps<{
  news: Article
  keyword?: string
  width: string
  sliceNumber: number
  endNumber: number
}>()
const title = computed(() => {
  if (!props.keyword) return props.news.title
  return props.news.title.replace(props.keyword, `<span style="color: skyblue">${props.keyword}</span>`)
})
const desc = computed(() => {
  const keyword = props.keyword
  const newsDesc = props.news.content
  let sliceDesc = newsDesc.length > props.sliceNumber ? newsDesc.slice(0, props.sliceNumber) + '......' : newsDesc
  if (!keyword) return sliceDesc
  const index = newsDesc.indexOf(keyword)
  sliceDesc = newsDesc.slice(Math.max(index - 50, 0), index + props.endNumber) + '......'
  return sliceDesc.replace(keyword, `<span style="color: skyblue">${keyword}</span>`)
})
</script>

<style lang="scss" scoped>
.news-list-item {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 1.875rem;
  gap: 5rem;

  &:last-of-type .news-block {
    border-bottom: none;
  }
  .news-block {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    width: 100%;
    // height: 16.25rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid var(--secondary-color);

    .news-article {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: flex-start;
      gap: 1.875rem;

      &-title {
        width: 100%;
        height: 1.875rem;
        color: var(--secondary-color);
        margin-bottom: 0.5rem;
      }

      &-body {
        width: 100%;
        height: 7.875rem;
        color: #000;
      }
    }

    .news-link {
      display: flex;
      width: 100%;
      justify-content: flex-end;

      .link-button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        width: 6rem;
        height: 1.4375rem;
        color: var(--text-color);
        gap: 0.1875rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .news-article {
    gap: 1.3rem;

    &-title {
      width: 100%;
      height: 1.875rem;
      color: var(--secondary-color);
      margin-bottom: 0.5rem;
    }

    &-body {
      width: 100%;
      height: 15rem !important;
      color: var(--text-color);
    }
  }

  .news-link {
    justify-content: flex-start !important;
  }
}
</style>
