<script setup lang="ts">
import {reactive, computed, ref} from 'vue'

const sitename = 'Vue.js Pet Depot'

const showProduct = ref(true)


function showCheckout() {
  showProduct.value = !showProduct.value;
}

defineProps(['cartItemCount'])

</script>

<template>
  <header>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1>
          <RouterLink to="/">
            {{ sitename }}
          </RouterLink>
        </h1>
      </div>
      <div class="nav navbar-nav navbar-right cart">
        <RouterLink to="/form" v-slot="navigate">
          <button @click="navigate" type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-shopping-cart">{{ cartItemCount }}</span> Checkout
          </button>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.router-link-exact-active {
  color: blue;
}
</style>