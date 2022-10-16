import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import {BootstrapVue} from 'bootstrap-vue'

//

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use('axios', axios)
Vue.use(BootstrapVue)
Vue.use(ElementUI, {locale})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  
  
}).$mount('#app')
