import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps,{
  load:{
    key: 'AIzaSyDDZ6dgE9kl5DOEn20EhlbKUUHZkG65ZuA',
    libraries: 'places', 
  }
})

Vue.use(Vuesax)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
