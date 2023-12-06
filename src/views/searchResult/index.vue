<template>
  <div class="result">
    <h1 class="result-title h1-style">搜索结果</h1>
    <div class="result-search">
      <input
        v-model="searchQuery"
        placeholder="请输入您想搜索的内容"
        @keyup.enter="handleSearch"
        class="result-search-bar h5-style"
      />
      <button class="result-search-button" @click="handleSearch">
        <SvgIcon name="largeSearch" style="width: 2rem; height: 2rem" />
      </button>
    </div>
    <!-- <el-skeleton v-if="isLoading" :rows="10" animated class="search-loading" /> -->
    <template v-if="searchResult">
      <h4 class="result-response h4-style" v-if="totalResults">
        共为您找到{{ totalResults }}条与“<span class="search-keyword">{{ keyword }}</span
        >”相关的结果
      </h4>
      <h4 class="result-response h4-style" v-if="!totalResults && keyword">
        未找到与“<span class="search-keyword">{{ keyword }}</span
        >”相关的结果
      </h4>
      <div class="result-category" v-if="totalResults">
        <div class="result-category-row">
          <button
            :class="{ active: selectedCategory === 'article' }"
            class="category-button h4-style"
            @click="selectCategory('article')"
          >
            以案说法 ({{ searchResult.data.total?.articleLength }})
          </button>
          <button
            :class="{ active: selectedCategory === 'case' }"
            class="category-button h4-style"
            @click="selectCategory('case')"
          >
            法律课堂 ({{ searchResult.data.total?.casesLength }})
          </button>
          <button
            :class="{ active: selectedCategory === 'member' }"
            class="category-button h4-style"
            @click="selectCategory('member')"
          >
            专业团队 ({{ searchResult.data.total?.memberLength }})
          </button>
        </div>
        <div class="category" v-if="selectedCategory === 'article'">
          <div v-if="searchResult.data.total?.articleLength">
            <NewsListItem
              v-for="article in searchResult.data.articles"
              :news="article"
              :key="article.id"
              :keyword="keyword"
              width="70rem"
              :slice-number="200"
              :end-number="150"
            />
          </div>
          <h4 v-else class="noresult h4-style">没有与该模块匹配的内容</h4>
        </div>
        <div class="category cases" v-if="selectedCategory === 'case'">
          <div v-if="searchResult.data.total?.casesLength" class="casesList">
            <CaseList v-for="caze in searchResult.data.cases" :knowledge="caze" :key="caze.title" :keyword="keyword" />
          </div>
          <h4 v-else class="h4-style noresult">没有与该模块匹配的内容</h4>
        </div>
        <div class="category" v-if="selectedCategory === 'member'">
          <div v-if="searchResult.data.total?.memberLength">
            <MemberListItem
              v-for="member in searchResult.data.members"
              :member="member"
              key="member.id"
              :keyword="keyword"
            />
          </div>
          <h4 v-else class="h4-style noresult">没有与该模块匹配的内容</h4>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
// import axios from 'axios'
import { ApiResponse, Article, Case, Member } from '@/typings'
import NewsListItem from '@/components/NewsListItem.vue'
import MemberListItem from '@/views/team/components/MemberListItem.vue'
// import { useQuery } from '@tanstack/vue-query'
import CaseList from '../case/components/CaseList.vue'
import article from '../../../JSON/newsdetail.json'
import disputes from '../../../JSON/disputes.json'
import injury from '../../../JSON/injury.json'
import member from '../../../JSON/members.json'
import SvgIcon from '@/components/SvgIcon.vue'

const route = useRoute()
const searchQuery = ref((route.query.keyword as string) || '')
const selectedCategory = ref('article')
const pageSize = ref(10)
const pageNumber = ref(100)
const keyword = ref((route.query.keyword as string) || '')
const articlesList = article['data']
const disputesList = disputes['data']
const injuryList = injury['data']
const casesList = [...disputesList, ...injuryList]
const memberList = member['data']

const handleSearch = () => {
  keyword.value = searchQuery.value
}

