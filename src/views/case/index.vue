<template>
  <div class="cases">
    <div
      class="cases-header"
      :style="{
        backgroundImage: 'url(https://i.imgs.ovh/2023/11/24/MomNX.png)',
      }"
    >
      <h1 class="cases-title h1-style">法律课堂</h1>
      <h3 class="cases-content h3-style">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们将以轻松亲切的方式，与大家一起探索劳动纠纷和人身伤害方面的法律小知识。我们的目标是让法律不再遥远和复杂，而是成为日常生活中的有益伴侣。无论您遇到何种工作疑惑或生活困扰，这里总有一份法律知识等待您的发现，帮助您更好地维护自身权益。
      </h3>
    </div>
    <div class="cases-container">
      <div class="cases-container-title">
        <button class="h2-style" :class="{ active: currentType === '劳动纠纷' }" @click="setCurrentType('劳动纠纷')">
          劳动纠纷
        </button>
        <button class="h2-style" :class="{ active: currentType === '人身伤害' }" @click="setCurrentType('人身伤害')">
          人身伤害
        </button>
      </div>
      <div class="cases-container-grid">
        <CaseList v-if="currentType === '劳动纠纷'" v-for="item in pagedInjuryCase" :key="item.id" :knowledge="item" />
        <CaseList
          v-if="currentType === '人身伤害'"
          v-for="item in pagedDisputesCase"
          :key="item.id"
          :knowledge="item"
        />
      </div>
    </div>
    <Pagination
      v-if="currentType === '劳动纠纷' && pagedInjuryCase && pagedInjuryCase.length > pageSize"
      :total="pagedInjuryCase.length"
      :page-size="pageSize"
      :current-page="state.currentPage"
      @update:page="updatePage"
      class="cases-pagination"
    />
    <Pagination
      v-if="currentType === '人身伤害' && pagedDisputesCase && pagedDisputesCase.length > pageSize"
      :total="pagedDisputesCase.length"
      :page-size="pageSize"
      :current-page="state.currentPage"
      @update:page="updatePage"
      class="cases-pagination"
    />
  </div>
</template>

<script setup lang="ts">
// import { ApiResponse, Case } from '@/typings'
// import { useQuery } from '@tanstack/vue-query'
// import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import CaseList from './components/CaseList.vue'
import Pagination from '@/components/Pagination.vue'
import injury from '../../../JSON/injury.json'
import disputes from '../../../JSON/disputes.json'

const currentType = ref<string>('劳动纠纷')
const pageSize = 6
const state = reactive({
  currentPage: 1,
})
// const { data: casesListData } = useQuery({
//   queryKey: ['getCases', currentType],
//   queryFn: async () => {
//     const response = await axios.get<ApiResponse<Case[]>>('/api/getCases', {
//       params: {
//         type: currentType.value,
//         page: 0,
//         pageSize: 6,
//       },
//     })
//     if (response.status === 200 && response.data) {
//       return response.data.data
//     } else {
//       throw new Error('Failed to fetch classes')
//     }
//   },
// })
const homeInjuryCase = injury['data']
const homeDisputesCase = disputes['data']

const setCurrentType = (type: string) => {
  currentType.value = type
}

const pagedInjuryCase = computed(() => {
  if (!homeInjuryCase) return []
  const start = (state.currentPage - 1) * pageSize
  const end = start + pageSize
  return homeInjuryCase.slice(start, end)
})

const pagedDisputesCase = computed(() => {
  if (!homeDisputesCase) return []
  const start = (state.currentPage - 1) * pageSize
  const end = start + pageSize
  return homeDisputesCase.slice(start, end)
})

const updatePage = (newPage: number) => {
  state.currentPage = newPage
  window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped>
.cases {
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

    .cases-title {
      display: flex;
      text-align: center;
      margin-top: 8.4rem;
      color: var(--primary-color);
    }

    .cases-content {
      width: 31rem;
      color: var(--text-color);
    }
  }

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 50rem;
      margin-top: 2rem;
      margin-bottom: 6rem;

      button {
        position: relative;
        color: var(--text-color);
        cursor: pointer;

        &.active {
          color: var(--secondary-color);

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.3125rem;
            width: 100%;
            height: 0.125rem;
            background-color: var(--secondary-color);
          }
        }
      }
    }

    &-grid {
      display: flex;
      flex-wrap: wrap;
      width: 80rem;
      gap: 9rem;
      justify-content: center;
      margin-bottom: 6rem;
    }
  }
}

@media (max-width: 768px) {
  .cases-header {
    background-position: top center;
    background-size: auto 100%;
    height: 12rem;
    z-index: unset;
    gap: 0.8rem;

    .cases-title {
      margin-top: 1.5rem;
      font-family: Martel;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; /* 133.333% */
      letter-spacing: 0.00625rem;
    }

    .cases-content {
      width: 10.25rem;
      font-family: Open Sans;
      font-size: 0.625rem;
      font-style: normal;
      font-weight: 700;
      line-height: 0.875rem; /* 140% */
      letter-spacing: 0.0125rem;
    }
  }

  .cases-container-title {
    width: 14rem;
    margin-bottom: 3rem;

    button {
      font-family: Martel;
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; /* 150% */
      letter-spacing: 0.00625rem;
    }
  }

  .cases-container-grid {
    width: 20rem;
    gap: 3rem;
  }
}
</style>
