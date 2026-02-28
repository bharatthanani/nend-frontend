<template>
  <div class="forbidden-page">
    <div class="card">
      <h1 class="code">403</h1>
      <h2 class="title">Forbidden</h2>
      <p class="message">Tumhe is action ki permission nahi hai!</p>
      <router-link to="/" class="btn">Go back to Dashboard</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.forbidden-page {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}

.card {
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.code {
  font-size: 6rem;
  color: #ff4d4f;
  margin: 0;
}

.title {
  font-size: 2rem;
  margin: 0.5rem 0;
}

.message {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #555;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff4d4f;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;
}

.btn:hover {
  background-color: #e04344;
}
</style>