<template>
  <RouterLink :to="`/case/detail/${knowledge.id}/${knowledge.articleType}`">
    <div class="case-list-item">
      <h3 class="case-title h3-style" v-html="title"></h3>
      <h5 class="case-content h5-style" v-html="content"></h5>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Case } from '@/typings'
import { computed } from 'vue'

const props = defineProps<{
  knowledge: Case
  keyword?: string
}>()
const title = computed(() => {
  if (!props.keyword) return props.knowledge.title
  return props.knowledge.title.replace(props.keyword, `<span style="color: skyblue">${props.keyword}</span>`)
})
const content = computed(() => {
  const keyword = props.keyword
  const cazeContent = props.knowledge.content
  let sliceContent =
    props.knowledge.content.length > 120 ? props.knowledge.content.slice(0, 120) + '......' : props.knowledge.content
  if (!keyword) return sliceContent
  const index = cazeContent.indexOf(keyword)
  sliceContent = cazeContent.slice(Math.max(index - 50, 0), index + 70) + '......'
  return sliceContent.replace(keyword, `<span style="color: skyblue">${keyword}</span>`)
})
</script>

<style lang="scss" scoped>
.case-list-item {
  display: flex;
  // flex: 0 0 calc(33.333% - 9rem);
  width: 20rem;
  // margin: 0 4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 23rem;
  border-radius: 0.75rem;
  border: 2px solid var(--secondary-color);
  background: var(--photo-background);

  .case-title {
    width: 17rem;
    color: var(--secondary-color);
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  .case-content {
    width: 15rem;
    color: var(--text-color);
    text-align: left;
    padding: 0 2rem;
    margin-bottom: 2rem;
  }
}
</style>
