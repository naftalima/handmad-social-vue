<template>
  <v-main>
    <div class="navigation-bar">
      <NavigationBar />
    </div>

    <div class="profile-card">
      <v-card>
        <!-- <v-row justify="center">
          <v-col> -->
            <v-avatar class="profile" size="120px" tile>
              <v-img
                v-if="getUser($route.params.name).profilePic" :src="getUser($route.params.name).profilePic"
                alt="Profile Picture"
              ></v-img>
            </v-avatar>
          <!-- </v-col>
          <v-col> -->
            <v-list item>
              <v-list-item-content>
                <v-list-item-title
                  class="title"
                >{{$route.params.name !== "me" ? $route.params.name : "Hermione" }}</v-list-item-title>
                <v-list-item-subtitle>Hogwarts Student</v-list-item-subtitle>
              </v-list-item-content>
            </v-list>
          <!-- </v-col>
        </v-row> -->
      </v-card>
    </div>

    <div class="user-posters">
      <div v-for="post in getUserPosts" :key="post">
        <PostContainer :postProp="post" />
      </div>
    </div>

  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  },
  data() {
    return {
      name: "Handmade"
    };
  },
  computed: {
    ...mapGetters("timeline", ["getPosts","getUserPosts"]),
    ...mapGetters("users", ["getUsers","getUser"])
  }
};
</script>

<style>
.profile-card {
  width: 100%;
  padding-top: 64px;
  /* padding-bottom: 56px; */
}
</style>