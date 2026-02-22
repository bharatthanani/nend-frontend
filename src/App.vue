<script setup>
</script>

<template>
  <div>
    <!-- This is where your pages will load -->
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 10px;
  background: #f4f4f4;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>
