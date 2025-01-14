<template>
    <header>
        <img :src="logo" id="logotyp" alt="logotyp moorish idol-fisk med texten TROPIC REEF under">        
    </header>  
</template>
  
<script setup>
  import logo from '@/assets/logo1.png';
</script>
  
<style scoped>
header {
    background-color: #07445E;
    height: 120px;
} 

#logotyp {
        width: 100%;
        max-width: 100px;
        max-height: 100px;
        margin: auto;
        padding: 10px 0 0 30px ;    
    }

nav {
    background-color: #f8f9fa;
    padding: 10px;
    text-align: center;
}
  
nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
}
  
nav a.router-link-active {
    font-weight: bold;
    color: #007BFF;
}
</style>
  