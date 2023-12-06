import { defineStore } from "pinia"
import { ref } from "vue"

export const useLanguageStore = defineStore('language', () => {
  const language = ref('cn')
  function changeLanguage(lang: "cn" | "en") {
    language.value = lang
  }

  return { language, changeLanguage } 
})