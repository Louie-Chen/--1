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
import currency from './filters/currency'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


Vue.component('Loading',Loading);   //全域待機動畫
Vue.filter('currency' ,currency);   //全域$字號千分號

axios.defaults.withCredentials = true;  //cookie

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
            path:"/login",
          })
        }
      });
  }else{
    next();
  }
 
})