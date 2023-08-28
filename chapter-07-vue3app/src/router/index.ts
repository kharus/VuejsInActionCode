import { createRouter, createWebHistory } from 'vue-router'
import ProductList from "@/components/ProductList.vue";
import OrderForm from "@/components/OrderForm.vue";

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
  ]
})

export default router
