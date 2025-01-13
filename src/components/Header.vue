<template>
    <nav>
        <router-link to="/login">Logga in</router-link> |
        <router-link to="/products">Produkter</router-link>      
    </nav>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
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
  