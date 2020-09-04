import Vue from 'vue'
import App from './App.vue'
import Feed from './Feed.vue'
import Profile from './Profile.vue'
import Search from './Search.vue'
import Login from './Login.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Firebase, { auth, firestore, FieldValue, storage } from './firebase'

Vue.config.productionTip = false

Vue.use(Firebase)
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
    usuario: null,
    loginError: null
  },
  getters: {
    getUsers: state => {
      return state.user
    },
    getUserLogged: state => {
      return state.usuario.email
    }
  },
  actions: {
    sendUsers({ commit }, user) {
      commit('addUser', user)
    },
    async createAcc({ commit }, payload) {
      const { email, password, username } = payload
      auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res)
          // auth usuario
          commit('setUser', res.user) 
          //add usario to users collection
          var cliente = {
            email: email,
            userName: username,
            bio: '',
            profilePic: '',
            name: '',
          }
          firestore.collection("users").add(cliente)
          // open feed
          router.push('/feed/')
        })
        .catch((err) => {
          commit('setLoginError', err)
          console.error(err)
        })
    },
    async login({ commit }, payload) {
      const { email, password } = payload
      auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res)
          commit('setUser', res.user)
          router.push('/feed')
        })
        .catch((err) => {
          commit('setLoginError', err)
          console.error(err)
        })
    }
  },
  mutations: {
    // addUser(state,user, username) {
    // },
    setUser(state, user) {
      state.usuario = user
      // console.log(state.usuario.email)
    },
    setLoginError(state, error) {
      state.loginError = error
    }
  }
}

const timeline = {
  namespaced: true,
  state: {
    // posts: [
    //   {
    //     userName: 'ronron',
    //     postId: 0,
    //     texto: 'Qual a diferença faz o tamanho da agulha para amigurumi?',
    //     imagem: undefined
    //   },
    //   {
    //     userName: 'harrypttr',
    //     postId: 1,
    //     texto: 'Hedwig Amigurumi',
    //     imagem: "https://i.pinimg.com/736x/ec/40/bd/ec40bdef4177aef80e8f0a627b2fcc66.jpg"
    //   },
    //   {
    //     userName: 'me',
    //     postId: 2,
    //     texto: '#FALE (Fundação de Apoio à Libertação dos Elfos-Domésticos)',
    //     imagem: "https://img.elo7.com.br/product/zoom/2F297D2/dobby-amigurumi-harry-potter.jpg"
    //   },
    // ]
  },
  getters: {
    // getPosts: state => {
    //   return state.posts
    // },
    getUserPosts: state => userName => {
      return state.posts.filter(post => post.userName === userName)
    }
  },
  actions: {
    // sendPosts({ commit }, post) {
    //   commit('addPost', post)
    // },

    /* eslint-disable */
    async sendPosts({ }, post) {
      /* eslint-enable */
      try {
        post.createTime = FieldValue.serverTimestamp()
        if (post.imagem) {
          const pic = await storage.ref().child(`${post.userName}/${new Date().toUTCString()}`).put(post.imagem)
          const url = await pic.ref.getDownloadURL()
          post.imagem = url
          // console.log("carregou")
        }
        await firestore.collection('timeline').add(post)
        // console.log("funcionou")
      } catch (err) {
        console.log(err)
      }
    },
    deletePosts({ commit }, post) {
      commit('delPost', post)
    }
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post)
    },
    delPost(state, post) {
      var index = state.posts.findIndex(p => p.postId == post.postId)
      state.posts.splice(index, 1)
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
    component: Login
  },
  {
    path: '/feed/',
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
