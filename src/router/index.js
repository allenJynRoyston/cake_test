// setup vue and vue modules
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// import components
import Home from '../components/Home.vue'
import Cake from '../components/Cake.vue'


// make components available to use in other components
Vue.component('app-header', require('../components/elements/AppHeader.vue'))
Vue.component('app-footer', require('../components/elements/AppFooter.vue'))
Vue.component('navigation', require('../components/elements/Navigation.vue'))
Vue.component('cake-table', require('../components/elements/CakeTable.vue'))




// start vue
Vue.use(Router)
Vue.use(VueResource);

Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'


// set routes
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cake/:id',
      name: 'Cake',
      component: Cake
    }
  ]
})
