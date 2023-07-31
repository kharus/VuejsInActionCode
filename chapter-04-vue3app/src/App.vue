<script setup lang="ts">
import { reactive, computed, ref } from 'vue'

const sitename = 'Vue.js Pet Depot'

const showProduct = ref(true)

const a = false

const product = {
  id: 1001,
  title: 'Cat Food, 25lb bag',
  description: 'A 25 pound bag of <em>irresistible</em>,' + ' organic goodness for your cat.',
  price: 2000,
  image: 'src/assets/images/product-fullsize.png',
  availableInventory: 5
}

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AR: 'Arizona',
  CA: 'California',
  NV: 'Nevada'
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

function addToCart() {
  cart.push(product.id)
}

function showCheckout() {
  showProduct.value = !showProduct.value
}

function submitForm() {
  alert('Submitted');
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

const canAddToCart = computed(() => {
  return product.availableInventory > cartItemCount.value
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
        <div v-else>
          <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-info">
              <div class="panel-heading">Pet Depot Checkout</div>
              <div class="panel-body">
                <div class="form-group">
                  <div class="col-md-12">
                    <h4><strong>Enter Your Information</strong></h4>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6">
                      <strong>First Name:</strong>
                      <input v-model.trim="order.firstName" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <strong>Last Name:</strong>
                      <input v-model.trim="order.lastName" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12"><strong>Address:</strong></div>
                    <div class="col-md-12">
                      <input v-model.trim="order.address" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12"><strong>City:</strong></div>
                    <div class="col-md-12">
                      <input v-model.trim="order.city" class="form-control" />
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
                      <input v-model.number="order.zip" class="form-control" type="number" />
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-md-6 boxes">
                      <input
                        type="checkbox"
                        id="gift"
                        value="true"
                        v-bind:true-value="order.sendGift"
                        v-bind:false-value="order.dontSendGift"
                        v-model="order.gift"
                      />
                      <label for="checkbox">Ship As Gift?</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6 boxes">
                      <input
                        type="radio"
                        id="home"
                        v-bind:value="order.home"
                        v-model="order.method"
                      />
                      <label for="home">Home</label>
                      <input
                        type="radio"
                        id="business"
                        v-bind:value="order.business"
                        v-model="order.method"
                      />
                      <label for="business">Business</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6">
                      <button type="submit" class="btn btn-primary submit" v-on:click="submitForm">
                        Place Order
                      </button>
                    </div>
                  </div>
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
                  </pre
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end of row-->
    </main>
    <!--end of main-->
  </div>
</template>
