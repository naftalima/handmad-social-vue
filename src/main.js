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
    setUser(state, user) {
      state.usuario = user
    },
    setLoginError(state, error) {
      state.loginError = error
    }
  }
}

const timeline = {
  namespaced: true,
  state: {
  },
  getters: {
    // getUserPosts: state => userName => {
    //   return state.posts.filter(post => post.userName === userName)
    // }
  },
  actions: {
    /* eslint-disable */
    async sendPosts({ }, post) {
      /* eslint-enable */
      try {
        post.createTime = FieldValue.serverTimestamp()
        if (post.imagem) {
          const pic = await storage.ref().child(`${post.userName}/${new Date().toUTCString()}`).put(post.imagem)
          const url = await pic.ref.getDownloadURL()
          post.imagem = url
        }
        await firestore.collection('timeline').add(post)
      } catch (err) {
        console.log(err)
      }
    },
    /* eslint-disable */
    async deletePosts({ }, post) {
      /* eslint-enable */
      var idDoc = firestore.collection("timeline").where("postId", "==", post.postId)
      idDoc.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        })
      })
    },
    /* eslint-disable */
    async editPosts({ }, post ,newTexto) {
      /* eslint-enable */
      var idDoc = firestore.collection("timeline").where("postId", "==", post.postId)
      idDoc.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ texto: newTexto })
        }).then(()=>{
          console.log("texto update")
        })
      })
    }

    // deletePosts({ commit }, post) {
    //   commit('delPost', post)
    // }
  },
  mutations: {
    // delPost(state, post) {
    //   var index = state.posts.findIndex(p => p.postId == post.postId)
    //   state.posts.splice(index, 1)
    // }
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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
