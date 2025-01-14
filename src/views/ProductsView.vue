<template>
  <nav>
    <button @click="logout">Logga ut</button>
  </nav>
  <main>
    <div>
    <h1>Produkter</h1>
    <div v-if="loading">Laddar produkter...</div>
    <div v-else>
      <ul v-if="products.length">
        <li v-for="product in products" :key="product._id" class="product-item">
            <div>
              <strong>{{ product.common_name }}</strong> 
              <p><em>{{ product.latin_name }}</em></p>
              <p><strong>Kategori:</strong> {{ product.category_name }}</p>
              <p><strong>Pris:</strong> {{ product.price }} kr</p>
              <p><strong>Lagersaldo:</strong> {{ product.stock }}</p>
              <button class="edit_btn">&#9998; Redigera</button>
              <button class="remove_btn" @click="removeProduct(product._id)">&#10060; Ta bort</button>
            </div>
          </li>
      </ul>
      <p v-else>Inga produkter hittades.</p>
    </div>
  </div>
  </main>
</template>
  
<script>
  import { getAllProducts, removeProductById } from '../services/productService';

  export default {

    name: 'ProductView',
    data() {
      return {
        products: [],
        loading: true,
        token: '' 
      };
    },

    methods: {

      //Get all products
      async fetchProducts() {
        try {
          //Get token from localstorage
          this.token = localStorage.getItem('token');
          const response = await getAllProducts(this.token);
          this.products = response.data;
        } catch (error) {
          console.error('Fel vid hämtning av produkter:', error);
        } finally {
          this.loading = false;
        }
      },

      //remove product
      async removeProduct(productId) {
      try {
        //Send DELETE-request to delete a product
        await removeProductById(productId, this.token);

        //Remove produkt from list
        this.products = this.products.filter(product => product._id !== productId);
      } catch (error) {
        console.error('Fel vid borttagning av produkt:', error);
      }
    },


    //Logout
      logout() {
      //Remove token when logout
      localStorage.removeItem('token');

      //Redirect to loginview
      this.$router.push('/login');
      }
    },
    mounted() {
      //Check if token exist before fetching products
      this.token = localStorage.getItem('token');
      if (!this.token) {
        this.$router.push('/login'); //if token does not exist, redirect to /login
      } else {
        this.fetchProducts();
      }
    }
  };

</script>