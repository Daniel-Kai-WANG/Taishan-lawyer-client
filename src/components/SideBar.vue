<template>
  <div class="side-bar-btns">
    <router-link to="/contact"><button class="inquire-btn h5-style">咨询我们</button></router-link>
    <button class="contact-btn h5-style">联系顾问</button>
  </div>
  <div class="side-bar-schedule">
    <p class="p-style">
      <span class="h6-style">工作日上班时间</span>
      上午：8:00-12:00<br />
      下午：14:00-20:00<br />
      <span class="h6-style">周末上班时间</span>
      周日休息<br />
      <span class="h6-style">周六</span>
      上午：8:00-12:00<br />
      下午：14:00-20:00<br />
    </p>
  </div>
  <div v-if="isNewsPage" class="side-bar-list">
    <h4 class="list-title h4-style">最新法律案例</h4>
    <router-link
      :to="`/news/detail/${news.id}`"
      v-for="(news, index) in latestNews"
      :key="news.id"
      class="list-item p-style"
    >
      {{ index + 1 }}. "{{ news.title }}"
    </router-link>
  </div>
  <div v-else-if="isCasePage" class="side-bar-list">
    <h4 class="list-title h4-style">相关法律知识</h4>
    <router-link
      :to="`/case/detail/${knowledge.id}/${knowledge.articleType}`"
      v-for="(knowledge, index) in relatedCases"
      :key="knowledge.id"
      class="list-item p-style"
    >
      {{ index + 1 }}. "{{ knowledge.title }}"
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import injury from '../../JSON/injury.json'
import disputes from '../../JSON/disputes.json'
import news from '../../JSON/newshome.json'
// import axios from 'axios'
// import { ApiResponse, Article, Case } from '@/typings'
// import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const isNewsPage = computed(() => route.name === 'NewsDetail')
const isCasePage = computed(() => route.name === 'CaseDetail')
const currentCaseType = route.params.type as string
const injuryInfo = injury['data']
const disputesInfo = disputes['data']
const newsInfo = news['data']

// const { data: latestNewsList } = useQuery({
//   queryKey: ['getNewsList'],
//   queryFn: async () => {
//     const { data } = await axios.get<ApiResponse<Article[]>>('/api/getNewsList')
//     return data.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//   },
//   enabled: isNewsPage,
// })

// const { data: relatedCaseList } = useQuery({
//   queryKey: ['getCases', currentCaseType],
//   queryFn: async () => {
//     if (!currentCaseType.value) return []
//     const { data } = await axios.get<ApiResponse<Case[]>>('/api/getCases', {
//       params: {
//         type: currentCaseType.value,
//       },
//     })
//     return data.data
//   },
//   enabled: isCasePage,
// })

const latestNews = computed(() => (newsInfo.length > 10 ? newsInfo.slice(0, 10) : newsInfo))
const relatedCases = computed(() =>
  currentCaseType === '劳动纠纷'
    ? disputesInfo.length > 10
      ? disputesInfo.slice(0, 10)
      : disputesInfo
    : injuryInfo.length > 10
      ? injuryInfo.slice(0, 10)
      : injuryInfo,
)
</script>

<style lang="scss" scoped>
.side-bar-btns {
  width: 14.5rem;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  margin-top: 9rem;
  gap: 1.25rem;

  button {
    width: 95%;
    border-radius: 0.625rem;
    padding: 0.7rem 0;
    text-align: center;
    background-color: transparent;
    cursor: pointer;
  }

  .inquire-btn {
    background-color: var(--secondary-color);
    color: var(--photo-background);
    border: 2px solid var(--secondary-color);
  }

  .contact-btn {
    background-color: var(--photo-background);
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
  }
}

.side-bar-schedule {
  display: flex;
  width: 17.5rem;
  background-color: var(--background-color);
  margin-top: 3rem;

  p {
    display: flex;
    flex-direction: column;
    color: var(--text-color);
    gap: 0.7rem;
  }
}

.side-bar-list {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0px;

  .list-title {
    width: 20.5rem;
    color: var(--secondary-color);
    padding: 1.5rem 0;
  }

  .list-item {
    width: 20.5rem;
    color: var(--text-color);
    text-align: left;
    white-space: nowrap;
  }
}
</style>
