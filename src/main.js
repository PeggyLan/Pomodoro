import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faPen, faTimes, faUndo, faSave, faPlay, faPause, faStepForward, faIgloo, faClipboardList, faTools } from '@fortawesome/free-solid-svg-icons'

import draggable from 'vuedraggable'

import 'fontsource-architects-daughter'
import './style/style.styl'
import './style/flipclock.css'

import VueParticles from './components/vue-particles.vue'

Vue.config.productionTip = false

library.add(faCheck, faPen, faTimes, faUndo, faSave, faPlay, faPause, faStepForward, faIgloo, faClipboardList, faTools)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('draggable', draggable)
Vue.component('vueParticles', VueParticles)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
