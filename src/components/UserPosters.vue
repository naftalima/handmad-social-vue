<template>
<v-main>
    <template>
        <v-container class="green lighten-5">
            <v-row no-gutters>
            <template v-for="n in 4">
                <v-col :key="n">
                <v-card  class="pa-2" outlined tile>
                    <v-img 
                        src="https://d26lpennugtm8s.cloudfront.net/stores/335/332/products/meia-3-4-fun-cantarola-min1-cec381f7628efcd48a15563761703446-640-0.jpg"
                        width="100px"
                        height="100px"
                    ></v-img>
                </v-card>
                </v-col>
                <v-responsive v-if="n === 2" :key="`width-${n}`" width="100%"></v-responsive>
            </template>
            </v-row>
        </v-container>
    </template>
</v-main>
</template>

<script>
export default {

}
</script>

<style>

</style>