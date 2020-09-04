<template>
  <v-main>
    <!-- superior -->
    <v-app-bar fixed dark color="#88498F">
      <v-icon icon x-large>mdi-hand</v-icon>
      <!-- <span>{{name}}</span> -->
      <span>Handmade</span>
    </v-app-bar>

    <!-- inferior -->
    <v-bottom-navigation :value="activeBtn" color="#88498F" fixed bottom>
      <v-btn @click="openSearch()">
        <span>Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="openFeed()">
        <span>Feed</span>
        <v-icon>mdi-hand-right</v-icon>
      </v-btn>

      <v-btn @click="openProfile()">
        <span>Profile</span>
        <v-icon>mdi-face-profile-woman</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-main>
</template>

<script>
export default {
    props:["userLoggedProp"],
    data(){
        return{
            name: 'Handmade',
        }
    },
    methods:{
        openProfile(){
            // let socorro = "adora"
            this.$router.push(`/profile/${this.userLoggedProp.userName}`);
        },
        openFeed(){
            this.$router.push("/feed/");
        },
        openSearch(){
            this.$router.push("/search/");
        }
    }
}
</script>
