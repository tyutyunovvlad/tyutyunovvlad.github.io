import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from '@/utils/message.plugin'
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)


firebase.initializeApp({
  apiKey: "AIzaSyD5QDylLPadMvkqvAOkVqZNKmwwoYQEBGA",
  authDomain: "vue-crm-fildran.firebaseapp.com",
  databaseURL: "https://vue-crm-fildran.firebaseio.com",
  projectId: "vue-crm-fildran",
  storageBucket: "vue-crm-fildran.appspot.com",
  messagingSenderId: "1013847200500",
  appId: "1:1013847200500:web:d34daa111f30095c4004a1",
  measurementId: "G-VYHHFHSFWC"
});


let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})