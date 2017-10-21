import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cinsiyet: false,
    loading: false,
    error: null,
    items: [],
    erkeks: [],
    dogans: [],
    kesiks: []
  },
  mutations: {
    mYukle (state, payload) {
      state.items = payload
    },
    mYukleD (state, payload) {
      state.dogans = payload
    },
    mYukleE (state, payload) {
      state.erkeks = payload
    },
    mYukleK (state, payload) {
      state.kesiks = payload
    },
    mYeniKayitEkle (state, payload) {
      state.items.push(payload)
    },
    mSetLoading (state, payload) {
      state.loading = payload
    },
    mSetCinsiyet (state, payload) {
      state.cinsiyet = payload
    },
    mSetUser (state, payload) {
      state.user = payload
    },
    mSetError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    GirisYap ({commit}, payload) {
      commit('mSetLoading', true)
      commit('mSetError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('mSetLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('mSetUser', newUser)
          }
        )
        .catch(
          error => {
            commit('mSetLoading', false)
            commit('mSetError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('mSetUser', {
        id: payload.uid
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('mSetUser', null)
    },
    // Kesilenler yukleniyor
    YukleK ({commit}) {
      commit('mSetLoading', true)
      firebase.database().ref('Koyun/Kesilenler').once('value')
        .then((data) => {
          const koyun = []
          const obj = data.val()
          for (let key in obj) {
            koyun.push({
              id: key,
              HayvanAdi: obj[key].HayvanAdi,
              SirtNo: obj[key].SirtNo,
              RecNo: key,
              KulakNumarasi: obj[key].KulakNumarasi,
              Cinsiyet: obj[key].Cinsiyet,
              DogumTarihi: obj[key].DogumTarihi,
              AciklamaTarihi: obj[key].AciklamaTarihi,
              AnneRecNo: obj[key].AnneRecNo
            })
          }
          commit('mYukleK', koyun)
          commit('mSetLoading', false)
          commit('mSetCinsiyet', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('mSetLoading', true)
          }
        )
    },
    // yeni doganlar yukleniyor ---
    YukleD ({commit}) {
      commit('mSetLoading', true)
      firebase.database().ref('Koyun/Dogumlar').once('value')
        .then((data) => {
          const ana = []
          // const doganobj = {}
          const obj = data.val()
          const donem = obj['SonDonem']
          for (let key in obj[donem]) {
            for (let akey in obj[donem][key]) {
              for (let ykey in obj[donem][key][akey]) {
                ana.push({
                  AnaAdi: akey,
                  RecNo: ykey,
                  Cinsiyet: obj[donem][key][akey][ykey].Cinsiyet,
                  SirtNo: obj[donem][key][akey][ykey].SirtNo,
                  Tarih: obj[donem][key][akey][ykey].Tarih,
                  isim: obj[donem][key][akey][ykey].isim
                })
              }
            }
          }
          commit('mYukleD', ana)
          commit('mSetLoading', false)
          commit('mSetCinsiyet', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('mSetLoading', true)
          }
        )
    },
    // dişiler yukleniyor
    Yukle ({commit}) {
      commit('mSetLoading', true)
      firebase.database().ref('Koyun/Canlilar/Disi').once('value')
        .then((data) => {
          const koyun = []
          const obj = data.val()
          for (let key in obj) {
            koyun.push({
              id: key,
              HayvanAdi: obj[key].HayvanAdi,
              SirtNo: obj[key].SirtNo,
              RecNo: obj[key].RecNo,
              KulakNumarasi: obj[key].KulakNumarasi,
              Cinsiyet: obj[key].Cinsiyet,
              DogumTarihi: obj[key].DogumTarihi,
              AnneRecNo: obj[key].AnneRecNo
            })
          }
          commit('mYukle', koyun)
          commit('mSetLoading', false)
          commit('mSetCinsiyet', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('mSetLoading', true)
          }
        )
    },
    // erkekler yukleniyor
    YukleE ({commit}) {
      commit('mSetLoading', true)
      firebase.database().ref('Koyun/Canlilar/Erkek').once('value')
        .then((data) => {
          const koyun = []
          const obj = data.val()
          for (let key in obj) {
            koyun.push({
              id: key,
              HayvanAdi: obj[key].HayvanAdi,
              SirtNo: key,
              RecNo: obj[key].RecNo,
              KulakNumarasi: obj[key].KulakNumarasi,
              Cinsiyet: obj[key].Cinsiyet,
              DamizlikMi: obj[key].DamizlikMi,
              DogumTarihi: obj[key].DogumTarihi,
              AnneRecNo: obj[key].AnneRecNo
            })
          }
          commit('mYukleE', koyun)
          commit('mSetLoading', false)
          commit('mSetCinsiyet', true)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('mSetLoading', true)
          }
        )
    },
    YeniKayitEkle ({commit}, payload) {
      const koyun = {
        Cinsiyet: payload.Cinsiyet,
        SirtNo: payload.SirtNo
      }
      // adreslere dikkat
      firebase.database().ref('Canlilar/Disi').update(koyun)
      // firebase.database().ref('Koyun/Canlilar/Disi').push(koyun)  koyun için
      // firebase.database().ref('vue').push(koyun) deneme için
        .then((data) => {
          const key = data.key
          commit('mYeniKayitEkle', {
            ...koyun,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    clearError ({commit}) {
      commit('mSetError')
    }
  },
  getters: {
    gCinsiyet (state) {
      return state.cinsiyet
    },
    gLoading (state) {
      return state.loading
    },
    gYukluKoyunlar (state) {
      return state.items
    },
    gYukluKoyun (state) {
      return (itemId) => {
        return state.items.find((item) => {
          return item.id === itemId
        })
      }
    },
    gYeniDoganlar (state) {
      return state.dogans
    },
    gYukluErkekler (state) {
      return state.erkeks
    },
    gYukluKesilenler (state) {
      return state.kesiks
    }
  }
})
