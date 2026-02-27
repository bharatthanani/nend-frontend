<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <p class="text-center mt-3">
        Don’t have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService.js' 
import { fetchPermissions } from '@/utils/permissionService'
export default{
   data(){
      return{
        form:{
          email:'',
          password:'',
        },
        loading: false
      }
   },
   created()
   {
    if(localStorage.getItem('token'))
    {
       this.$router.push('/admin/dashboard')
    }
   },
   methods:{
      async login()
      {
        this.loading = true

        const userData = {
          email: this.form.email,
          password: this.form.password
        }
         try {
        const result = await userService.login(userData)
        console.log('resulttt',result); 
        if (result.token) {
          localStorage.setItem('token', result.token)
        }
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user))
        }
        await fetchPermissions();
        this.$router.push('/admin/dashboard')
        // Form reset
        this.form = {
          email: '',
          password: '',
        }
      } catch (error) {
        if(error.otp)
        {
          this.$router.push('/otp')
        }
        alert(error.message || "Invalid email or password!")
        
      } finally {
        this.loading = false
      }
   }
 } 
}
</script>

<style scoped>
.container {
  background: #f8f9fa;
}
</style>
