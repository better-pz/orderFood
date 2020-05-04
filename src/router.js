import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'
import EditUserInfo from '@/components/pages/EditUserInfo'
import OrderList from '@/components/pages/OrderList'
import VuexTodoList from '@/components/pages/VuexTodoList'
import RestaurantInfo from '@/components/pages/RestaurantInfo'




Vue.use(Router)
export default new Router ({
  routes:[
    { path: '/', name: 'Main',component: Main ,
    children:[
      { path: '/shoppingMall', name: 'ShoppingMall',component: ShoppingMall },
      { path: '/categoryList', name: 'CategoryList',component: CategoryList },   
      { path: '/cart', name: 'Cart',component: Cart }, 
      { path: '/member', name: 'Member',component: Member }, 
    ]
  },
    { path: '/register', name: 'Register',component: Register },
    { path: '/login', name: 'Login',component: Login },
    { path: '/goods', name: 'Goods',component: Goods },   
    { path: '/editUserInfo', name: 'EditUserInfo',component: EditUserInfo }, 
    { path: '/orderList', name: 'OrderList',component: OrderList },  
    { path: '/todoList', name: 'TodoList',component: VuexTodoList },   
    { path: '/restaurantInfo', name: 'RestaurantInfo',component: RestaurantInfo },  

  ]
})
