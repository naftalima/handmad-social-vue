<template>
  <v-card raised class="mx-auto">
    <v-img
      v-if="postProp.imagem"
      :src="postProp.imagem"
      class="white--text align-end"
      height="200px"
    >
      <v-card-title
        class="font-weight-bold orange--text"
        @click="openProfile(postProp.userName)"
      >{{postProp.userName ? postProp.userName : 'Anônimo'}}</v-card-title>
    </v-img>

    <v-card-title
      v-else
      class="font-weight-bold orange--text"
      @click="openProfile(postProp.userName)"
    >{{postProp.userName ? postProp.userName : 'Anônimo'}}</v-card-title>

    <v-card-text class="text--primary">{{postProp.texto}}</v-card-text>

    <!-- <span>{{postProp}}</span> -->
    <v-container
      v-if="userLoggedProp.userName === postProp.userName"
    >
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn icon @click="createAccDialog = true">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-btn icon @click='deletar(postProp)'>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>

      <v-dialog v-model="createAccDialog">
        <v-card>
          <v-col>
            <v-text-field label="edit" v-model="newTexto"></v-text-field>
            <v-btn icon @click="edit(postProp)"><v-icon>mdi-send</v-icon></v-btn>
          </v-col>
        </v-card>
      </v-dialog>

    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["postProp","userLoggedProp"],
  data(){
    return{
      createAccDialog: false,
      newTexto: ''
    }
  },
  methods: {
    openProfile(userNome) {
      this.$router.push(`/profile/${userNome}`);
    },
    deletar(post){
      this.$store.dispatch('timeline/deletePosts', post);
    },
    edit(post){
      this.$store.dispatch('timeline/editPosts', {post: post, newT: this.newTexto})
      this.newTexto = ''
    }
  },
};
</script>