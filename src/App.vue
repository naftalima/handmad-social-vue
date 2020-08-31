<template>
 <v-app>
     <v-main>
        <v-app-bar fixed dark color="#88498F">
            <v-icon icon x-large>mdi-hand</v-icon>
            <span>{{name}}</span>
        </v-app-bar>

        <div class='input'>
            <v-app-bar >
                <v-text-field 
                    @keyup.enter='send()' 
                    v-model='field' 
                    label='Fez algo novo?' 
                    solo hide-details
                ></v-text-field>

                <v-file-input 
                    @change="onFileChange"
                    :rules="rules" accept="image/png, image/jpeg, imagebmp" 
                    prepend-icon="mdi-camera"
                ></v-file-input>

                <v-btn @click='send()' icon x-large >
                    <v-icon >mdi-send</v-icon>
                </v-btn>
            </v-app-bar>
        </div>

        <div class='post-container'>
            <div v-for='post in getPosts.slice().reverse() ' :key='post'>
                <PostContainer :postProp='post'/>
            </div>
        </div>

        <v-bottom-navigation
            :value="activeBtn"
            color="#88498F"
            fixed bottom
        >
            <v-btn>
            <span>Search</span>
            <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn>
            <span>Feed</span>
            <v-icon>mdi-hand-right</v-icon>
            </v-btn>

            <v-btn>
            <span>Profile</span>
            <v-icon>mdi-face-profile-woman</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-main>       
 </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import PostContainer from "./components/PostContainer.vue"

export default{
     components:{
        PostContainer
    },
    data (){
        return{
            name: 'Handmade',
            field:'',
            rules: [value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']
        }
    },
    methods:{
        send(){
            let post = {
                user:'me',
                texto: this.field,
                imagem: this.url
            }
            // this.posts.push(post)
            this.$store.dispatch('timeline/sendPosts',post)
            this.field= ''
            this.url = undefined
        },
        onFileChange(e) {
            const file = e;
            this.url = URL.createObjectURL(file);
            console.log(this.url);
        }
    },
    computed:{
        ...mapGetters('timeline',['getPosts'])
    },
}
</script>

<style>
.post-container{
    width: 100%;
    /* padding-top: 0px; */
    padding-bottom: 56px;
} 

.input{
    width: 100%;
    padding-top: 64px;
    /* padding-bottom: 56px; */
}


/* COLORS

https://coolors.co/88498f-779fa1-e0cba8-ff6542-564154-053225-01172f-7a4419-755c1b

Plum #88498F
Cadet Blue #779FA1
Wheat #E0CBA8
Portland Orange #FF6542
Dark Green #053225
Oxford Blue #01172f

 */

</style>