type SearchResult = {
  articles?: Article[]
  members?: Member[]
  cases?: Case[]
  total?: {
    articleLength: number
    memberLength: number
    casesLength: number
  }
  type?: string
  pageSize?: number
  pageNumber?: number
}

const searchResult = computed((): ApiResponse<SearchResult> => {
  if (!keyword.value) return { data: {} }
  const articleResult = articlesList.filter(
    (article) => article.title.includes(keyword.value) || article.content.includes(keyword.value),
  )
  const casesResult = casesList.filter(
    (caze) => caze.title.includes(keyword.value) || caze.content.includes(keyword.value),
  )
  const memberResult = memberList.filter(
    (member) => member.name.includes(keyword.value) || member.fields.includes(keyword.value),
  )
  const articleLength = articleResult.length
  const casesLength = casesResult.length
  const memberLength = memberResult.length

  return {
    data: {
      articles: selectedCategory.value === 'article' ? articleResult : undefined,
      members: selectedCategory.value === 'member' ? memberResult : undefined,
      cases: selectedCategory.value === 'case' ? casesResult : undefined,
      total: {
        articleLength,
        memberLength,
        casesLength,
      },
      type: selectedCategory.value,
      pageSize: pageSize.value,
      pageNumber: pageNumber.value,
    },
  }
})
console.log(searchResult.value.data)

const totalResults = computed(() => {
  if (!searchResult.value) return 0
  const { articleLength, memberLength, casesLength } = searchResult.value.data.total!
  return articleLength + memberLength + casesLength
})
console.log(totalResults.value)

const selectCategory = (category: string) => {
  selectedCategory.value = category
}

// const { data: searchResult, isLoading } = useQuery({
//   queryKey: ['search', keyword, selectedCategory, pageSize, pageNumber],
//   queryFn: async () => {
//     try {
//       const response = await axios.get<ApiResponse<SearchResult>>(`/api/search`, {
//         params: {
//           keyword: keyword.value,
//           type: selectedCategory.value,
//           pageSize: pageSize.value,
//           pageNumber: pageNumber.value,
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
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 36.4rem;
  background-color: var(--light-background-color);
  align-items: center;

  &-title {
    max-width: 15.75rem;
    height: 3.4375rem;
    padding: 5.5rem 0;
    color: var(--primary-color);
  }

  &-search {
    position: relative;
    width: 69.75rem;
    border-radius: 0.75rem;
    border: 1px solid var(--second-text-color);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #000;
    margin-bottom: 1.2rem;

    &-bar {
      width: 67.75rem;
      height: 3.3125rem;
      border-radius: 0.75rem;
      border: 0;
      padding-left: 2rem;
    }

    &-button {
      background-color: transparent;
      border: none;
      position: absolute;
      top: 0.625rem;
      right: 1rem;
      cursor: pointer;
    }
  }

  // .search-loading {
  //   max-width: 15.75rem;
  //   margin-bottom: 6.25rem;
  // }

  &-response {
    margin-top: 2rem;
    color: var(--text-color);
    margin-bottom: 1.2rem;

    .search-keyword {
      color: var(--secondary-color);
    }
  }

  &-category {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    &-row {
      display: flex;
      flex-direction: row;
      padding: 0.625rem 1.25rem;
      align-items: flex-start;
      justify-content: center;
      gap: 15rem;

      .category-button {
        color: var(--second-text-color);
        width: 8rem;
        padding-bottom: 0.3125rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-bottom: 3rem;

        &.active {
          color: var(--primary-color);
          border-bottom: 2px solid var(--primary-color);
        }
      }
    }
    .category {
      display: flex;
      width: 70rem;
      flex-direction: column;
      margin-bottom: 5rem;

      &.cases {
        width: 80rem;
        display: flex;

        .casesList {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          gap: 9rem;
          justify-content: center;
        }
      }

      .noresult {
        display: flex;
        justify-content: center;
        color: var(--text-color);
      }
    }
  }
}
</style>
