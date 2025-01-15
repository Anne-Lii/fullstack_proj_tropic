<template>
    <div class="center-login">
      
          
    
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


<style scoped>

</style>