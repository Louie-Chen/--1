import Vue from 'vue';
import VueRouter from 'vue-router';
//官方文件
import HelloWorld from '@/components/HelloWorld';
import dashboard from '@/components/dashboard';
import login from '@/components/pages/login'
import products from '@/components/pages/products'

//自訂的分頁原件

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
    {
        path:'*',
        redirect:'/login',   //假如輸入的網址不是我們定義的路由的話,就會重新導向redirect
    },    
    {
        name: 'HelloWorld' ,  //元件呈現的名稱
        path: '/' ,  //對應的虛擬路徑
        component: HelloWorld ,  //對應的原件
        meta: { requiresAuth: true },
    },
    {
        name:'Login',
        path:'/login',
        component:login,
    },
    {
        name: 'dashboard' ,  //元件呈現的名稱
        path: '/admin' ,  //對應的虛擬路徑
        component: dashboard ,  //對應的原件
        
        children:[
            {
                name: 'products' ,  //元件呈現的名稱
                path: '/' ,  //對應的虛擬路徑
                component: products ,  //對應的原件
                meta: { requiresAuth: true },
            },
            
        ]
    },
    ]
    

});