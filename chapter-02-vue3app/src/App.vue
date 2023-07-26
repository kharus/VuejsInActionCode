<script setup lang="ts">
import { reactive, computed } from 'vue'

const sitename = 'Vue.js Pet Depot'
const product = reactive({
  id: 1001,
  title: 'Cat Food, 25lb bag',
  description: 'A 25 pound bag of <em>irresistible</em>,' + ' organic goodness for your cat.',
  price: 2000,
  image: 'src/assets/images/product-fullsize.png'
})

// a computed ref
const priceFormatted = computed(() => {
  if (product.price > 99999) {
    //#D
    const priceString = (product.price / 100).toFixed(2) //#E
    const priceArray = priceString.split('').reverse() //#F
    let index = 3 //#F
    while (priceArray.length > index + 3) {
      //#F
      priceArray.splice(index + 3, 0, ',') //#F
      index += 4 //#F
    } //#F
    return '$' + priceArray.reverse().join('') //#G
  } else {
    return '$' + (product.price / 100).toFixed(2) //#H
  }
})
</script>

<template>
  <div id="app">
    <header>
      <div class="navbar navbar-default">
        <div class="navbar-header">
          <h1 v-text="sitename"></h1>
        </div>
      </div>
    </header>
    <main>
      <div class="row">
        <div class="col-md-2 col-md-offset-1">
          <figure>
            <img v-bind:src="product.image" />
          </figure>
        </div>
        <div class="col-md-6 col-md-offset-2 description">
          <h1 v-text="product.title"></h1>
          <p v-html="product.description"></p>
          <p class="price">
            {{ priceFormatted }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
