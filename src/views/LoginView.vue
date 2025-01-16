
<template>
    <div class="d-flex justify-content-center align-items-center ">
      <div class="center-login p-4 rounded text-white">

        <!-- Logotyp -->
        <div class="text-center mb-4">
        <img src="/src/assets/logo1.png" alt="logotype">
        </div>
  
        <!-- Formulär -->
        <label for="email" class="form-label">E-post:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          placeholder="Ange din e-post"
          required
        />
  
        <label for="password" class="form-label mt-3">Lösenord:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          placeholder="Ange ditt lösenord"
          required
        />
        <!-- LOGGA IN knapp -->
        <div class="text-center mt-4">
            <button v-if="!loading" class="btn text-white w-100" @click="login">LOGGA IN</button>
            <div v-else>
                <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Laddar...</span>
                </div>
            </div>
            </div>

        <!-- Felmedddelande -->
        <p v-if="error" class="text-white mt-3 text-center">{{ error }}</p>
      </div>
    </div>
  </template>



<style scoped>   
    .center-login {
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        background-color: #104057;
        width: 100%;
        max-width: 500px;
        padding: 30px;
        margin-top: 200px;
    }

    
    img {
        max-width: 150px;
        margin-top: 100px;
    }

    button {
        background-color: #70C7EC;
        font-size: 20px;
    }
    button:hover {
        background-color: #44bbee;
    }

    /* CSS for smaller screens */
    @media screen and (max-width: 800px) {
        .center-login {
            font-size: 18px;
            width: 80%;
            margin-top: 20px;
        }
    
        img {
            max-width: 100px;
            margin-top: 10px;
        }
    }
</style>
  



<script>
    import axios from 'axios';
   

    export default {
        data() {
            return {
            email: '',
            password: '',
            error: '',
            loading: false,
            };
        },
        methods: {
            async login() {
            try {
                console.log("Skickar inloggningsdata:", { email: this.email, password: this.password }); // Debugging
                const response = await axios.post('https://projekt-webbtjanst-api-anne-lii.onrender.com/user/login', {
                email: this.email,
                password: this.password
                });
                console.log("Laddar...");

                // Spara token i localStorage
                localStorage.setItem('token', response.data.token);

                // Omdirigera till produktsidan
                this.$router.push('/products');

            } catch (err) {
                this.error = 'Fel e-post eller lösenord. Försök igen!.';
                console.error(err);
            }
            }
        }
    };
</script>


