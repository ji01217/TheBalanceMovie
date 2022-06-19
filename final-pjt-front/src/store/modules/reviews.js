import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'

export default {
  state: {
    review: {},
    reviews: [],
  },
  getters: {
    isReview: state => !_.isEmpty(state.review),
    review: state => state.review,
    reviews: state => state.reviews,
    isAuthor: (state, getters) => {
      return state.review.user?.username === getters.currentUser.username
    },
  },
  mutations: {
    SET_REVIEW: (state, review) => state.review = review,
    SET_REVIEWS: (state, reviews) => state.reviews = reviews,
    SET_REVIEW_COMMENTS: (state, comments) => (state.review.comments = comments),
  },
  actions: {
    createReview({ commit, getters }, review) {
      axios({
        url: drf.reviews.reviews(review.movieId),
        method: 'post',
        data: review,
        headers: getters.authHeader
      })
        .then(res => {
          console.log(res)
          commit('SET_REVIEW', res.data)
          router.push({
            name: 'MovieDetail',
            params: { MovieId: getters.review.movie }
          })
        })
    },
    fetchReviews({ commit, getters }, movieId) {
      axios({
        url: drf.reviews.reviews(movieId),
        method: 'get',
        headers: getters.authHeader
      })
        .then(res => {
          commit('SET_REVIEWS', res.data)
        })
    },
    fetchReview({ commit, getters }, reviewPk) {
      axios({
        url: drf.reviews.review(reviewPk),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    updateReview({ commit, getters }, { reviewPk, title, content, movieId}) {
      axios({
        url: drf.reviews.review(reviewPk),
        method: 'put',
        data: { title, content },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW', res.data)
          router.push({
            name: 'ReviewDetail',
            params: { reviewPk , movieId}
          })
        })
        .catch(err => {
          console.log(err)
          console.error(err.response)})
    },
    deleteReview({ commit, getters }, review) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.reviews.review(review.reviewPk),
          method: 'delete',
          headers: getters.authHeader,
        })
        .then(() => {
            
            commit('SET_REVIEW', {})
            router.push({ name: 'MovieDetail', params: { movieId: review.movieId} })
          })
          .catch(err => console.error(err.response))
      }
    },

    likeReview({ commit, getters }, reviewPk) {

      axios({
        url: drf.reviews.likeReview(reviewPk),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => commit('SET_REVIEW', res.data))
        .catch(err => console.error(err.response))
    },

    createComment({ commit, getters }, { reviewPk, content }) {

      const comment = { content }

      axios({
        url: drf.reviews.comments(reviewPk),
        method: 'post',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          console.log(res)
          commit('SET_REVIEW_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    updateComment({ commit, getters }, { reviewPk, commentPk, content }) {

      const comment = { content }

      axios({
        url: drf.reviews.comment(reviewPk, commentPk),
        method: 'put',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_REVIEW_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteComment({ commit, getters }, { reviewPk, commentPk }) {

        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.reviews.comment(reviewPk, commentPk),
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              commit('SET_REVIEW_COMMENTS', res.data)
            })
            .catch(err => console.error(err.response))
        }
      },
  },
}