<template>
  <div class="container-fluid py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold mb-0">Users</h2>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#addUserForm"
      >
        <i class="bi bi-plus-lg me-1"></i> Add User
      </button>
    </div>

    <!-- Users Table -->
    <div class="card shadow-sm border-0 rounded-3">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Father Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>City/Village</th>
                <th>Role</th>
                <th>Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userList">
                <td>{{ user.id }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.father?.first_name || '' }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.village?.village_name || '' }}</td>
               
                <td><span class="badge bg-primary">{{ user.role }}</span></td>
                <td>
                  <span v-if="user.is_verified == 1" class="badge bg-success">
                    Active
                  </span>
                  <span v-else class="badge bg-danger">
                    Deactive
                  </span>
                </td>
                  
                <td class="text-center">
                  <router-link :to="{ name: 'userDetail', params: { id: user.id } }"  class="btn btn-sm btn-success me-1"><i class="bi bi-eye-fill"></i></router-link>
                  <button class="btn btn-sm btn-warning me-1" data-bs-toggle="offcanvas"
                    data-bs-target="#addUserForm"
                    @click="editUser(user)"
                    >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-sm btn-danger">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>  
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Offcanvas Form (Right Side) -->
    <div
  class="offcanvas offcanvas-end"
  tabindex="-1"
  id="addUserForm"
  aria-labelledby="addUserFormLabel"
>
  <div class="offcanvas-header">
    <h5 id="addUserFormLabel" class="fw-bold">Add / Update New User</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
  </div>

  <div class="offcanvas-body">
    <form @submit.prevent="addUser">
      <!-- Name Fields -->
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">First Name</label>
          <input type="text" v-model="newUser.first_name" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Last Name</label>
          <input type="text" v-model="newUser.last_name" class="form-control" required />
        </div>
      </div>

      <!-- Email -->
      <div class="mb-3 mt-3">
        <label class="form-label">Email</label>
        <input type="email" v-model="newUser.email" class="form-control" required />
      </div>

      <!-- Father -->
      <div class="mb-3">
        <label class="form-label">Father Name</label>
        <select v-model="newUser.father_id" class="form-select" required>
          <option :value="null" disabled>Please select father name</option>
          <option v-for="fathers in userList" :key="fathers.id" :value="fathers.id">
            {{ fathers.first_name }} {{ fathers.last_name }}
          </option>
        </select>
      </div>

      <!-- City/Village -->
      <div class="mb-3">
        <label class="form-label">City/Village</label>
        <select v-model="newUser.village_id" class="form-select" required>
          <option :value="null" disabled>Please select City/Village</option>
          <option v-for="village in villageList"  :value="village.id">
            {{ village.village_name }}
          </option>
        </select>
      </div>
      <!-- Gender & Marital Status -->
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Gender</label>
          <select v-model="newUser.gender" class="form-select" required>
            <option :value="null" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">Marital Status</label>
          <select v-model="newUser.marital_status" class="form-select" required>
            <option :value="null" disabled>Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widow">Widow</option>
          </select>
        </div>
      </div>

      <!-- CNIC & Date of Birth -->
      <div class="row g-3 mt-3">
        <div class="col-md-6">
          <label class="form-label">CNIC</label>
          <input
            type="number"
            v-model="newUser.cnic"
            class="form-control"
            placeholder="xxxxx-xxxxxxx-x"
           
            required
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Date of Birth</label>
          <input type="date" v-model="newUser.dob" class="form-control" required />
        </div>
      </div>


      <!-- Role -->
      <div class="mb-3">
        <label class="form-label">Role</label>
        <select v-model="newUser.role" class="form-select" required>
          <option :value="null" disabled>Please select role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </div>

      <!-- Profile -->
      <div class="mb-3 mt-3">
        <label class="form-label">Profile Picture</label>
        <input type="file" class="form-control"  @change="onPhotoChange" />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-success w-100 mt-3">
        <i class="bi bi-check-lg me-1"></i> Save User
      </button>
    </form>
  </div>
</div>

  </div>
</template>

<script >
import { reactive } from "vue";
import userService from "@/services/userService";
import villageServices from '@/services/villageServices';
import { Modal } from 'bootstrap'
import { useToast } from 'vue-toastification';
import Profile from "./Profile.vue";
const toast = useToast();

export default{
  data()
  {
    return {
      isEdit: false,
      editUserId: null,
      newUser:{
          first_name: '',
          last_name: '',
          email: '',
          father_id: null,
          village_id: null,
          role: null,
          marital_status:null,
          dob:null,
          cnic:null,
          gender:null,
          photo:null,
          photoPreview:null,

      },
      userList:[],
      villageList:[],
      loading: true,
    }
  },
  created() {
    this.fetchUsers();
    this.getVillageList();
    document.title = "User List";
  },
  
  methods:{
    onPhotoChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.newUser.photo = file;

      const reader = new FileReader();
      reader.onload = (ev) => {
        this.newUser.photoPreview = ev.target.result;
      };
      reader.readAsDataURL(file);
    },

    async fetchUsers(){
     this.loading = true;
      try {
        const response = await userService.getUserList();
      
        this.userList = response.data || response;
        console.log("Users loaded:", this.userList);
      } catch (error) {
        console.error("Error loading users:", error);
        alert("Failed to load users: " + (error.message || "Server error"));
      } finally {
        this.loading = false;
      }
        
    },
    async addUser() {

      const userData = {
          first_name: this.newUser.first_name,
          last_name: this.newUser.last_name,
          father_id: this.newUser.father_id,
          village_id: this.newUser.village_id,
          email: this.newUser.email,
          role: this.newUser.role,
          gender: this.newUser.gender,
          cnic: this.newUser.cnic,
          marital_status: this.newUser.marital_status,
          dob: this.newUser.dob,
          profile:this.newUser.photoPreview,
      };
     

       try {
       let response = null
        if (this.isEdit) {
      // UPDATE
           response = await userService.updateUser(this.editUserId, userData);
        
        } else {
          // ADD
          response = await userService.addUser(userData);
        }
  
      // Form reset
        this.newUser = {
          first_name: '',
          last_name: '',
          email: '',
          father_id: null,
          village_id: null,
          role: null,
        }
        if(response?.success)
        {
            toast.success(response.message);
            this.fetchUsers();
        }
      } catch (error) {
        alert(error.message || "Registration failed! Try again.")
        console.error("Error:", error)
      } finally {
        this.loading = false
      }
      // Here you can call your API or add user logic
    },
    editUser(user) {
        this.isEdit = true;
        this.editUserId = user.id;
        this.newUser = {
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',

          father_id: user.father?.id ?? null,
          village_id: user.village?.id ?? null,

          role: user.role,
          gender: user.gender ,
          marital_status: user.marital_status,

          cnic: user.cnic,
          dob: user.dob ? user.dob.split('T')[0] : null,
        };
      },


    async getVillageList(){
          this.loading = true;
         try {
            const response = await villageServices.villageList();
          
            this.villageList = response.data || response;
            console.log("Users loaded:", this.villageList);
          } catch (error) {
            console.error("Error loading village:", error);
            alert("Failed to load users: " + (error.message || "Server error"));
          } finally {
            this.loading = false;
          }
        
      }
  }
}

</script>
