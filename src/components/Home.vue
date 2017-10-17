
<template>
   <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-media src="/koyun/static/koyun33.png" height="400px">
              </v-card-media>
              <v-card-actions>
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
