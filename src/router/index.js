import Vue from 'vue'
import VueRouter from 'vue-router'
import Customers from '../views/customers/index'
import CustomerView from '../views/customers/_id'

import Categories from '../views/categories/index'
import CategoryView from '../views/categories/_id'

import Products from '../views/products/index'
import ProductView from '../views/products/_id'

import NotFound from '../views/notFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/customers',
  },
  {
    // customer list
    path: '/customers',
    name: 'customers',
    component: Customers,
  },
  {
    // show individual customer
    path: '/customers/:id',
    name: 'customerView',
    component: CustomerView,
  },
  {
    // categories list
    path: '/categories',
    name: 'categories',
    component: Categories,
  },
  {
    // show individual category
    path: '/categories/:id',
    name: 'categoryView',
    component: CategoryView,
  },
  {
    // Products list
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    // show individual Product
    path: '/products/:id',
    name: 'productView',
    component: ProductView,
  },
  {
    // Not Found Page
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
