import cart from "./Cart.js"
import products from "./Product.js"
import search from "./Search.js"
import catalog from "./Catalog.js"
import catalogPageProduct from "./CatalogPageProduct.js"
import description from "./DescriptionOfProduct.js"
import cartTotal from "./CartTotal.js"
import productsPageCart from "./PageCart.js"

const app = new Vue({
    el: '#app',
    components: {
        cart,
        products,
        search,
        catalog,
        catalogPageProduct,
        description,
        cartTotal,
        productsPageCart,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },
});