<template>
<v-main>
    <div class="navigation-bar">
        <NavigationBar/>
    </div>

    <div class='input'>
        <v-app-bar >
            <v-text-field 
                label='O que você procura?' 
                solo hide-details
            ></v-text-field>
            <v-btn @click='send()' icon x-large >
                <v-icon >mdi-send</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</v-main>
</template>

<script>
import {mapGetters} from 'vuex'
import NavigationBar from "./components/NavigationBar.vue"

export default{
    components:{
        NavigationBar
    },
    data (){
        return{
            name: 'Handmade',
        }
    },
    computed:{
        ...mapGetters('timeline',['getPosts'])
    },
}
</script>

<style>

</style>