
<template>
   <v-container fluid>
      <v-layout>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              indeterminate
              class="primary--text"
              :width="4"
              :size="90"
              v-if="loading">Kayıtlar yükleniyor</v-progress-circular>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-media src="/koyun/static/koyun33.png" height="400px">
              </v-card-media>
              <v-card-actions v-if="!loading">
                <v-btn v-on:click= "" router to="/disiler" class="error" > Dişiler </v-btn>
                <v-btn v-on:click= "" router to="/erkekler" class="info"> Erkekler </v-btn>
                <v-btn v-on:click= "" router to="/doganlar" class="warning"> Yeni Doğanlar </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-on:click= "" router to="/kesilenler" class="disabled"> Kesilenler </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>    
    </v-container>
</template>
<script>
    export default {
      computed: {
        loading () {
          return this.$store.getters.gLoading
        }
      }
    }
  </script>