<template>
  <v-main>
    <div class="navigation-bar">
      <NavigationBar :userLoggedProp = userLogged />
      <!-- <NavigationBar />  -->
    </div>

    <div class="profile-card">
      <v-container>
        <v-row justify="center">
          <v-col>
            <v-avatar class="profile" size="120px" tile>
              <v-img
                v-if="this.user.profilePic"
                :src="this.user.profilePic"
                alt="Profile Picture"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list item>
              <v-list-item-content>
                <!-- <v-list-item-title class="title">{{getUser($route.params.name).name}}</v-list-item-title> -->
                <v-list-item-title class="title">{{this.user.name}}</v-list-item-title>
                <v-list-item-subtitle>{{this.user.bio ? this.user.bio:"Hey there! I am using Handmade" }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="user-posters">
      <div v-for="post in posts" :key="post.name">
        <PostContainer :postProp="post" :userLoggedProp = userLogged />
      </div>
    </div>
  </v-main>
</template>

<script>
import { firestore } from "./firebase";
import { mapGetters } from "vuex";
import PostContainer from "./components/PostContainer";
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: {
    NavigationBar,
    PostContainer
  },
  data() {
    return {
      posts: [],
      userLogged: {},
      user: {}
    };
  },
  computed: {
    ...mapGetters("users", ["getUser"])
  },
  created() {
    firestore.collection("timeline").where("userName","==",this.$route.params.name).orderBy("createTime",'desc')
    .onSnapshot(querySnapshot => {
      this.posts = [];
      querySnapshot.forEach(doc => {
        this.posts.push(doc.data());
      });
    });
    firestore.collection("users").where("userName","==",this.$route.params.name)
    .onSnapshot(querySnapshot => {
      this.user = {};
      querySnapshot.forEach(doc => {
        this.user = doc.data();
      });
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
};
</script>

<style>
.profile-card {
  width: 100%;
  padding-top: 64px;
}
.user-posters {
  padding-bottom: 56px;
  width: 100%;
}
</style>