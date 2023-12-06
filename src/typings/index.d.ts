export type Article = {
  id: number
  author: string
  title: string
  picture: string
  content: string
  time: string
}

export type ArticleList = {
  id: number
  title: string
  desc: string
}
// export type Clzss = {
//   id: number
//   title: string
// }

export type CaseList = {
  id: number
  title: string
  articleType: string
  content: string
}

export type Case = {
  id: number
  title: string
  articleType: string
  content: string
  picture: string
  releaseTime: string
}

export type Member = {
  id: number
  name: string
  position: string
  avatar: string
  workExperience: string
  fields: string
  background: string
  phoneNumber: string
  wechat: string
  personalHonor: string[]
}

export type ApiResponse<T> = {
  data: T
}

export interface CarouselInstance {
  next: () => void
  prev: () => void
}

export interface FormState {
  name: string
  phone: string
  email: string
  content: string
}

export type FormInputField = keyof FormState

export interface FormField {
  prop: FormInputField
  label: string
  placeholder: string
  type?: string
}
