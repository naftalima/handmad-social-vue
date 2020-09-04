<template>
  <v-main>
    <div class="navigation-bar">
      <NavigationBar />
    </div>

    <div class="profile-card">
      <!-- <v-card> -->
      <v-container>
        <v-row justify="center">
          <v-col>
            <v-avatar class="profile" size="120px" tile>
              <v-img
                v-if="getUser($route.params.name).profilePic" :src="getUser($route.params.name).profilePic"
                alt="Profile Picture"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list item>
              <v-list-item-content>
                <v-list-item-title class="title">{{getUser($route.params.name).name}}</v-list-item-title>
                <v-list-item-subtitle>{{getUser($route.params.name).bio? getUser($route.params.name).bio: "Hey there! I am using Handmade" }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <!-- </v-card> -->
    </div>

    <div class="user-posters">
      <div v-for="post in getUserPosts($route.params.name).slice().reverse()" :key="post.name">
        <PostContainer :postProp="post" />
      </div>
    </div>
  </v-main>
</template>

<script>
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
      name: "Handmade"
    };
  },
  computed: {
    ...mapGetters("timeline", ["getPosts", "getUserPosts"]),
    ...mapGetters("users", ["getUser"])
  }
};
</script>

<style>
.profile-card {
  width: 100%;
  padding-top: 64px;
}
.user-posters{
  padding-bottom: 56px;
  width: 100%;
}
</style>