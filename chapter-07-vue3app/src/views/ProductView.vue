<script setup lang="ts">
import {reactive, computed, ref} from 'vue'
import axios from 'axios'
import ProductHeader from '@/components/ProductHeader.vue'
import { useRouter, useRoute } from 'vue-router'
import {dummyProduct} from '@/model/product.ts'

const router = useRouter()
const route = useRoute()
const product = ref(dummyProduct)

axios.get('/products.json')
    .then((response) => {
      product.value = response.data.products.filter(data => data.id == route.params.id)[0]
      product.value.image = '/' + product.value.image;
    });

function edit() {
  router.push({name: 'Edit'})
}

</script>

<template>
  <ProductHeader/>
  <h1> This is the id {{ route.params.id }}</h1>
  <div class="row">
    <div class="col-md-5 col-md-offset-0">
      <figure>
        <img class="product" v-bind:src="product.image">
      </figure>
    </div>
    <div class="col-md-6 col-md-offset-0 description">
      <h1>{{ product.title }}</h1>
      <p v-html="product.description"></p>
      <p class="price">
        {{ product.price }}
      </p>
      <button @click="edit">Edit Product</button>
      <RouterView/>
    </div>
  </div>

</template>
