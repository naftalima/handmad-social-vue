<template>
    <v-card
        raised
        class='mx-auto'
    >

         <!-- v-if="url" :src="url" -->
        <v-img
            v-if="postProp.imagem" :src="postProp.imagem"
            class="white--text align-end"
            height="200px"
        >
        </v-img>

        <v-card-title class='font-weight-bold orange--text'>{{postProp.user ?  postProp.user : 'Anônimo'}}</v-card-title>

        <v-card-text class="text--primary">{{postProp.texto}}</v-card-text>

        <v-card-actions>
            <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
export default {
    props:['postProp']
}


</script>