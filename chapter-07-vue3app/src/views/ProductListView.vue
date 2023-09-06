<script setup lang="ts">
import {reactive, computed, ref} from 'vue'
import axios from 'axios'
import ProductHeader from '@/components/ProductHeader.vue'

const showProduct = ref(true)

const order = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  state: '',
  method: 'Home Address',
  business: 'Business Address',
  home: 'Home Address',
  gift: 'Send As A Gift',
  sendGift: 'Send As A Gift',
  dontSendGift: 'Do Not Send As A Gift'
})

const cart = reactive([] as number[])

const products = reactive([] as Product[])

axios.get('./products.json')
    .then((response) => {
      for (const p of response.data.products) {
        products.push(p)
      }
      console.log(products)
    });

function checkRating(n: number, myProduct: Product) {
  return myProduct.rating - n >= 0;
}

function addToCart(aProduct: Product) {
  cart.push(aProduct.id);
}

function canAddToCart(aProduct: Product) {
  return aProduct.availableInventory > cartCount(aProduct.id);
}

function cartCount(id: number) {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] === id) {
      count++;
    }
  }
  return count;
}

function formatPrice(productPrice: number) {
  if (productPrice > 99999) {
    const priceString = (productPrice / 100).toFixed(2)
    const priceArray = priceString.split('').reverse()
    let index = 3
    while (priceArray.length > index + 3) {
      priceArray.splice(index + 3, 0, ',')
      index += 4
    }
    return '$' + priceArray.reverse().join('')
  } else {
    return '$' + (productPrice / 100).toFixed(2)
  }
}

const cartItemCount = computed(() => {
  return cart.length || 0
})

function compare(a:Product, b:Product) {
  if (a.title.toLowerCase() < b.title.toLowerCase())
    return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase())
    return 1;
  return 0;
}

const sortedProducts = computed(() => {
  if (products.length > 0) {
    let productsArray = products.slice(0);
    return productsArray.sort(compare);
  } else {
    return products
  }
})


</script>

<template>
    <product-header :cartItemCount="cartItemCount"></product-header>
    <main>
        <div v-for="product in sortedProducts">
          <div class="row">
            <div class="col-md-5 col-md-offset-0">
              <figure>
                <img class="product" v-bind:src="product.image">
              </figure>
            </div>
            <div class="col-md-6 col-md-offset-0 description">
              <router-link tag="h1" :to="{ name : 'Id', params: {id: product.id}}" >{{product.title}}</router-link>
              <p v-html="product.description"></p>
              <p class="price">
                {{ formatPrice(product.price) }}
              </p>
              <button class=" btn btn-primary btn-lg" v-on:click="addToCart(product)"
                      v-if="canAddToCart(product)">Add to cart<!DOCTYPE html>
              </button>
              <button disabled="true" class=" btn btn-primary btn-lg" v-else>Add to cart</button>
              <span class="inventory-message"
                    v-if="product.availableInventory - cartCount(product.id) === 0">All Out!
                </span>
              <span class="inventory-message"
                    v-else-if="product.availableInventory - cartCount(product.id) < 5">
                  Only {{ product.availableInventory - cartCount(product.id) }} left!
                </span>
              <span class="inventory-message" v-else>Buy Now!
                </span>
              <div class="rating">
                  <span v-bind:class="{'rating-active' :checkRating(n, product)}" v-for="n in 5">☆
                  </span>
              </div>
            </div>
            <!-- end of col-md-6-->
          </div>
          <!-- end of row-->
          <hr/>
        </div>

        <!--end of row-->
    </main>

</template>
