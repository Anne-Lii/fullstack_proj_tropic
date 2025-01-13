<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue';
</script>

<style>
nav {
  background-color: #f8f9fa;
  padding: 10px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
  color: #007BFF;
}
</style>
