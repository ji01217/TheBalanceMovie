import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'
export default {
  state: {
    random_questions: null,
    questions: null,
    answers: null,
    question_answer: null,
    answer1: null,
    answer2: null,
    question_num: 0,
    movies: null,
    movie: {},
    total: 0,
    onresult: false,
  },
  getters: {
    random_questions: state => state.random_questions,
    questions: state => state.questions,
    answers: state => state.answers,
    question_answer: state => state.answers,
    answer1: state => state.answer1,
    answer2: state => state.answer2,
    question_num: state => state.question_num,
    left: (state) => {
      return state.question_num !== 0
    },
    right: (state) => {
      return state.question_num !== 3
    },
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    IsMovie: state => !_.isEmpty(state.movie),
    total: (state) => state.total,
    onresult: (state) => state.onresult
  },
  mutations: {
    FETCH_RANDOM_QUESTIONS: (state, questions) => state.random_questions = questions,
    FETCH_QUESTIONS: (state, questions) => state.questions = questions,
    SET_ANSWERS: (state, answers) => state.answers = answers,
    SET_ANSWER1: (state, answer) => state.answer1 = answer,
    SET_ANSWER2: (state, answer) => state.answer2 = answer,
    SET_QUESTION_NUM: (state, num) => state.question_num = num,
    FETCH_SELECTMOVIES: (state, selectmovies) => state.movies = selectmovies,
    FETCH_RECENTMOVIES: (state, recentmovies) => state.movies = recentmovies,
    FETCH_POPULARMOVIES: (state, popularmovies) => state.movies = popularmovies,
    FETCH_RANDOMMOVIES: (state, randommovies) => state.movies = randommovies,
    FETCH_COLLECTIONMOVIES: (state, collectionmovies) => state.movies = collectionmovies,
    SET_MOVIE: (state, movie) => state.movie = movie,
    SET_INIT: (state, init) => state.movies = init,
    SET_TOTAL: (state, total) => state.total = total,
    ON_RESULT_OPENED: (state, onresult) => state.onresult = !onresult,
    SET_ANSWER1_COMMENTS: (state, comments) => (state.answer1.comments = comments),
    SET_ANSWER2_COMMENTS: (state, comments) => (state.answer2.comments = comments),
  },
  actions: {
    fetchRandomQuestions({ commit, getters }) {
      axios({
        url: drf.community.randomQuestions(),
        method: 'get',
        headers: getters.authHeader
      }).then(res => {
        const questions = res.data
        commit('FETCH_RANDOM_QUESTIONS', questions)
        // commit('SET_QUESTION_NUM', 0)
        const answer1 = questions[0].answer[0]
        const answer2 = questions[0].answer[1]
        commit('SET_ANSWER1', answer1)
        commit('SET_ANSWER2', answer2)
      })
    },
    leftQuestion({ commit, getters }) {
      const question_num = getters.question_num
      commit('SET_QUESTION_NUM', question_num - 1)
      const answer1 = getters.random_questions[question_num - 1].answer[0]
      const answer2 = getters.random_questions[question_num - 1].answer[1]
      commit('SET_ANSWER1', answer1)
      commit('SET_ANSWER2', answer2)
      commit('SET_INIT', null)
      commit('ON_RESULT_OPENED', true)
    },
    rightQuestion({ commit, getters }) {
      const question_num = getters.question_num
      commit('SET_QUESTION_NUM', question_num + 1)
      const answer1 = getters.random_questions[question_num + 1].answer[0]
      const answer2 = getters.random_questions[question_num + 1].answer[1]
      commit('SET_ANSWER1', answer1)
      commit('SET_ANSWER2', answer2)
      commit('SET_INIT', null)
      commit('ON_RESULT_OPENED', true)
    },
    fetchQuestions({ commit, getters }) {
      axios({
        url: drf.community.questions(),
        method: 'get',
        headers: getters.authHeader
      }).then(res => {
        const questions = res.data
        commit('FETCH_QUESTIONS', questions)
      })
    },
    fetchSelectMovies({ commit, getters, dispatch }, answerId) {
      axios({
        url: drf.movies.selectmovie(answerId),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('FETCH_SELECTMOVIES', res.data)
          dispatch('MovieSelectUser', answerId)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    MovieSelectUser({ commit, getters }, answerId) {
      axios({
        url: drf.movies.selectmovie(answerId),
        method: 'post',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ANSWERS', res.data)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    fetchRecentMovies({ commit, getters }) {
      axios({
        url: drf.movies.recent(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('FETCH_RECENTMOVIES', res.data)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    fetchPopularMovies({ commit, getters }) {
      axios({
        url: drf.movies.popular(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('FETCH_POPULARMOVIES', res.data)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    fetchRandomMovies({ commit, getters }) {
      axios({
        url: drf.movies.random(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('FETCH_RANDOMMOVIES', res.data)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    fetchCollectionMovies({ commit, getters }, username) {
      axios({
        url: drf.movies.collection(username),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('FETCH_COLLECTIONMOVIES', res.data.like_movies)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    likeMovie({ commit, getters }, movieId) {
      axios({
        url: drf.movies.likeMovie(movieId),
        method: 'post',
        headers: getters.authHeader
      })
        .then(res => {
          commit('SET_MOVIE', res.data)
        })
        .catch(err => {
          console.error(err.response)
        })
    },
    fetchMovie({ commit, getters }, movieId) {
      axios({
        url: drf.movies.movie(movieId),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.reponse.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    fetchTotal({ commit, dispatch }, total) {
      if (total !== 0) {
        commit('SET_TOTAL', total)
      } else {
        commit('SET_TOTAL', 0)
      }
      dispatch('onResultOpened')
    },
    onResultOpened({ commit }) {
      commit('ON_RESULT_OPENED', this.getters.onresult)
    },
    fetchAnswerComment({ commit, getters }, answerId) {
      axios({
        url: drf.community.comments(answerId),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_ANSWER_COMMENTS', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },
    createAnswerComment({ commit, getters }, { answerId, content }) {
      const comment = { content }
      axios({
        url: drf.community.comments(answerId),
        method: 'post',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          if (answerId % 2 === 1) {
            commit('SET_ANSWER1_COMMENTS', res.data)
          } else {
            commit('SET_ANSWER2_COMMENTS', res.data)
          }
        })
        .catch(err => console.error(err.response))
    },
    updateAnswerComment({ commit, getters }, { answerId, commentPk, content }) {
      const comment = { content }
      axios({
        url: drf.community.comment(answerId, commentPk),
        method: 'put',
        data: comment,
        headers: getters.authHeader,
      })
        .then(res => {
          if (answerId % 2 === 1) {
            commit('SET_ANSWER1_COMMENTS', res.data)
          } else {
            commit('SET_ANSWER2_COMMENTS', res.data)
          }
        })
        .catch(err => console.error(err.response))
    },
    deleteAnswerComment({ commit, getters }, { answerId, commentPk }) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.community.comment(answerId, commentPk),
          method: 'delete',
          data: {},
          headers: getters.authHeader,
        })
          .then(res => {
            if (answerId % 2 === 1) {
              commit('SET_ANSWER1_COMMENTS', res.data)
            } else {
              commit('SET_ANSWER2_COMMENTS', res.data)
            }
          })
          .catch(err => console.error(err.response))
      }
    },
    setInit({ commit }) {
      commit('SET_INIT', null)
    },
    adminCreateMovie({ commit, getters }, movie) {
      
      axios({
        url: drf.admins.create(),
        method: 'post',
        data: movie,
        headers: getters.authHeader,
      })
        .then(res => {
          console.log(res.data)
          commit('SET_MOVIE', res.data)
          router.push({
            name: 'MovieDetail',
            params: { movieId: getters.movie.id }
          })
        })
    },
    adminUpdateMovie({ commit, getters }, { id, title, release_date, popularity, vote_count, vote_average, overview, poster_path, adult, youtube_key}) {
      axios({
        url: drf.admins.change(id),
        method: 'put',
        data: { id, title, release_date, popularity, vote_count, vote_average, overview, poster_path, adult, youtube_key },
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SET_MOVIE', res.data)
          router.push({
            name: 'MovieDetail',
            params: { movieId: getters.movie.id }
          })
        })
        .catch(err => {
          console.error(err.response)})
    },
    adminDeleteMovie({ commit, getters }, movieId) {
      
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.admins.change(movieId),
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(() => {
            commit('SET_MOVIE', {})
            router.push({ name: 'Movie' })
          })
          .catch(err => console.error(err.response))
      }
    },

  },
}