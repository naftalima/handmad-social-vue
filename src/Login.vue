<template>
  <v-main>
    <v-container fluid fill-height>
      <v-col>
        <v-img width="200px" height="200px" src="./assets/handmade.png"></v-img>
      </v-col>
      <v-col>
        <v-text-field @keyup.enter="send()" v-model="email" label="email" solo hide-details></v-text-field>

        <v-text-field @keyup.enter="send()" v-model="password" label="senha" type="password" solo hide-details></v-text-field>

        <v-btn color="primary" @click="login()">Entrar</v-btn>

        <v-btn color="primary" @click="createAccDialog= true">Cadastrar</v-btn>
      </v-col>

      <v-dialog v-model="createAccDialog">
        <v-card>
          <v-col>
            <v-text-field label="username" v-model="username"></v-text-field>
            <v-text-field label="Email" v-model="newEmail"></v-text-field>
            <v-text-field label="Senha" type="password" v-model="newPassword"></v-text-field>
            <v-btn color="primary" @click="createAcc()"> Criar</v-btn>
          </v-col>
        </v-card>
      </v-dialog>

    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      createAccDialog:false,

      username:"",
      newEmail:'',
      email: "",
      newPassword:"",
      password: "",
    }
  },
  methods:{
    createAcc(){
      this.$store.dispatch("users/createAcc",{email:this.newEmail, password:this.newPassword, username: this.username})
      this.newEmail = '';
      this.newPassword = '';
      // this.createAccDialog = false;
    },
    login(){
      this.$store.dispatch("users/login",{email:this.email, password:this.password});
      this.email = '';
      this.password = '';
    }
  }
};
</script>

<style>
</style>