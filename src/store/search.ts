import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const search = ref(false)
  function changeSearch(visiable: boolean) {
    search.value = visiable
  }

  return { search, changeSearch }
})
