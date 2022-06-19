const HOST = 'http://localhost:8000/api/v1/'

const ADMIN = 'admin/'
const ACCOUNTS = 'accounts/'
const COMMUNITY = 'community/'
const MOVIES = 'movies/'
const REVIEWS = 'reviews/'


export default {
  admins: {
    create: () => HOST + MOVIES + ADMIN + 'movie_create/',
    change: (movieId) => HOST + MOVIES + ADMIN + 'movie/' + `${movieId}/`,
  },

  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profile: username => HOST + ACCOUNTS + 'profile/' + username,
  },
  community: {
    randomQuestions: () => HOST + COMMUNITY + 'questions/' + 'random/',
    questions: () => HOST + COMMUNITY + 'questions/',
    question: questionPk => HOST + COMMUNITY + 'question/' + `${questionPk}/`,
    comments: answerPk => HOST + COMMUNITY + `${answerPk}/`,
    comment: (answerPk, commentPk) => HOST + COMMUNITY + `${answerPk}/` + `${commentPk}/`,
  },
  movies: {
    recent: () => HOST + MOVIES + 'recent/',
    popular: () => HOST + MOVIES + 'popular/',
    random: () => HOST + MOVIES + 'random/',
    collection: username => HOST + MOVIES + 'collection/' + `${username}/`,
    movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    likeMovie: moviePk => HOST + MOVIES + `${moviePk}/` + 'like/',
    selectmovie: answerId => HOST + MOVIES + 'select/' + `${answerId}/`,

  },
  reviews: {
    reviews: moviePk => HOST + REVIEWS + `${moviePk}/`,
    review: reviewPk => HOST + REVIEWS + 'review/' + `${reviewPk}/`,
    likeReview: reviewPk => HOST + REVIEWS + 'review/' + `${reviewPk}/` + 'like/',
    comments: reviewPk => HOST + REVIEWS + `${reviewPk}/` + 'comments/',
    comment: (reviewPk, commentPk) => HOST + REVIEWS + `${reviewPk}/` + 'comments/' + `${commentPk}/`,
  }
}