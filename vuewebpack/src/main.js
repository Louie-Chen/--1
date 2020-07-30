// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';  //主要AJAX套件
import VueAxios from 'vue-axios';   //將他轉成VUE 的套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import router from './router';
import App from './App';
import './bus';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component('Loading',Loading);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

router.beforeEach((to, from, next) => {
  console.log('to',to,'from', from,'next', next)
  if(to.meta.requiresAuth){
    
    const api = `${ process.env.APIPATH }/api/user/check`;
    axios.post(api).then((response)=>{
        console.log(response.data);
        if(response.data.success){
          next();
        }else{
          next({
            path:"login",
          })
        }
      });
  }else{
    next();
  }
 
})