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

              <!-- Stock adjustments -->
              <p>
                <strong>Lagersaldo:</strong>
                <button type="button" @click="decreaseStock(product)" :disabled="product.stock <= 0">-</button>
                <input 
                  type="number" 
                  v-model="product.stock" 
                  min="0" 
                  @blur="updateStock(product)" 
                  @input="updateStock(product)" 
                />
                <button type="button" @click="increaseStock(product)">+</button>
              </p>

              <button class="edit_btn" @click="openEditModal(product)">Redigera</button>
              <button class="remove_btn" @click="removeProduct(product._id)">&#10060; Ta bort</button>
            </div>
          </li>
        </ul>
        <p v-else>Inga produkter hittades.</p>
      </div>
    </div>
  </main>

  <!-- Modal to update product -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeEditModal">&times;</span>
      <h2>Redigera Produkt</h2>
      <form @submit.prevent="saveProduct">
        <label for="common_name">Vanligt namn:</label>
        <input v-model="editProduct.common_name" id="common_name" type="text" required />

        <label for="latin_name">Latinskt namn:</label>
        <input v-model="editProduct.latin_name" id="latin_name" type="text" required />

        <label for="category_name">Kategori:</label>
        <input v-model="editProduct.category_name" id="category_name" type="text" required />

        <label for="price">Pris:</label>
        <input v-model="editProduct.price" id="price" type="number" required />

        <button type="submit">Spara</button>
      </form>
    </div>
  </div>
</template>
  
<script>
 
  import { getAllProducts, removeProductById, updateProductById, updateProductStock } from '../services/productService';

  const API_URL = 'https://projekt-webbtjanst-api-anne-lii.onrender.com/products';

  export default {

    name: 'ProductView',
    data() {
      return {
        products: [],
        loading: true,
        token: '',
        showModal:false,
        editProduct: {}
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
          //Send DELETE-request to remove a product
          await removeProductById(productId, this.token);

          //Remove produkt from list
          this.products = this.products.filter(product => product._id !== productId);
        } catch (error) {
          console.error('Fel vid borttagning av produkt:', error);
        }
      },
      
      //open modal for editing
      openEditModal(product) {
        this.editProduct = { ...product }; //Create a copy of product to edit
        this.showModal = true;
      },

      //close modal after editing
      closeEditModal() {
        this.showModal = false;
      },


      async saveProduct() {
        try {
          //remove '_id', 'createdAt', '__v' that can´t be updated
          const { _id, createdAt, __v, ...productWithoutRestrictedFields } = this.editProduct;

          //Send updated product without 'createdAt', '_id' och '__v'
          const response = await updateProductById(this.editProduct._id, productWithoutRestrictedFields, this.token);

          if (response.status !== 200) {
            console.error("Misslyckades med att uppdatera produkten:", response);
          }

          //Update list in view with product
          const index = this.products.findIndex(product => product._id === this.editProduct._id);
          if (index !== -1) {
            this.products[index] = { ...this.editProduct }; //update product in list
          }

          //close modal after submit
          this.closeEditModal();
        } catch (error) {
          console.error('Fel vid uppdatering av produkt:', error);
        }
      },

      //decrease stock
      decreaseStock(product) {
        if (product.stock > 0) {
          product.stock--;
          this.updateStock(product);
        }
      },

      //increase stock
      increaseStock(product) {
        product.stock++;
        this.updateStock(product);
      },

      //Update stock when adjusted 
      updateStock(product) {
        if (product.stock < 0) product.stock = 0;
        this.saveStockToDatabase(product);
      },

      //save adjusted stock to database
      async saveStockToDatabase(product) {
        try {
          console.log(`Skickar PATCH-begäran med ID: ${product._id} och nytt lagersaldo: ${product.stock}`);
          await updateProductStock(product._id, { stock: product.stock }, this.token); //Send stock as payload
          this.fetchProducts(); //Updateproductlist after adjusted stock
        } catch (error) {
          console.error('Fel vid uppdatering av lagersaldo:', error);
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