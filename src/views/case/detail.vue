<template>
  <div class="caze">
    <div class="caze-container">
      <h3 class="caze-etitle h3-style">laws class</h3>
      <h1 class="caze-ctitle h1-style">法律小课堂</h1>
      <!-- <el-skeleton v-if="isLoading" :rows="20" animated class="caze-loading" /> -->
      <div v-if="caze" class="caze-article">
        <h3 class="caze-article-title h2-style">{{ caze.title }}</h3>
        <span class="caze-article-detail">
          <p class="p-style">发布时间：{{ caze.releaseTime }}</p>
          <p class="p-style">类别：{{ caze.articleType }}</p>
        </span>
        <p class="caze-article-body p-style">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ caze.content }}</p>
        <img :src="caze.picture" alt="image" class="caze-article-image" />
      </div>
      <ArticleNavigation
        :prev-id="prevId"
        :next-id="nextId"
        prev-name="上一篇文章"
        next-name="下一篇文章"
        @navigate="navigateToArticle"
      />
    </div>
    <div class="caze-sidebar">
      <SideBar />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useQuery } from '@tanstack/vue-query'
// import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
// import { ApiResponse, Case} from '@/typings'
import ArticleNavigation from '@/components/ArticleNavigation.vue'
import SideBar from '@/components/SideBar.vue'
import disputes from '../../../JSON/disputes.json'
import injury from '../../../JSON/injury.json'
import { watch } from 'vue'

const router = useRouter()
const route = useRoute()

// const { data: caze, isLoading } = useQuery({
//   queryKey: ['getCase', () => route.params.id, () => route.params.type],
//   queryFn: async () => {
//     console.log(route.params.id)
//     console.log(route.params.type)
//     try {
//       const response = await axios.get<
//         ApiResponse<{
//           caze: Case
//           prevId?: number
//           nextId?: number
//         }>
//       >(`/api/getCase`, {
//         params: {
//           id: route.params.id,
//           type: route.params.type,
//         },
//       })
//       if (response.status === 200 && response.data.data) {
//         return response.data.data
//       } else {
//         throw new Error('Case data is not available')
//       }
//     } catch (err) {
//       console.error(err)
//       throw new Error('Error fetching case data')
//     }
//   },
// })
const disputesDetail = disputes['data']
const injuryDetail = injury['data']
const totalCases = [...disputesDetail, ...injuryDetail]
const articleType = route.params.type
let id = route.params.id as string
let caze = totalCases.find((caze) => caze.id.toString() === id && caze.articleType === articleType)
let prevId = caze?.id! > 1 ? caze?.id! - 1 : undefined
let nextId =
  articleType === '劳动纠纷'
    ? caze?.id! < disputesDetail.length
      ? caze?.id! + 1
      : undefined
    : caze?.id! < injuryDetail.length
      ? caze?.id! + 1
      : undefined
watch(
  () => [route.params],
  () => {
    id = route.params.id as string
    caze = totalCases.find((caze) => caze.id.toString() === id && caze.articleType === articleType)
    prevId = parseInt(id) > 1 ? parseInt(id) - 1 : undefined
    nextId =
      articleType === '劳动纠纷'
        ? parseInt(id) < disputesDetail.length
          ? parseInt(id) + 1
          : undefined
        : parseInt(id) < injuryDetail.length
          ? parseInt(id) + 1
          : undefined
  },
)
const navigateToArticle = (newId: number) => {
  if (newId) {
    router.push(`/case/detail/${newId}/${articleType}`)
  }
}
</script>

<style lang="scss" scoped>
.caze {
  display: flex;
  flex-direction: row;
  max-width: 70rem;
  min-height: 120rem;
  background-color: var(--photo-background);
  margin-bottom: 1.25rem;
  margin: 0 auto;

  &-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    .caze-etitle {
      color: var(--secondary-color);
      margin-top: 4rem;
    }

    .caze-ctitle {
      max-width: 20rem;
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

    .caze-loading {
      width: 90%;
    }

    .caze-article {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 0;
      width: 42.0625rem;
      gap: 1.2rem;

      &-title {
        width: 35rem;
        height: 3.5rem;
        color: var(--secondary-color);
        margin-bottom: 4rem;
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
        color: #000;
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
}
</style>
