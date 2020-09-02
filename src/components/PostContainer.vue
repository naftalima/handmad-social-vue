<template>
    <v-card
        raised
        class='mx-auto'
    >         
        <v-img
            v-if="postProp.imagem" :src="postProp.imagem"
            class="white--text align-end"
            height="200px"
        >
            <v-card-title 
                class='font-weight-bold orange--text'
                @click="openProfile(postProp.userName)"
            >
                {{postProp.userName ?  postProp.userName : 'Anônimo'}}
            </v-card-title>
        </v-img>

        <v-card-title 
            v-else
            class='font-weight-bold orange--text'
            @click="openProfile(postProp.userName)"
        >
            {{postProp.userName ?  postProp.userName : 'Anônimo'}}
        </v-card-title>

        <v-card-text class="text--primary">{{postProp.texto}}</v-card-text>

        <v-card-actions>
            <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
export default {
    props:['postProp'],
    methods:{
        openProfile(userNome){
            this.$router.push(`/profile/${userNome}`)
        }
    }

}


</script>