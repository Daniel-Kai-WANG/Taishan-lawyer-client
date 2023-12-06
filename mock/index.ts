import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { Article, Case, Member } from '../src/typings'

let articles: Article[] = []
let members: Member[] = []
let cazes: Case[] = []

const classType = [
  { id: 1, title: '劳动纠纷' },
  { id: 2, title: '人身伤害' },
]

export default [
  {
    url: '/api/getNewsList',
    method: 'get',
    response: () => {
      const newsList: Article[] = Array.from({ length: Random.integer(50, 100) }, () => ({
        id: Random.increment(1),
        author: Random.cname(),
        title: Random.ctitle(5, 10),
        image: Random.image('200x100', Random.color(), '#FFF', 'png', Random.word(3, 5)),
        desc: Random.cparagraph(1, 3),
        content: Random.cparagraph(70, 80),
        date: `${Random.date('yyyy-MM-dd')}`,
      }))

      articles.push(...newsList)
      return { code: 0, data: newsList }
    },
  },
  {
    url: '/api/getArticle',
    method: 'get',
    timeout: 2000,
    response: ({ query }) => {
      const { id } = query
      const article = articles.find((article) => article.id.toString() === id)
      console.log(id)

      if (article) {
        return {
          code: 0,
          data: {
            article,
            prevId: id > 1 ? parseInt(id) - 1 : undefined,
            nextId: id < 10000 ? parseInt(id) + 1 : undefined,
          },
        }
      } else {
        return {
          code: 404,
          message: 'Article not found',
        }
      }
    },
  },
  {
    url: '/api/getMembers',
    method: 'get',
    response: () => {
      const workExperience = Array.from({ length: Random.integer(1, 3) }, () => Random.cword(5, 10)).join(',')
      const fields = Array.from({ length: Random.integer(4, 6) }, () => Random.cword(2, 4)).join(',')
      const personalHonor = Array.from({ length: Random.integer(4, 6) }, () => {
        const year = Random.integer(2010, 2020)
        const honor = Random.ctitle(10, 30)
        return `${year}年3月被评为${honor}`
      })
      console.log(personalHonor)

      const membersList: Member[] = Array.from({ length: Random.integer(3, 6) }, () => ({
        id: Random.increment(1),
        name: Random.cname(),
        position: Random.ctitle(5, 10),
        avatar: Random.image('230x238', Random.color(), '#FFF', 'png', Random.word(3, 5)),
        workExperience,
        fields,
        background: Random.cword(6, 8),
        phoneNumber: `(+86) ${Random.string('number', 11)}`,
        wechat: Random.string('lower', 4) + Random.string('number', 6),
        personalHonor,
      }))

      members = membersList
      return { code: 0, data: membersList }
    },
  },
  {
    url: '/api/getMember',
    method: 'get',
    timeout: 2000,
    response: ({ query }) => {
      const { id } = query
      const member = members.find((member) => member.id.toString() === id)
      if (member) {
        return {
          code: 0,
          data: member,
        }
      } else {
        return {
          code: 404,
          message: 'Member not found',
        }
      }
    },
  },
  {
    url: '/api/getCases',
    method: 'get',
    response: ({ query }) => {
      const { type, page, pageSize } = query
      const caseList: Case[] = Array.from({ length: Random.integer(30, 60) }, () => ({
        id: Random.increment(1),
        title: Random.ctitle(5, 10),
        type: classType.find((clzss) => `${clzss.id}` === type)!,
        image: Random.image('200x100', Random.color(), '#FFF', 'png', Random.word(3, 5)),
        content: Random.cparagraph(70, 80),
        date: `${Random.date('yyyy-MM-dd')}`,
      }))

      cazes.push(...caseList)

      return {
        code: 0,
        data: caseList,
      }
    },
  },
  {
    url: '/api/getCase',
    method: 'get',
    timeout: 2000,
    response: ({ query }) => {
      const { id, type } = query
      const caze = cazes.find((caze) => caze.id.toString() === id && caze.type.id.toString() === type)
      if (caze) {
        return {
          code: 0,
          data: {
            caze,
            prevId: id > 1 ? parseInt(id) - 1 : undefined,
            nextId: id < 10000 ? parseInt(id) + 1 : undefined,
          },
        }
      } else {
        return {
          code: 404,
          message: 'Case not found',
        }
      }
    },
  },
  {
    url: '/api/search',
    method: 'get',
    response: ({ query }) => {
      const { keyword, type, pageSize, pageNumber } = query
      const articleResults = articles.filter(
        (article) => article.title.includes(keyword) || article.desc.includes(keyword),
      )
      const articleLength = articleResults.length
      const memberResults = members.filter(
        (member) =>
          member.name.includes(keyword) || member.position.includes(keyword) || member.workExperience.includes(keyword),
      )
      const memberLength = memberResults.length
      const casesResults = cazes.filter((caze) => caze.title.includes(keyword) || caze.content.includes(keyword))
      const casesLength = casesResults.length

      return {
        code: 0,
        data: {
          articles: type === 'article' ? articleResults : undefined,
          members: type === 'member' ? memberResults : undefined,
          cases: type === 'case' ? casesResults : undefined,
          total: {
            articleLength,
            memberLength,
            casesLength,
          },
          type,
          pageSize,
          pageNumber,
        },
      }
    },
  },
] as MockMethod[]
