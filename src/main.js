import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

import '@/mixins/loaderAndpopup'
import vuetify from './plugins/vuetify'

// Define Loader && Popup as a Global Components
import Loader from '@/components/Loader'
import Popup from '@/components/Popup'
Vue.component('Loader', Loader)
Vue.component('Popup', Popup)

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

const token = process.env.VUE_APP_TOKEN

// send these headers with every axios request
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
