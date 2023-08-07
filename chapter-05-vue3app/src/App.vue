<script setup lang="ts">
import {reactive, computed, ref} from 'vue'
import axios from 'axios'

const sitename = 'Vue.js Pet Depot'

const showProduct = ref(true)

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AR: 'Arizona',
  CA: 'California',
  NV: 'Nevada'
}

interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
  availableInventory: number,
  rating: number
}

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

function showCheckout() {
  showProduct.value = !showProduct.value;
}

function submitForm() {
  alert('Submitted');
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
      <div v-if="showProduct">
        <div v-for="product in sortedProducts">
          <div class="row">
            <div class="col-md-5 col-md-offset-0">
              <figure>
                <img class="product" v-bind:src="product.image">
              </figure>
            </div>
            <div class="col-md-6 col-md-offset-0 description">
              <h1 v-text="product.title"></h1>
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
        <!-- end of v-for-->
      </div>
      <!-- end of showProduct-->
      <div v-else>
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-info">
              <div class="panel-heading">Pet Depot Checkout</div>
              <div class="panel-body">
                <div class="form-group">
                  <div class="col-md-12">
                    <h4>
                      <strong>Enter Your Information</strong>
                    </h4>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-6">
                    <strong>First Name:</strong>
                    <input v-model.trim="order.firstName" class="form-control"/>
                  </div>
                  <div class="col-md-6">
                    <strong>Last Name:</strong>
                    <input v-model.trim="order.lastName" class="form-control"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <strong>Address:</strong>
                  </div>
                  <div class="col-md-12">
                    <input v-model.trim="order.address" class="form-control"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <strong>City:</strong>
                  </div>
                  <div class="col-md-12">
                    <input v-model.trim="order.city" class="form-control"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-2">
                    <strong>State:</strong>
                    <select v-model="order.state" class="form-control">
                      <option disabled value="">State</option>
                      <option v-for="(state, key) in states" v-bind:value="state">
                        {{ key }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-6 col-md-offset-4">
                    <strong>Zip / Postal Code:</strong>
                    <input v-model.number="order.zip" class="form-control" type="number"/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-6 boxes">
                    <input type="checkbox" id="gift" value="true" v-bind:true-value="order.sendGift"
                           v-bind:false-value="order.dontSendGift"
                           v-model="order.gift">
                    <label for="gift">Ship As Gift?</label>
                  </div>
                </div>
                <!-- end of form-group -->
                <div class="form-group">
                  <div class="col-md-6 boxes">
                    <input type="radio" id="home" v-bind:value="order.home" v-model="order.method">
                    <label for="home">Home</label>
                    <input type="radio" id="business" v-bind:value="order.business"
                           v-model="order.method">
                    <label for="business">Business</label>
                  </div>
                </div>
                <!-- end of form-group-->
                <div class="form-group">
                  <div class="col-md-6">
                    <button type="submit" class="btn btn-primary submit" v-on:click="submitForm">
                      Place Order
                    </button>
                  </div>
                  <!-- end of col-md-6-->
                </div>
                <!-- end of form-group-->
                <div class="col-md-12 verify">
                    <pre>
                        First Name: {{ order.firstName }}
                        Last Name: {{ order.lastName }}
                        Address: {{ order.address }}
                        City: {{ order.city }}
                        Zip: {{ order.zip }}
                        State: {{ order.state }}
                        Method: {{ order.method }}
                        Gift: {{ order.gift }}
                      </pre>
                </div>
                <!-- end of col-md-12 verify-->
              </div>
              <!--end of panel-body-->
            </div>
            <!--end of panel panel-info-->


          </div>
          <!--end of col-md-10 col-md-offset-1-->
        </div>
        <!--end of row-->
      </div>
    </main>

  </div>
</template>
