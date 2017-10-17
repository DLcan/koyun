
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
      apiKey: 'AIzaSyBnaqYbq2rpILp3THSOFo0rg8P1tlCiFX0',
      authDomain: 'koyun-48596.firebaseapp.com',
      databaseURL: 'https://koyun-48596.firebaseio.com',
      projectId: 'koyun-48596',
      storageBucket: 'koyun-48596.appspot.com'
    })
    this.$store.dispatch('Yukle')
    this.$store.dispatch('YukleD')
    this.$store.dispatch('YukleE')
    this.$store.dispatch('YukleK')
  }
})
