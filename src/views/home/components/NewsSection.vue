<template>
  <div class="news">
    <h2 class="news-title h2-style">以案说法</h2>
    <div class="news-container">
      <div v-for="news in randomNewsList" :key="news.id">
        <router-link :to="`/news/detail/${news.id}`" class="news-content">
          <h3 class="news-content-title h3-style">{{ news.title }}</h3>
          <p class="news-content-desc p-style">
            {{ news.content.length > 126 ? news.content.slice(0, 126) + '......' : news.content }}
          </p>
        </router-link>
      </div>
    </div>

    <div class="news-link">
      <router-link to="/news" class="link-button">
        <span class="link-name h5-style">了解更多</span>
        <font-awesome-icon :icon="['fas', 'arrow-right']" class="link-arrow" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from 'vue-router'
// import axios from 'axios'
// import { useQuery } from '@tanstack/vue-query'
// import { ApiResponse, Article } from '@/typings'
import news from '../../../../JSON/newsdetail.json'
import { computed } from 'vue'

library.add(faArrowRight)
const newsList = news['data']
const randomNewsList = computed(() => {
  let shuffled = newsList
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return shuffled.slice(0, 2)
})
// const { data: newsList } = useQuery({
//   queryKey: ['getNewsList'],
//   queryFn: async () => {
//     const { data } = await axios.get<ApiResponse<Article[]>>('/api/getNewsList')
//     const shuffledNews = data.data.sort(() => 0.5 - Math.random())
//     const selectedNews = shuffledNews.slice(0, 2)
//     return selectedNews
//   },
//   refetchOnWindowFocus: true,
// })
</script>

<style lang="scss" scoped>
.news {
  background-color: var(--background-color);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  &-title {
    color: var(--secondary-color);
    display: flex;
    width: 65.625rem;
    padding: 2.8125rem 0;
    flex-direction: column;
    align-items: center;
  }

  &-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5.25rem;

    .news-content {
      display: inline-block;
      width: 25rem;
      height: 19.5rem;
      border-radius: 1rem;
      background-color: var(--photo-background);
      padding: 2.5rem 0 0 2.5rem;
      text-decoration: none;
      box-shadow: 0px 13px 19px 0px rgba(0, 0, 0, 0.07);

      &-title {
        width: 23.1875rem;
        height: 3.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
      }

      &-desc {
        width: 22.875rem;
        height: 10.625rem;
        color: var(--text-color);
      }
    }
  }

  &-link {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: auto;
    margin: 1.25rem 0 1.625rem 54rem;
    .link-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      text-decoration: none;
      cursor: pointer;
      margin-top: 0px;
      .link-name {
        width: 4.5rem;
        height: 1.4375rem;
        color: var(--text-color);
      }

      .link-arrow {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: -0.2rem;
        scale: 0.7;
        color: var(--text-color);
        font-size: 1rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .news-title {
    width: 6.5rem;
    padding: 1.5rem 0;
    font-family: Martel;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem; /* 133.333% */
    letter-spacing: 0.00625rem;
  }

  .news-container {
    grid-template-columns: 1fr;
    grid-gap: 1.75rem;

    .news-content {
      width: 18rem;
      height: 20rem;
      padding: 2rem 1rem;

      &-title {
        width: auto;
        height: auto;
        padding: 0 1rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        font-family: Montserrat;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.875rem; /* 150% */
        letter-spacing: 0.0125rem;
      }

      &-desc {
        width: auto;
        padding: 0 1rem;
        color: var(--text-color);
      }
    }
  }

  .news-link {
    width: 100%;
    margin: 0.5rem 0;
    align-items: center;
    justify-content: center;
    .link-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      text-decoration: none;
      cursor: pointer;
      margin-top: 0px;
      .link-name {
        width: 4.5rem;
        height: 1.4375rem;
        color: var(--text-color);
      }

      .link-arrow {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: -0.2rem;
        scale: 0.7;
        color: var(--text-color);
        font-size: 1rem;
      }
    }
  }
}
</style>
