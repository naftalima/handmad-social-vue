<template>
    <v-main>
            
        <div class="navigation-bar">
            <NavigationBar/>
        </div>

        <div class='input'>
            <v-app-bar >
                
                <v-text-field 
                    @keyup.enter='send()' 
                    v-model='field' 
                    label='Fez algo novo?' 
                    solo hide-details
                ></v-text-field>

                <v-file-input 
                    v-model='file'
                    :rules="rules" accept="image/png, image/jpeg, imagebmp" 
                    prepend-icon="mdi-camera"
                ></v-file-input>

                <v-btn @click='send()' icon x-large >
                    <v-icon >mdi-send</v-icon>
                </v-btn>

            </v-app-bar>
        </div>

        <div class='post-container'>
            <div v-for='post in getPosts.slice().reverse() ' :key='post.name'>
                <PostContainer :postProp='post'/>
            </div>
        </div>

    </v-main>
</template>

<script>
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
            name: 'Handmade',
            file: undefined,
            count:3,
            field:'',
            rules: [value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']
        }
    },
    methods:{
        send(){
            let post = {
                userName:'me',
                postId: this.count,
                texto: this.field,
                imagem: this.file? URL.createObjectURL(this.file) :undefined
            };
            this.$store.dispatch('timeline/sendPosts',post);
            this.field= '';
            this.file = undefined;
            this.count++;
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
    padding-bottom: 56px;
}

</style>