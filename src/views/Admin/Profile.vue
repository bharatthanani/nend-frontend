<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <!-- Loading State -->
      <div v-if="loading" class="col-md-8 col-lg-6 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading your profile...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="col-md-8 col-lg-6">
        <div class="alert alert-danger text-center">
          {{ error }}
          <button class="btn btn-sm btn-outline-danger mt-2" @click="fetchProfile">
            Retry
          </button>
        </div>
      </div>

      <!-- Profile Card (Real Data) -->
      <div v-else class="col-md-8 col-lg-6">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center p-4">
            <!-- Avatar -->
            <div class="profile-avatar mx-auto mb-3">
              <img 
                :src="user.avatar || ''" 
                alt="User Avatar" 
                class="rounded-circle shadow-sm"
              />
            </div>

            <!-- Name & Role -->
            <h4 class="fw-bold mb-1">{{ user.first_name }} {{ user.last_name }}</h4>
            <p class="text-muted mb-3">{{ user.role || 'User' }}</p>

            <!-- Info -->
            <div class="text-start border-top pt-3">
              <p><i class="bi bi-envelope text-primary me-2"></i><strong>Email:</strong> {{ user.email }}</p>
              <p><i class="bi bi-telephone text-success me-2"></i><strong>Phone:</strong> {{ user.phone_number || 'Not added' }}</p>
              <p><i class="bi bi-calendar3 text-warning me-2"></i><strong>Member Since:</strong> {{ formatDate(user.createdAt) }}</p>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-center gap-2 mt-4">
              <button 
                class="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#editProfileModal"
                @click="openEditModal"
              >
                <i class="bi bi-pencil-square me-1"></i> Edit Profile
              </button>
              <button class="btn btn-outline-danger" @click="logout">
                <i class="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </div>
        </div>

        <!-- About Card -->
        <div class="card mt-4 shadow-sm border-0 rounded-3">
          <div class="card-body">
            <h5 class="fw-bold mb-3">About</h5>
            <p class="text-muted mb-0">
              {{ user.bio || 'No bio added yet.' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
  <div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><i class="bi bi-pencil-square"></i> Edit Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProfile">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">First Name</label>
                <input v-model="editForm.first_name" type="text" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Last Name</label>
                <input v-model="editForm.last_name" type="text" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input v-model="editForm.email" type="email" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Phone</label>
                <input v-model="editForm.phone_number" type="text" class="form-control" />
              </div>
            
              <div class="col-12">
                <label class="form-label">About / Bio</label>
                <textarea v-model="editForm.bio" class="form-control" rows="4"></textarea>
              </div>
            </div>

            <div class="modal-footer mt-4">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-success" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import userService from '@/services/userService'
import { Modal } from 'bootstrap'
import { useToast } from 'vue-toastification';
const toast = useToast();

const user = ref({})
const loading = ref(true)
const error = ref(null)
const router = useRouter()
const editForm = ref({})

const openEditModal = () => {
  editForm.value = { ...user.value }  // Deep copy
}
// Fetch profile from token
const fetchProfile = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await userService.getProfile()
    user.value = response.user || response // backend ke hisaab se adjust karna
    console.log('Profile loaded:', user.value)
  } catch (err) {
    error.value = err.message || 'Failed to load profile. Please login again.'
    
    // Agar token expire ya invalid → login pe bhej do
    if (err.message.includes('Unauthorized') || err.message.includes('token')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}


const updateProfile = async () => {
  try {
    const response = await userService.updateProfile(editForm.value);
    user.value = { ...editForm.value }

     toast.success(response.message);
    } catch (error) {
    alert(error.message || "Failed to update profile")
  } finally {
    // saving.value = false
  }
}
// Format date nicely
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
}

// Logout
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

// Page load hote hi data fetch karo
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }
  fetchProfile()
})
</script>

<style scoped>
.profile-avatar img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 4px solid #007bff;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
</style>