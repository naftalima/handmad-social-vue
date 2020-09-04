<template>
  <v-main>
    <div class="navigation-bar">
      <NavigationBar  :userLoggedProp = userLogged />
      <!-- <NavigationBar/> -->
    </div>

    <div class="input">
      <v-app-bar>
        <v-text-field
          @keyup.enter="send()"
          v-model="field"
          label="Fez algo novo?"
          solo
          hide-details
        ></v-text-field>

        <v-file-input
          v-model="file"
          :rules="rules"
          accept="image/png, image/jpeg, imagebmp"
          prepend-icon="mdi-camera"
        ></v-file-input>

        <v-btn @click="send()" icon x-large>
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <div class="post-container">
      <div v-for="post in posts " :key="post.name">
        <PostContainer :postProp="post" :userLoggedProp="userLogged" />
      </div>
    </div>
  </v-main>
</template>

<script>
import { firestore } from './firebase'
import {mapGetters} from 'vuex'
import PostContainer from "./components/PostContainer.vue"
import NavigationBar from "./components/NavigationBar.vue"

export default{
    components:{
        PostContainer,
        NavigationBar
    },
    data (){
        return{
            file: undefined,
            field:'',
            posts: [],
            userLogged:{},
            rules: [value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']
        }
    },
    methods:{
        send(){
            if (this.file !== '' || this.file !== undefined){
                let post = {
                userName: this.userLogged.userName,
                postId: `${new Date().toUTCString()}` ,
                texto: this.field,
                imagem: this.file
                };
                this.$store.dispatch('timeline/sendPosts',post);
                this.field= '';
                this.file = undefined;
                }
        }
    },
    computed:{
        ...mapGetters('timeline',['getPosts']),
        ...mapGetters('users',['getUserLogged'])
    },
    created(){
        firestore.collection("timeline").orderBy("createTime",'desc')
        .onSnapshot( (querySnapshot)=> {
            this.posts =[]
            querySnapshot.forEach((doc)=>{
                this.posts.push(doc.data())
            })
        }),
        firestore.collection("users").where("email","==",this.getUserLogged)
        .onSnapshot(querySnapshot => {
          this.userLogged={};
          querySnapshot.forEach(doc=>{
            this.userLogged = doc.data();
            console.log(this.userLogged)
            console.log(typeof(this.userLogged))
          })
        })   
    }
}
</script>

<style>
.post-container {
  width: 100%;
  /* padding-top: 0px; */
  padding-bottom: 56px;
}

.input {
  width: 100%;
  padding-top: 64px;
  padding-bottom: 56px;
}
</style>