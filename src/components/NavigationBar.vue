<template>
<v-main>
    <!-- superior -->
    <v-app-bar fixed dark color="#88498F">
        <v-icon icon x-large>mdi-hand</v-icon>
        <span>{{name}}</span>
    </v-app-bar>

    <!-- inferior -->
    <v-bottom-navigation
        :value="activeBtn"
        color="#88498F"
        fixed bottom
    >
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
import {mapGetters} from 'vuex'

export default{
    data (){
        return{
            name: 'Handmade',
        }
    },
    methods:{
        openProfile(){
            let userNome = "me"
            this.$router.push(`/profile/${userNome}`)

        },
        openFeed(){
            this.$router.push('/')
        },
        openSearch(){
            this.$router.push('/search/')
        }
    },
    computed:{
        ...mapGetters('timeline',['getPosts'])
    },
}
</script>

<style>

</style>