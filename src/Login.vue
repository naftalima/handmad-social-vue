<template>
  <v-main>
    <v-text-field @keyup.enter="send()" v-model="email" label="email" solo hide-details></v-text-field>

    <v-text-field @keyup.enter="send()" v-model="senha" label="senha" solo hide-details></v-text-field>

    <v-row>
      <v-col>
        <v-btn icon x-large color-text="blue">Login</v-btn>
      </v-col>
      <v-col>
        <v-btn icon x-large color-text="blue">Cadastrar</v-btn>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      senha: ""
    };
  }
};
</script>

<style>
</style>