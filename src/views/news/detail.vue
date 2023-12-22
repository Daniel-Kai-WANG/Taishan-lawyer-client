<template>
  <div class="news-container">
    <h3 class="news-etitle h3-style">laws for cases</h3>
    <h1 class="news-ctitle h1-style">以案说法</h1>
    <!-- <el-skeleton v-if="isLoading" :rows="20" animated class="news-loading" /> -->
    <div v-if="article" class="news-article">
      <h3 class="news-article-title h2-style">{{ article.title }}</h3>
      <span class="news-article-detail">
        <p class="p-style">发布时间：{{ article.time }}</p>
        <p class="p-style">作者：{{ article.author }}</p>
      </span>
      <p class="news-article-body p-style" v-html="articleContent"></p>
      <img :src="article.picture" alt="image" class="news-article-image" />
    </div>
    <ArticleNavigation
      :prev-id="prevId"
      :next-id="nextId"
      prev-name="上一篇文章"
      next-name="下一篇文章"
      @navigate="navigateToArticle"
    />
  </div>
</template>

<script setup lang="ts">
// import { useQuery } from '@tanstack/vue-query'
// import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
// import { ApiResponse, Article } from '@/typings'
import ArticleNavigation from '@/components/ArticleNavigation.vue'
import news from '../../../JSON/newsdetail.json'
import { computed, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const newsDetail = news['data']
let id = route.params.id as string
let article = newsDetail.find((article) => article.id.toString() === id)
const articleContent = computed(() => {
  if (!article) return ''
  return article.content.replace(/\n/g, '<br><br>')
})
let prevId = parseInt(id) > 1 ? parseInt(id) - 1 : undefined
let nextId = parseInt(id) < newsDetail.length ? parseInt(id) + 1 : undefined
watch(
  () => [route.params],
  () => {
    id = route.params.id as string
    article = newsDetail.find((article) => article.id.toString() === id)
    prevId = parseInt(id) > 1 ? parseInt(id) - 1 : undefined
    nextId = parseInt(id) < newsDetail.length ? parseInt(id) + 1 : undefined
  },
)
// const { data: article, isLoading } = useQuery({
//   queryKey: ['getArticle', () => route.params.id],
//   queryFn: async () => {
//     console.log(route.params.id)
//     try {
//       const response = await axios.get<
//         ApiResponse<{
//           article: Article
//           prevId?: number
//           nextId?: number
//         }>
//       >(`/api/getArticle?id=${route.params.id}`)
//       if (response.status === 200 && response.data.data) {
//         return response.data.data
//       } else {
//         throw new Error('Article data is not available')
//       }
//     } catch (err) {
//       console.error(err)
//       throw new Error('Error fetching article data')
//     }
//   },
// })

const navigateToArticle = (newId: number) => {
  if (newId) {
    router.push(`/news/detail/${newId}`)
  }
}
</script>

<style lang="scss" scoped>
.news-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  .news-etitle {
    color: var(--secondary-color);
    margin-top: 4rem;
  }

  .news-ctitle {
    max-width: 15.75rem;
    height: 3.4375rem;
    padding: 1.5rem 0;
    color: var(--primary-color);
    position: relative;
    margin-bottom: 6rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.625rem;
      width: 34.125rem;
      height: 0.875rem;
      background-color: var(--secondary-color);
      opacity: 0.2;
    }
  }

  .news-loading {
    width: 90%;
  }

  .news-article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 0;
    width: 42rem;
    gap: 1.2rem;

    &-title {
      width: 42rem;
      height: auto;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }

    &-detail {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 5rem;

      p {
        color: var(--text-color);
      }
    }

    &-body {
      color: var(--text-color);
      margin-top: 0.5rem;
    }

    &-image {
      object-fit: cover;
      width: 28.9375rem;
      height: 20.75rem;
      border-radius: 1.8125rem;
      margin-top: 1rem;
      margin-left: 6rem;
    }
  }
}

@media (max-width: 768px) {
  .news-container {
    align-items: center !important;

    .news-etitle {
      margin-left: -8.5rem;
    }
    .news-ctitle {
      margin-left: -5rem;
      margin-bottom: 4rem !important;

      &::after {
        margin-left: 0rem;
        width: 17.5rem !important;
      }
    }

    .news-article {
      width: 20rem !important;
      align-items: center !important;

      &-title {
        width: 100% !important;
      }

      &-detail {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem !important;
      }

      &-body {
        color: var(--text-color);
      }

      &-image {
        width: 17.4rem;
        height: 12.6rem;
        margin-left: -1rem;
        margin-bottom: 5rem;
      }
    }
  }
}
</style>
