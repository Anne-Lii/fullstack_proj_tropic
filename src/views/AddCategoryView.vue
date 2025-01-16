
<template>
  <div class="d-flex justify-content-center mb-5">
    <router-link to="/products" class="btn text-white">Produkter</router-link>
    <router-link to="/add-product" class="btn text-white">Lägg till produkt</router-link>
    <button @click="logout" class="btn text-white">Logga ut</button>
  </div>

  <main>
    <!-- Centrerad container -->
    <div class="container d-flex flex-column align-items-center">
      <h1 class="text-center mb-4">Kategorier</h1>
      <h2 class="text-center mb-4">Lägg till kategori</h2>
      <form @submit.prevent="addCategory" class="w-100">
        <div class="mb-3">
          <label for="category_name" class="form-label">Kategori namn:</label>
          <input v-model="newCategory.name" id="category_name" type="text" class="form-control" required />
        </div>
        <button type="submit" class="btn  text-white w-100">+ Lägg till kategori</button>
      </form>
    </div>

    <!-- Kategorilista centrerad -->
    <div class="category-list container mt-5">
      <h3 class="text-center mb-4">Alla kategorier</h3>
      <ul class="list-unstyled">
        <li v-for="category in categories" :key="category._id" class="d-flex justify-content-between align-items-center mb-3">
          <span>{{ category.name }}</span>
          <button class="remove_btn btn text-white" @click="removeCategory(category.name)">&#10060; Ta bort</button>
        </li>
      </ul>
    </div>
  </main>
</template>


<style scoped>
  .container {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    width: 100%;
    max-width: 500px;
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
  import { addCategory, getCategories, removeCategory } from '../services/categoryService';

  export default {
    data() {
      return {
        categories: [], //Stores all categories
        newCategory: {
          name: '' //Stores new category name
        }
      };
    },
    methods: {

      //Method to get all categories from API
      async loadCategories() {
        try {
          const response = await getCategories();
          this.categories = response.data;
        } catch (error) {
          console.error('Fel vid hämtning av kategorier:', error);
        }
      },

      //Method to add categories from API
      async addCategory() {
         try {
          const response = await addCategory(this.newCategory);

          //Add the new category directly to the list
          this.categories.push(response.data);

          //Reset form
          this.newCategory.name = '';
        } catch (error) {
          console.error('Fel vid tillägg av kategori:', error);
        }
      },
      
      // Method to remove a category based on category_name
      async removeCategory(categoryName) {
        try {
          //Call removeCategory function with categoryName
          await removeCategory(categoryName);
          
          //Update the categories list after deletion
          this.categories = this.categories.filter(category => category.name !== categoryName);
        } catch (error) {
          console.error('Fel vid borttagning av kategori:', error);
        }
      },
      
      // Logout function
      logout() {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to login page
        this.$router.push('/login');
      } 

    },
    created() {
      this.loadCategories(); //Get all categories on page init
    }
  };
</script>
  