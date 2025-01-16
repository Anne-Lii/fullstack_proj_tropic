
<template>
  <div class="d-flex justify-content-center mb-5">
    <router-link to="/products" class="btn text-white">Produkter</router-link>
    <router-link to="/add-category" class="btn text-white">Lägg till kategori</router-link>
    <button @click="logout" class="btn text-white">Logga ut</button>
  </div>

  <div class="container d-flex justify-content-center align-items-center">
    <div class="col-md-6"> <!-- Sätter en maxbredd på container -->
      <h1 class="text-center mb-4">Lägg till ny produkt</h1>
      <form @submit.prevent="addProduct">
        <div class="mb-3">
          <label for="commonName" class="form-label">Namn:</label>
          <input v-model="newProduct.common_name" type="text" id="commonName" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="latinName" class="form-label">Latinskt namn:</label>
          <input v-model="newProduct.latin_name" type="text" id="latinName" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Pris:</label>
          <input v-model="newProduct.price" type="number" id="price" class="form-control" placeholder="Pris" />
        </div>

        <div class="mb-3">
          <label for="stock" class="form-label">Lager:</label>
          <input v-model="newProduct.stock" type="number" id="stock" class="form-control" placeholder="Lager" />
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">Kategori:</label>
          <select v-model="newProduct.category_name" id="category" class="form-select">
            <option value="" disabled>Välj kategori</option>
            <option v-for="category in categories" :key="category._name" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary w-100">+ Lägg till produkt</button>
      </form>    
    </div>
  </div>
</template>





<style scoped>
  .container {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
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
  import { getCategories } from "@/services/categoryService";  
  import { addProduct } from "@/services/productService";  

  export default {
    data() {
      return {
        newProduct: {
          common_name: '',
          latin_name: '',
          category_name: '',
          price: 0,
          stock: 0
        },
        categories: [] //stores categories for the select list
      };
    },
    created() {
      this.fetchCategories(); //Get categories when the component is created
    },
    methods: {

      //Get categories for the select list
      async fetchCategories() {
        try {
          const response = await getCategories();
          this.categories = response.data; //Update categories list
        } catch (error) {
          console.error('Fel vid hämtning av kategorier:', error);
        }
      },

      //add a new product
      async addProduct() {
        console.log("Kategori vald:", this.newProduct.category_name);//DEBUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!this.newProduct.stock || this.newProduct.stock <= 0) {
          alert("Lagret måste vara större än 0.");
          return;
        }

        //check if a category has been choosen
        if (!this.newProduct.category_name) {
          alert("Vänligen välj en kategori.");
          return;
        }

        const token = localStorage.getItem("token"); //get token from localStorage

        if (!token) {
          alert("Token saknas! Vänligen logga in igen.");
          this.$router.push('/login'); //Redirect to login page
          return;
        }

        try {
          const productData = {
            common_name: this.newProduct.common_name,
            latin_name: this.newProduct.latin_name,
            category_name: this.newProduct.category_name,
            price: this.newProduct.price,
            stock: this.newProduct.stock
          };

          const response = await addProduct(productData, token); //send product data with token
         
          //Reset form 
          this.newProduct = {
            common_name: '',
            latin_name: '',
            category_name: '',
            price: 0,
            stock: 0
          };

          
          alert("Produkt tillagd!");
          this.$router.push('/products'); //Redirect to productpage
        } catch (error) {
          const errorMessage = error.response ? error.response.data.message : 'Det gick inte att lägga till produkten. Försök igen.';
          console.error('Fel vid tillägg av produkt:', errorMessage);
          alert(errorMessage);
        }
      } ,
      
      // Logout function
      logout() {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to login page
        this.$router.push('/login');
      } 
    }
  };
</script>