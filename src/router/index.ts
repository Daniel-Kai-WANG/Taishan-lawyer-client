import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'
import News from '@/views/news/index.vue'
import NewsList from '@/views/news/list.vue'
import NewsDetail from '@/views/news/detail.vue'
import Team from '@/views/team/index.vue'
import TeamMember from '@/views/team/member.vue'
import Case from '@/views/case/index.vue'
import Contact from '@/views/contact/index.vue'
import SearchResult from '@/views/searchResult/index.vue'
import CaseDetail from '@/views/case/detail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    redirect: '/news/list',
    children: [
      {
        path: '/news/detail/:id',
        name: 'NewsDetail',
        component: NewsDetail,
      },
      {
        path: '/news/list',
        name: 'NewsList',
        component: NewsList,
      },
    ],
  },

  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/team/member/:id',
    name: 'TeamMember',
    component: TeamMember,
  },
  {
    path: '/case',
    name: 'Case',
    component: Case,
  },
  {
    path: '/case/detail/:id/:type',
    name: 'CaseDetail',
    component: CaseDetail,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: SearchResult,
  },
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
