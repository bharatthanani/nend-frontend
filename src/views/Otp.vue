<template>
  <div class="otp-container">
    <div class="card otp-card">
      <div class="card-body text-center p-5">

        <i class="bi bi-shield-lock-fill text-primary mb-4" style="font-size: 3.5rem;"></i>
        
        <h4 class="fw-bold mb-2">Enter Verification Code</h4>
        <p class="text-muted mb-4">
          We have sent a 5-digit code to <strong>+92 XXX-XXXXXXX</strong>
        </p>

        <!-- FORM START -->
        <form @submit.prevent="submitOTP" class="otp-form">

          <div class="otp-inputs mb-4">
            <input 
              type="text" 
              maxlength="1" 
              inputmode="numeric" 
              pattern="[0-9]" 
              class="otp-box" 
              v-model="otp[0]"
              @input="moveFocus($event, 0)"
              @keydown="handleKeydown($event, 0)"
              ref="input0"
              required
            />
            <input 
              type="text" 
              maxlength="1" 
              inputmode="numeric" 
              pattern="[0-9]" 
              class="otp-box" 
              v-model="otp[1]"
              @input="moveFocus($event, 1)"
              @keydown="handleKeydown($event, 1)"
              ref="input1"
              required
            />
            <input 
              type="text" 
              maxlength="1" 
              inputmode="numeric" 
              pattern="[0-9]" 
              class="otp-box" 
              v-model="otp[2]"
              @input="moveFocus($event, 2)"
              @keydown="handleKeydown($event, 2)"
              ref="input2"
              required
            />
            <input 
              type="text" 
              maxlength="1" 
              inputmode="numeric" 
              pattern="[0-9]" 
              class="otp-box" 
              v-model="otp[3]"
              @input="moveFocus($event, 3)"
              @keydown="handleKeydown($event, 3)"
              ref="input3"
              required
            />
            <input 
              type="text" 
              maxlength="1" 
              inputmode="numeric" 
              pattern="[0-9]" 
              class="otp-box" 
              v-model="otp[4]"
              @input="moveFocus($event, 4)"
              @keydown="handleKeydown($event, 4)"
              ref="input4"
              required
            />
          </div>

          <!-- Hidden input to send full OTP -->
          <input type="hidden" name="otp" :value="fullOTP" />

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-success btn-lg px-5 rounded-pill w-100"
            :disabled="fullOTP.length !== 5"
          >
            <span v-if="fullOTP.length === 5">Verify OTP</span>
            <span v-else>Enter 5 digits</span>
          </button>

        </form>
        <!-- FORM END -->

        <div class="mt-3">
          <small class="text-muted">
            Didn't receive code? 
            <a href="#" class="text-primary fw-bold">Resend Code</a>
          </small>
        </div>

        <!-- For Testing: Show OTP -->
        <div class="mt-3 text-success fw-bold">
          OTP: {{ fullOTP || '-----' }}
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import userService from '@/services/userService.js' 
import { useRouter } from "vue-router";
import { ref, computed, nextTick, onMounted } from 'vue'
const router = useRouter();
// 5 digit OTP array
const otp = ref(['', '', '', '', ''])

// Full OTP as string (for sending to backend)
const fullOTP = computed(() => otp.value.join(''))

// Auto move to next input
const moveFocus = (e, index) => {
  const value = e.target.value
  if (value && index < 4) {
    nextTick(() => {
      const nextInput = document.querySelectorAll('.otp-box')[index + 1]
      nextInput?.focus()
    })
  }
}

// Backspace handling
const handleKeydown = (e, index) => {
  if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
    nextTick(() => {
      const prevInput = document.querySelectorAll('.otp-box')[index - 1]
      prevInput?.focus()
    })
  }
}

// Form submit
const submitOTP = async () => {
  if (fullOTP.value.length === 5) {
        const userData = {
          otp: fullOTP.value,
        }
         try {
           const result =  await userService.otpVerifiy(userData)
           if(result.otp)
           {
             router.push('/login');
           }
           
         }catch(error){
            alert(error.message || "Invalid Otp")
         }
    
  }
}

// First input pe focus page load pe
onMounted(() => {
  document.querySelector('.otp-box')?.focus()
})
</script>

<style scoped>
.otp-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.otp-card {
  max-width: 420px;
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  background: white;
  overflow: hidden;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 30px 0;
}

.otp-box {
  width: 68px;
  height: 72px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border: 3px solid #ddd;
  border-radius: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.otp-box:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.3);
  transform: scale(1.08);
}

.otp-box:valid {
  border-color: #28a745;
  background: #f8fff8;
}

.btn-success {
  height: 56px;
  font-size: 1.1rem;
  font-weight: bold;
}
</style>