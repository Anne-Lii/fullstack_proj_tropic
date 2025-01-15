<template>
  <main>
    <div>
      <h1>Kategorier</h1>
      <h2>+ Lägg till kategori</h2>
      <form @submit.prevent="addCategory">
        <label for="category_name">Kategori namn:</label>
        <input v-model="newCategory.name" id="category_name" type="text" required />
  
        <button type="submit">Lägg till kategori</button>
      </form>
    </div>
    <!-- List with all categories -->
    <div>
      <h3>Alla kategorier</h3>
      <ul>
        <li v-for="category in categories" :key="category._id">
          {{ category.name }}
        </li>
      </ul>
    </div>
  </main>
</template>
  
<script>
  import { addCategory, getCategories } from '../services/categoryService';

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
      }
    },
    created() {
      this.loadCategories(); //Get all categories on page init
    }
  };
</script>
  