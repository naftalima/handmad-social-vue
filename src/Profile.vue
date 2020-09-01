<template>
<v-main>
    <div class="navigation-bar">
        <NavigationBar/>
    </div>

    <div class="profile-card">
        <v-card >
            <!-- <v-row justify="center">
                <v-col>  -->
                    <v-avatar class="profile" size="120px" tile>
                        <v-img src="https://i.pinimg.com/originals/65/3d/01/653d01c977ea7ce63d9eb06f5a273d7d.jpg" alt="Profile Picture"></v-img>
                    </v-avatar>
                <!-- </v-col>
                <v-col > -->
                    <v-list item>
                        <v-list-item-content>
                            <v-list-item-title class="title">Hermione Granger</v-list-item-title>
                            <v-list-item-subtitle> Hogwarts Student </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list>
                <!-- </v-col>
            </v-row> -->
        </v-card>
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
.profile-card{
    width: 100%;
    padding-top: 64px;
    padding-bottom: 56px;

} 
</style>