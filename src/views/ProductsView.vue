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
        <li v-for="product in products" :key="product._id">
          <strong>{{ product.common_name }}</strong> ({{ product.latin_name }}) - {{ product.price }} kr
        </li>
      </ul>
      <p v-else>Inga produkter hittades.</p>
    </div>
  </div>
  </main>
</template>
  
<script>
  import { getAllProducts } from '../services/productService';

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
      logout() {

      //Remove token when logout
      localStorage.removeItem('token');

      //Redirect to loginview
      this.$router.push('/login');
      }
    },
    mounted() {
            this.fetchProducts();
    }
  };

</script>