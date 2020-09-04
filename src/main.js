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
import Firebase, { auth, firestore, FieldValue, storage} from './firebase' 

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
    user: [
      {
        userName: 'ronron',
        email: "ronron@hogwarts.com",
        name: 'Ron Weasley',
        bio: '',
        profilePic: "https://i.gifer.com/47UM.gif"
      },
      {
        userName: 'harrypttr',
        email: "harrypttr@gmail.com",
        name: 'Harry',
        bio: 'eu sou só harry',
        profilePic: "https://i.pinimg.com/originals/94/64/59/94645992bdb14a27ce21f8c3e792d9ba.jpg"
      },
      {
        userName: 'mione',
        email: "mione@hotmail.com",
        name: 'Hermione Granger',
        bio: 'hastag liberdade aos elfos',
        profilePic: "https://i.pinimg.com/originals/08/7b/7c/087b7c08e037a803ba77a2db24eb8cb0.jpg"
      },
    ],
    usuario:null,
    loginError:null
  },
  getters: {
    getUsers: state => {
      return state.user
    },
    getUser: state => userNome => {
      return state.user.find(element => element.userName === userNome);
    },
    getUserLogged: state => {
      return state.user.find(element => element.email == state.usuario.email)
    }
  },
  actions: {
    sendUsers({ commit }, user) {
      commit('addUser', user)
    },
    async createAcc({ commit }, payload){
      const {email,password}= payload
      auth.createUserWithEmailAndPassword(email, password)
      .then((res)=>{
        console.log(res)
        commit('setUser',res.user)
        router.push('/')
      })
      .catch((err)=>{
        commit('setLoginError',err)
        console.error(err)
      })
    },
    async login({commit},payload ){
      const {email, password} =payload
      auth.signInWithEmailAndPassword(email,password)
      .then((res)=>{
        console.log(res)
        commit('setUser',res.user)
        router.push('/')
      })
      .catch((err)=>{
        commit('setLoginError',err)
        console.error(err)
      })
    }
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user)
    },
    setUser(state,user){
        state.usuario = user
      },
    // setUser(state,user){
    //   let usuario =
    //   {
    //    userName: undefined
    //    email: user.email
    //    name: undefined
    //    bio: undefined 
    //    profilePic: undefined
    //   }
    //   state.usuario = user
    // },
    setLoginError(state, error){
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
  async sendPosts({},post){
/* eslint-enable */
      try{
        post.createTime = FieldValue.serverTimestamp()
        if(post.imagem){
          const pic = await storage.ref().child(`${post.userName}/${new Date().toUTCString()}`).put(post.imagem)
          const url = await pic.ref.getDownloadURL()
          post.imagem = url
          // console.log("carregou")
        }
        await firestore.collection('timeline').add(post)
        // console.log("funcionou")
      }catch(err){
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
    path: '/login/',
    component: Login
  },
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
