
import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VCard,
  VDataTable,
  VCheckbox,
  VTextField,
  VPagination,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTooltip,
  transitions
} from 'vuetify'

import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import DateFilter from './filters/date'

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VDataTable,
    VCheckbox,
    VTextField,
    VPagination,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTooltip,
    transitions
  }
})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDVZwnyu0qfGe-zLM1SxpHXLKE7beRrc7c',
      authDomain: 'vuekoyun.firebaseapp.com',
      databaseURL: 'https://vuekoyun.firebaseio.com',
      projectId: 'vuekoyun',
      storageBucket: 'vuekoyun.appspot.com'
    })
    this.$store.dispatch('Yukle')
    this.$store.dispatch('YukleD')
    this.$store.dispatch('YukleE')
    this.$store.dispatch('YukleK')
  }
})
