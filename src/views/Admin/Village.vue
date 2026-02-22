<template>
  <div class="container-fluid py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="mb-0">
        <i class="bi bi-building me-2"></i> Village / City Management
      </h4>
      <button class="btn btn-primary btn-sm"  data-bs-toggle="offcanvas"
              data-bs-target="#addUserForm">
        <i class="bi bi-plus-circle me-1"></i> Add New Village
      </button>
    </div>

    <!-- Search bar -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search village or city..."
      />
    </div>

    <!-- Table -->
    <div class="card shadow-sm mb-3">
      <div class="card-body p-0">
        <table class="table table-striped mb-0 align-middle ">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Village / City Name</th>
              <th>District</th>
              <th>Population</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="village in villageList">
              <td>{{ village.id }}</td>
              <td class="fw-semibold">{{ village.village_name }}</td>
              <td>{{ village.district_name }}</td>
              <td>{{ village.village_population }}</td>
              <td><span class="badge bg-success">Active</span></td>
              <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-right">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>

    <!-- Offcanvas Form (Right Side) -->
    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="addUserForm"
        aria-labelledby="addUserFormLabel"
    >
      <div class="offcanvas-header">
        <h5 id="addUserFormLabel" class="fw-bold">Add New Village</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <form @submit.prevent="addVillage">
          <div class="mb-3">
            <label class="form-label">Village Name</label>
            <input type="text" v-model="villageForm.village_name" class="form-control" placeholder="Village name" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Population</label>
            <input type="text" v-model="villageForm.village_population" class="form-control" placeholder="Population" required />
          </div>

          <div class="mb-3">
            <label class="form-label">City/Village</label>
            <select v-model="villageForm.district_name" class="form-select" required>
              <option value="" selected >Please select District</option>
              <option value="Mithi">Mithi</option>
              <option value="Diplo">Diplo</option>
              <option value="Islamkot">Islamkot</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Village Profie</label>
            <input type="file" class="form-control"  />
          </div>
          <button type="submit" class="btn btn-success w-100">
            <i class="bi bi-check-lg me-1"></i> Save Village
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import villageServices from '@/services/villageServices';
 export default {
   data(){
     return {
       villageForm:[
         {
           'village_name':null,
           'village_population':null,
           'district_name':null,
         }
       ],
       villageList:[],
       loading : false,
     };
   },
   mounted()
   {
    this.getVillageList();
   },
   methods:{
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
