import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {Product} from "@/model/product";
import axios from "axios";

export const useProductsStore = defineStore('products', () => {
    const products = ref([] as Product[])

    function loadProducts() {
        axios.get('./products.json')
            .then((response) => {
                for (const p of response.data.products) {
                    products.value.push(p)
                }
                console.log(products)
            })
    }

    return { products, loadProducts }
})
