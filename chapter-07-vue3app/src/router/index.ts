import { createRouter, createWebHistory } from 'vue-router'
import ProductList from "@/views/ProductListView.vue";
import OrderForm from "@/views/OrderFormView.vue";
import ProductView from "@/views/ProductView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/form',
      name: 'form',
      component: OrderForm,
      props: true
    },
    {
      path: '/product/:id',
      name: 'Id',
      component: ProductView,
      props: true
    }
  ]
})

export default router
