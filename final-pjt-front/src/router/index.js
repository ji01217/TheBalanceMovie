import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFound404 from '../views/NotFound404.vue'
import MovieView from '@/views/MovieView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import ReviewNewView from '@/views/ReviewNewView.vue'
import ReviewDetailView from '@/views/ReviewDetailView.vue'
import ReviewEditView from '@/views/ReviewEditView.vue'
import RandomMovie from '@/views/RandomMovie.vue'
import RecentMovie from '@/views/RecentMovie.vue'
import PopularMovie from '@/views/PopularMovie.vue'
import CollectionMovie from '@/views/CollectionMovie.vue'
import CommunityView from '@/views/CommunityView.vue'
import AdminMovieCreate from '@/views/AdminMovieCreate.vue'
import AdminMovieEdit from '@/views/AdminMovieEdit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile/:username',  // /profile/neo
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/',
    name: 'Movie',
    component: MovieView,
  },
  {
    path: '/movies/:movieId',
    name: 'MovieDetail',
    component: MovieDetailView,
  },
  {
    path: '/reviews/new/:movieId',
    name: 'ReviewNew',
    component: ReviewNewView,
  },
  {
    path: '/reviews/:reviewPk/:movieId',
    name: 'ReviewDetail',
    component: ReviewDetailView,
  },
  {
    path: '/reviews/:reviewPk/:movieId/edit',
    name: 'ReviewEdit',
    component: ReviewEditView
  },
  {
    path: '/recent',
    name: 'RecentMovie',
    component: RecentMovie,
  },
  {
    path: '/popular',
    name: 'PopularMovie',
    component: PopularMovie,
  },
  {
    path: '/random',
    name: 'RandomMovie',
    component: RandomMovie,
  },
  {
    path: '/collection/:username',
    name: 'CollectionMovie',
    component: CollectionMovie,
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityView,
  },
  {
    path: '/admin/movie_create',
    name: 'AdminMovieCreate',
    component: AdminMovieCreate,
  },
  {
    path: '/admin/movie_edit/:movieId',
    name: 'AdminMovieEdit',
    component: AdminMovieEdit,
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '*',
    redirect: '/404'
  },

]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() { 
    return { x: 0, y: 0 } 
  },
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 이전 페이지에서 발생한 에러메시지 삭제
  
  store.commit('SET_AUTH_ERROR', null)
  store.commit('SET_INIT', null)
  const { isLoggedIn } = store.getters
  const noAuthPages = ['login', 'signup']
  const isAuthRequired = !noAuthPages.includes(to.name)
  if (isAuthRequired && !isLoggedIn) {
    alert('회원가입 후에 진행해 주세요~')
    next({ name: 'login' })
  } else {
    next()
  }

  if (!isAuthRequired && isLoggedIn) {
    alert('인증이 안된 유저입니다. 확인해주세요~')
    next({ name: 'Movie' })
  }


})

export default router
