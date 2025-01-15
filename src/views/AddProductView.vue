<template>
   <div class="router_menu">
    <router-link to="/add-category">Lägg till kategori</router-link>
    <router-link to="/products">Produktsidan</router-link>
  </div>
  <div>
    <h1>Lägg till ny produkt</h1>
    <form @submit.prevent="addProduct">
      <div>
        <label for="commonName">Namn</label>
        <input v-model="newProduct.common_name" type="text" id="commonName"/>
      </div>

      <div>
        <label for="latinName">Latinskt namn</label>
        <input v-model="newProduct.latin_name" type="text" id="latinName"/>
      </div>

      <div>
        <label for="price">Pris</label>
        <input v-model="newProduct.price" type="number" id="price" placeholder="Pris" />
      </div>

      <div>
        <label for="stock">Lager</label>
        <input v-model="newProduct.stock" type="number" id="stock" placeholder="Lager" />
      </div>

      <div>
        <label for="category">Kategori</label>
        <select v-model="newProduct.category_name" id="category">
          <option value="" disabled>Välj kategori</option>
          <option v-for="category in categories" :key="category._name" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <button type="submit">Lägg till produkt</button>
    </form>
  </div>
</template>

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
      }

    }
  };
</script>