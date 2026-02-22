<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="max-width: 450px; width: 100%;">
      <h2 class="text-center mb-4">Create Account</h2>
      <form @submit.prevent="addUser">
        <div class="mb-3">
          <label for="fname" class="form-label">Fist Name</label>
          <input
            type="text"
            class="form-control"
            id="fname"
            v-model="form.first_name"
            placeholder="Enter your first name"
          />
        </div>
        <div class="mb-3">
          <label for="lname" class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lname"
            v-model="form.last_name"
            placeholder="Enter your last name"
          />
        </div>

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

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="form.confirm_password"
            placeholder="Re-enter your password"
          />
        </div>

        <button type="submit" class="btn btn-success w-100">Register</button>
      </form>

      <p class="text-center mt-3">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService.js'  // ← @ means src folder

export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      loading: false
    }
  },
  methods: {
    async addUser() {
      if (this.form.password !== this.form.confirm_password) {
        alert("Passwords do not match!")
        return
      }

      this.loading = true

      const userData = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        password: this.form.password
      }

      try {
        const result = await userService.register(userData)
        if(result.otp)
        {
          this.$router.push('/otp')
        }
      // Form reset
        this.form = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: ''
        }
      } catch (error) {
        alert(error.message || "Registration failed! Try again.")
        console.error("Error:", error)
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
