import Vue from 'vue'
import App from './App.vue'
import Feed from './Feed.vue'
import Profile from './Profile.vue'
import Search from './Search.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const VuexPersist = new VuexPersistence({
  key: 'fhir_viewr_',
  storage: window.localStorage,
  module: [
    'timeline'
  ]
})


const users = {
  namespaced: true,
  state: {
    user: [
      {
        userName: 'ronron',
        name:'Ron Weasley',
        bio: 'Sou um Weasley',
        profilePic: "https://i.ytimg.com/vi/RvdpcOwumlY/hqdefault.jpg"
      },
      {
        userName: 'harrypttr',
        name:'Harry',
        bio: 'eu sou só harry',
        profilePic: "https://i.pinimg.com/originals/94/64/59/94645992bdb14a27ce21f8c3e792d9ba.jpg"
      },
      {
        userName: 'me',
        name:'MIone',
        bio: 'hastag liberdade aos elfos',
        profilePic: "https://i.pinimg.com/originals/08/7b/7c/087b7c08e037a803ba77a2db24eb8cb0.jpg"
      }, 
    ]
  },
  getters: {
    getUsers: state => {
      return state.user
    },
    getUser: state => userNome => {
      return state.user.find(element => element.userName === userNome);
    }

  },
  actions: {
    sendUsers({ commit }, user) {
      commit('addUser', user)
    }
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user)
    }
  }
}

const timeline = {
  namespaced: true,
  state: {
    posts: [
      {
        userName: 'ronron',
        postId: 0,
        texto: 'Qual a diferença faz o tamanho da agulha para amigurumi?',
        imagem: undefined
      },
      {
        userName: 'harrypttr',
        postId:1,
        texto: 'Hedwig Amigurumi',
        imagem: "https://i.pinimg.com/736x/ec/40/bd/ec40bdef4177aef80e8f0a627b2fcc66.jpg"
      },
      {
        userName: 'me',
        postId:2,
        texto: '#FALE (Fundação de Apoio à Libertação dos Elfos-Domésticos)',
        imagem: "https://img.elo7.com.br/product/zoom/2F297D2/dobby-amigurumi-harry-potter.jpg"
      },
    ]
  },
  getters: {
    getPosts: state => {
      return state.posts
    },
    getUserPosts: state => userName => {
      return state.posts.filter(post => post.userName === userName)
    }
  },
  actions: {
    sendPosts({ commit }, post) {
      commit('addPost', post)
    },
    deletePosts({commit},  post){
      commit('delPost',post)
    }
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post)
    },
    delPost(state,post){
      var index = state.posts.findIndex(p => p.postId == post.postId)
      state.posts.splice(index,1)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    timeline: timeline,
    users: users
  },
  plugins: [VuexPersist.plugin]
})


const routes = [
  {
    path: '/',
    component: Feed
  },
  {
    path: '/profile/:name',
    component: Profile
  },
  {
    path: '/search/',
    component: Search
  }
]


const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // GAMBIARRA MELHORAR DEPOIS 
//   if(from.fullPath === '/profile/me' && to.fullPath === '/profile/profile/me') {next( '/profile/me')}
//   else{ next()}
// })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
