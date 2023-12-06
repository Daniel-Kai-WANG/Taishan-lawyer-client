<template>
  <div class="news-container">
    <h3 class="news-etitle h3-style">laws for cases</h3>
    <h1 class="news-ctitle h1-style">以案说法</h1>
    <NewsListItem
      v-for="news in pagedNewsList"
      :news="news"
      :key="news.id"
      width="40rem"
      :slice-number="126"
      :end-number="76"
    />
    <!-- <div v-for="news in pagedNewsList" :key="news.id">{{ news.title }}</div> -->
    <Pagination
      v-if="newsList && newsList.length > pageSize"
      :total="newsList.length"
      :page-size="pageSize"
      :current-page="state.currentPage"
      @update:page="updatePage"
      class="news-pagination"
    />
  </div>
</template>

<script setup lang="ts">
import NewsListItem from '@/components/NewsListItem.vue'
// import axios from 'axios'
// import { useQuery } from '@tanstack/vue-query'
// import { ApiResponse, Article } from '@/typings'
import Pagination from '@/components/Pagination.vue'
import { computed, onMounted, reactive } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import news from '../../../JSON/newsdetail.json'

const pageSize = 5
const state = reactive({
  currentPage: 1,
})
const newsList = news['data']
// const { data: newsList } = useQuery({
//   queryKey: ['getNewsList'],
//   queryFn: async () => {
//     const { data } = await axios.get<ApiResponse<Article[]>>('/api/getNewsList')
//     return data.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//   },
// })
const pagedNewsList = computed(() => {
  if (!newsList) return []
  const start = (state.currentPage - 1) * pageSize
  const end = start + pageSize
  return newsList.slice(start, end)
})
console.log(pagedNewsList.value)

const updatePage = (newPage: number) => {
  state.currentPage = newPage
  window.scrollTo(0, 0)
}

onBeforeRouteLeave(() => {
  sessionStorage.setItem('currentPage', state.currentPage.toString())
})

onMounted(() => {
  const savedPage = sessionStorage.getItem('currentPage')
  if (savedPage) {
    state.currentPage = parseInt(savedPage, 10)
    updatePage(state.currentPage)
  }
})
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

  .news-pagination {
    padding-left: 20rem;
  }
}
</style>
