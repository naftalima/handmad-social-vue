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
  key:'fhir_viewr_',
  storage: window.localStorage,
  module:[
    'timeline'
  ]
})

const timeline ={
  namespaced:true,
  state:{
    posts: [
      {user: 'user0', texto:'Panda Amigurumi',imagem:"https://img.elo7.com.br/product/original/2C1432A/receita-urso-panda-amigurumi-em-pdf.jpg"}, // imagem: null
      {user: 'user2', texto: 'Qual a diferença faz o tamanho da agulha para amigurumi?',imagem:undefined},
  ]
  },
  getters:{
    getPosts: state => {
      return state.posts
    }
  },
  actions:{
    sendPosts({commit},post){
      commit('addPost',post)
    }
  },
  mutations:{
    addPost(state,post){
      state.posts.push(post)
    }
  }
}

const store= new Vuex.Store({
  modules:{
    timeline: timeline
  },
  plugins:[VuexPersist.plugin]
})


const routes=[
  {
    path:'/',
    component:Feed 
  },
  {
    path:'/profile/',
    component:Profile
  },
  {
    path:'/search/',
    component:Search
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
