<template>
  <div class="container">
    <div class="d-flex justify-content-center mb-5">
      <router-link to="/add-product" class="btn text-white">Lägg till produkt</router-link>
      <router-link to="/add-category" class="btn text-white">Lägg till kategori</router-link>
      <button @click="logout" class="btn text-white">Logga ut</button>
    </div>

    <main>
      <div class="my-4">
        <h1>Produkter</h1>
        <!-- Searchfield -->
        <div class="mb-3">
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-control" 
            placeholder="Sök produkt..." 
            @input="filterProducts"
          />
        </div>

        <!-- Category Filter -->
        <div class="mb-3">
          <select v-model="categoryFilter" @change="filterProducts" class="form-select">
            <option value="">Alla Kategorier</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Loading message -->
        <div v-if="loading" class="alert alert-info" text-white>Laddar produkter...</div>

        <!-- Products list -->
        <div class="container">
          <ul v-if="filteredProducts.length" class="list-group">
            <li v-for="product in filteredProducts" :key="product._id" class="list-group-item d-flex justify-content-between align-items-start">
              <!-- Produktinformation -->
              <div class="product-info" style="flex-grow: 1; width: 70%;">
                <strong>{{ product.common_name }}</strong>
                <p><em>{{ product.latin_name }}</em></p>
                <p><strong>Kategori:</strong> {{ product.category_name }}</p>
                <p><strong>Pris:</strong> {{ product.price }} kr</p>

                <!-- stockadjustments -->
                <p>
                  <strong>Lagersaldo:</strong>
                  <button type="button" @click="decreaseStock(product)" :disabled="product.stock <= 0" class="btn btn-sl text-white"> - </button>
                  <input type="number" v-model="product.stock" min="0" class="form-control d-inline-block w-auto" @blur="updateStock(product)" @input="updateStock(product)" />
                  <button type="button" @click="increaseStock(product)" class="btn btn-sl text-white"> + </button>
                </p>
              </div>

              <!-- Buttons for edit and remove -->
              <div class="product-actions" style="width: 30%; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end;">
                <button class="btn text-white" @click="openEditModal(product)">&#9998; Redigera</button>
                <button class="btn text-white" @click="removeProduct(product._id)">&#10060; Ta bort</button>
              </div>
            </li>
          </ul>
          <p v-else>Inga produkter hittades.</p>
        </div>

      </div>
    </main>

    <!-- Modal to update product -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <span class="close" @click="closeEditModal">&times;</span>
          <h2 class="modal-title">Redigera Produkt</h2>
          <form @submit.prevent="saveProduct" class="p-4">
            <div class="mb-3">
              <label for="common_name" class="form-label">Vanligt namn:</label>
              <input v-model="editProduct.common_name" id="common_name" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label for="latin_name" class="form-label">Latinskt namn:</label>
              <input v-model="editProduct.latin_name" id="latin_name" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label for="category_name" class="form-label">Kategori:</label>
              <input v-model="editProduct.category_name" id="category_name" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label for="price" class="form-label">Pris:</label>
              <input v-model="editProduct.price" id="price" type="number" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-primary">Spara</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>

  .container {
    font-family: 'Poppins', sans-serif;
        font-size: 18px;
  }
  .btn {
    background-color: #104057;
    margin: 5px;
  }

  .btn:hover {
    background-color: #70C7EC;
  }

</style>




<script>
 
  import { getAllProducts, removeProductById, updateProductById, updateProductStock } from '../services/productService';

  const API_URL = 'https://projekt-webbtjanst-api-anne-lii.onrender.com/products';

  export default {

    name: 'ProductView',
    data() {
      return {
        products: [],
        filteredProducts: [],
        searchQuery: '',
        categoryFilter: '',
        categories: [],
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
          this.token = localStorage.getItem('token');
          const response = await getAllProducts(this.token);
          this.products = response.data;

          // Extract unique categories from the products
          this.categories = [...new Set(this.products.map(product => product.category_name))]; // Extract unique categories
          this.filteredProducts = this.products; // Initially, all products are displayed
        } catch (error) {
          console.error('Fel vid hämtning av produkter:', error);
        } finally {
          this.loading = false;
        }
      },

      //Filter products based on search query and selected category
      filterProducts() {
        let filtered = this.products;

        // Apply search query filter
        if (this.searchQuery.trim() !== '') {
          filtered = filtered.filter(product =>
            product.common_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            product.latin_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            product.category_name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }

        // Apply category filter
        if (this.categoryFilter) {
          filtered = filtered.filter(product => product.category_name === this.categoryFilter);
        }

        this.filteredProducts = filtered;
        
      },

      //remove product
      async removeProduct(productId) {
        try {
          //Send DELETE-request to remove a product
          await removeProductById(productId, this.token);

          //Remove produkt from products and filteredproducts
          this.products = this.products.filter(product => product._id !== productId);
          this.filteredProducts = this.filteredProducts.filter(product => product._id !== productId);

          alert('Produkten har tagits bort');
        } catch (error) {
          console.error('Fel vid borttagning av produkt:', error);
          alert('Något gick fel vid borttagning av produkt');
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

