<template>
    <div class="center-login">
      
        <img :src="logo" id="logotyp" alt="logotyp moorish idol-fisk med texten TROPIC REEF under">    
    
        <label for="email">E-post:</label>
        <input type="email" id="email" v-model="email" placeholder="Ange din e-post" required>
    
        <label for="password">Lösenord:</label>
        <input type="password" id="password" v-model="password" placeholder="Ange ditt lösenord" required>
    
        <div class="login_btn">
            <button @click="login">LOGGA IN</button>
        </div>
    
        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>

<script>
    import axios from 'axios';
    import logo from '@/assets/logo1.png';

    export default {
        data() {
            return {
            email: '',
            password: '',
            error: ''
            };
        },
        methods: {
            async login() {
            try {
                const response = await axios.post('https://projekt-webbtjanst-api-anne-lii.onrender.com/user/login', {
                email: this.email,
                password: this.password
                });

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


<style scoped>
  .center-login {
    width: 100%;
    max-width: 400px;
    margin: 200px auto 0 auto;
    background-color: #07445E;
    color: #ffffff;
    border-radius: 5px;
    height: 50vh;
  }

  #logotyp {
    width: 100%;
    max-width: 120px;
    max-height: 120px;
    margin: auto;
    padding: 150px 0 20px 0;
    text-align: center;
    display: block;
  }

  label {
    font-size: 24px;
    display: block;
    padding: 20px 0 0 40px;
    margin: 0;
  }

  input {
    width: 90%;
    max-width: 320px;
    margin: 0 auto;
    padding: 0 0 0 10px;
    justify-content: center;
    height: 38px;
    border-radius: 5px;
    display: block;
    font-size: 22px;
  }

  .login_btn {
    background-color: #70C7EC;
    width: 100%;
    max-width: 330px;
    height: 44px;
    margin: 40px auto 0 auto;
    border-radius: 5px;
    text-align: center;
  }

  .login_btn button {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
  }

</style>