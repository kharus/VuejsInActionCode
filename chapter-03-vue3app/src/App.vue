<script setup lang="ts">
import {reactive, computed, ref} from 'vue'

const sitename = 'Vue.js Pet Depot'

const showProduct = ref(true)

const product = {
  id: 1001,
  title: 'Cat Food, 25lb bag',
  description: 'A 25 pound bag of <em>irresistible</em>,' + ' organic goodness for your cat.',
  price: 2000,
  image: 'src/assets/images/product-fullsize.png',
  availableInventory: 5
}

const cart = reactive([] as number[]);
function addToCart() {
  cart.push(product.id);
}

function showCheckout() {
  showProduct.value = !showProduct.value;
}
function formatPrice(productPrice: number) {
  if (productPrice > 99999) {
    const priceString = (productPrice / 100).toFixed(2) //#E
    const priceArray = priceString.split('').reverse() //#F
    let index = 3 //#F
    while (priceArray.length > index + 3) {
      priceArray.splice(index + 3, 0, ',') //#F
      index += 4
    }
    return '$' + priceArray.reverse().join('') //#G
  } else {
    return '$' + (productPrice / 100).toFixed(2) //#H
  }
}

const cartItemCount = computed(() => {
  return cart.length || 0;
})

const canAddToCart = computed(() => {
  return product.availableInventory > cartItemCount.value;
})
</script>

<template>
  <div id="app">
    <header>
      <div class="navbar navbar-default">
        <div class="navbar-header">
          <h1>{{ sitename }}</h1>
        </div>
        <div class="nav navbar-nav navbar-right cart">
          <button type="button" class="btn btn-default btn-lg" v-on:click="showCheckout">
            <span class="glyphicon glyphicon-shopping-cart">{{ cartItemCount }}</span> Checkout
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="row product">
        <div v-if="showProduct">
          <div class="col-md-2 col-md-offset-1">
            <figure>
              <img v-bind:src="product.image" />
            </figure>
          </div>
          <div class="col-md-6 col-md-offset-2 description">
            <h1 v-text="product.title"></h1>
            <p v-html="product.description"></p>
            <p class="price">
              {{ formatPrice(product.price) }}
            </p>
            <button class="btn btn-primary btn-lg" v-on:click="addToCart" v-if="canAddToCart">
              Add to cart
            </button>
            <button disabled="true" class="btn btn-primary btn-lg" v-else>Add to cart</button>
          </div>
        </div>
        <div v-else></div>
      </div>
      <!--end of row-->
    </main>
    <!--end of main-->
  </div>
</template>
