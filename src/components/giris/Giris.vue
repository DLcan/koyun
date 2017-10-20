<template>
  <v-container>
      <v-layout row v-if="error">
          <v-flex xs12 sm6 offset-sm3>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
      </v-layout>
      <v-layout  row secondary>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-text>
                <v-container>
                  <form @submit.prevent="onGiris">
                      <v-layout row>
                        <v-flex xs12>
                          <v-text-field
                            name="email"
                            label="Email "
                            id="email"
                            required
                            v-model="email"
                            type="email">
                          </v-text-field>
                        </v-flex>
                      </v-layout>                    
                      <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                          <v-text-field
                            name="password"
                            label="Şifre"
                            id="password"
                            required
                            v-model="password"
                            type= "password">
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                          <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                            :disabled=!formIsValid
                            type="submit"> Kaydet
                            <span slot="loader" class="custom-loader">
                              <v-icon light>cached</v-icon>
                            </span>
                            </v-btn>
                          </v-flex>
                      </v-layout>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      formIsValid () {
        return this.email !== '' && this.password !== ''
      },
      user () {
        return this.$store.getters.gUser
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.gLoading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onGiris () {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('GirisYap', user)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>