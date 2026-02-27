<template>
  <div class="container-fluid py-5">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-0">Hall Management</h2>
        <p class="text-muted small mb-0">Add, edit and manage halls — all required fields are validated.</p>
      </div>

      <div>
        <button
            class="btn btn-dark rounded-pill"
            data-bs-toggle="offcanvas"
            data-bs-target="#hallFormOffcanvas"
            @click="openAddHallForm"
           v-if="$hasPermission('/add-hall','POST')"
        >
          <i class="bi bi-plus-lg me-2" ></i> Add New Hall
        </button>
      </div>
    </div>

    <!-- Table Card -->
    <div class="card shadow-sm mb-4">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Hall Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Price (USD)</th>
              <th>Amenities</th>
              <th>Hall Type</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
            </thead>

            <tbody>
            <tr v-if="halls.length === 0">
              <td colspan="8" class="text-center py-4 text-muted">No halls found. Add a new hall to begin.</td>
            </tr>

            <tr v-for="(h, index) in halls" :key="h.id">
              <td>{{ index + 1 }}</td>
              <td class="fw-semibold">{{ h.hall_name }}</td>
              <td>{{ h.location }}</td>
              <td>{{ h.capacity }}</td>
              <td>{{ formatPrice(h.price) }}</td>
              <td>
                <div v-for="(row, rowIndex) in chunkArray(h.amenities, 3)" :key="rowIndex" class="mb-1">
                  <span v-for="(a, ai) in row" :key="ai" class="badge bg-light text-dark me-1">
                    {{ a.amenities_name }}
                  </span>
                </div>
              </td>

                <td>{{ h.hall_type }}</td>
              <td>
                  <span :class="['badge', h.availability ? 'bg-success' : 'bg-secondary']">
                    {{ h.availability ? 'Available' : 'Not Available' }}
                  </span>
              </td>
              <td class="text-center">
                <router-link :to="{ name: 'hallDetail', params: { id: h.id } }"  class="btn btn-sm btn-outline-primary me-2"><i class="bi bi-eye-fill"></i></router-link>
                <button class="btn btn-sm btn-outline-primary me-2">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteHall(h.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>

    <!-- Offcanvas Form (Add / Edit) -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="hallFormOffcanvas" aria-labelledby="hallFormLabel">
      <div class="offcanvas-header">
        <h5 id="hallFormLabel" class="fw-bold">{{ editMode ? 'Edit Hall' : 'Add New Hall' }}</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" @click="resetForm"></button>
      </div>

      <div class="offcanvas-body">
        <form ref="hallFormRef" @submit.prevent="saveHall" novalidate class="needs-validation">

          <!-- Hall Name -->
          <div class="mb-3">
            <label class="form-label">Hall Name <span class="text-danger">*</span></label>
            <input
                type="text"
                v-model="form.name"
                class="form-control form-control-lg"
                placeholder="e.g. Royal Palace Hall"
                required
            />
            <div class="invalid-feedback">Hall name is required.</div>
          </div>

          <!-- Location -->
          <div class="mb-3">
            <label class="form-label">Location <span class="text-danger">*</span></label>
            <input
                type="text"
                v-model="form.location"
                class="form-control"
                placeholder="City / Area"
                required
            />
            <div class="invalid-feedback">Location is required.</div>
          </div>

          <!-- Capacity & Price -->
          <div class="row g-3 mb-3">
            <div class="col">
              <label class="form-label">Capacity (guests) <span class="text-danger">*</span></label>
              <input
                  type="number"
                  v-model.number="form.capacity"
                  class="form-control"
                  min="1"
                  placeholder="e.g. 300"
                  required
              />
              <div class="invalid-feedback">Please enter capacity.</div>
            </div>

            <div class="col">
              <label class="form-label">Price (USD) <span class="text-danger">*</span></label>
              <input
                  type="number"
                  v-model.number="form.price"
                  class="form-control"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 250.00"
                  required
              />
              <div class="invalid-feedback">Please enter price.</div>
            </div>
          </div>

           <div class="mb-4">
            <label class="form-label d-block">Owner Name</label>
            <select v-model="form.owner_id" class="form-select" required>
              <option :value="1">Bharat Kumar</option>
              <option :value="2">Raj Kumar</option>
              <option :value="3">Venjhraaj</option>
            </select>
          </div>

          <!-- contact_number -->
          <div class="mb-3">
            <label class="form-label">Contact Number <span class="text-danger">*</span></label>
            <input
                type="number"
                v-model="form.contact_number"
                class="form-control"
                placeholder="e.g. 0300-1234567"
                required
            />
            <div class="invalid-feedback">Contact number is required.</div>
          </div>

          <!-- Amenities (checkbox list) -->
          <div class="mb-3">
            <label class="form-label d-block">Amenities <span class="text-muted small">(select at least one)</span></label>

            <div class="d-flex flex-wrap gap-2">
              <div class="form-check" v-for="amen in amenitiesList" :key="amen">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'amen_'+amen"
                    :value="amen"
                    v-model="form.amenities"
                />
                <label class="form-check-label" :for="'amen_'+amen">{{ amen }}</label>
              </div>
            </div>

            <div v-if="amenitiesError" class="text-danger small mt-2">Please select at least one amenity.</div>
          </div>

          <!-- Photos (static placeholder) -->
          <div class="mb-3">
            <label class="form-label">Hall Photo</label>
            <input type="file" class="form-control" @change="onPhotoChange" />
            <div v-if="form.photoPreview" class="mt-2">
              <img :src="form.photoPreview" alt="preview" class="img-thumbnail" style="max-width:180px" />
            </div>
          </div>

           <!-- Availability -->
          <div class="mb-4">
            <label class="form-label d-block">Hall Type</label>
            <select v-model="form.hall_type" class="form-select" required>
              <option value="basic">Basic</option>
              <option value="advance">Advance</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <!-- Availability -->
          <div class="mb-4">
            <label class="form-label d-block">Availability</label>
            <select v-model="form.availability" class="form-select" required>
              <option :value="1">Available</option>
              <option :value="0">Not Available</option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-light rounded-pill" data-bs-dismiss="offcanvas" @click="resetForm">Cancel</button>
            <button type="submit" class="btn btn-dark rounded-pill ms-auto">
              {{ editMode ? 'Update Hall' : 'Create Hall' }}
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
import userService from '@/services/userService';
import { useToast } from 'vue-toastification';
const toast = useToast();

document.title = "Hall Management"
export default {
  name: 'HallManagement',
  data() {
    return {
      halls: [],

      amenitiesList: ['Decoration', 'Sound', 'Lighting', 'Parking', 'Projector', 'Catering','Air Conditioning','Stage Setup','Backup Generator','Wheelchair Access','Security Staff','Bridal Room'],

      // form model
      form: this.emptyForm(),

      editMode: false,
      editingId: null,

      amenitiesError: false
    };
  },

  created(){
    this.getHalls();
  },
  methods: {
    openAddHallForm() {
    this.resetForm(); // initialize form
    this.editMode = false;
  },
    emptyForm() {
      return {
        name: '',
        owner_id: null,
        location: '',
        capacity: null,
        price: null,
        contact_number: '',
        amenities: [],
        active: true,
        photo: null,
        photoPreview: null,
        hall_type: null,
        availability:null,
      };
    },

    formatPrice(val) {
      if (val === null || val === undefined) return '-';
      return `$${Number(val).toFixed(2)}`;
    },

    onPhotoChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.form.photo = file;

      const reader = new FileReader();
      reader.onload = (ev) => {
        this.form.photoPreview = ev.target.result;
      };
      reader.readAsDataURL(file);
    },

    validateAmenities() {
      this.amenitiesError = !(this.form.amenities && this.form.amenities.length > 0);
      return !this.amenitiesError;
    },

   async saveHall() {  
      const formEl = this.$refs.hallFormRef;
      if (!formEl.checkValidity()) {
        // show browser validation messages
        formEl.classList.add('was-validated');
        return;
      }

      // amenities validation
      if (!this.validateAmenities()) return;

      if (this.editMode && this.editingId !== null) {
        // update
        const idx = this.halls.findIndex(h => h.id === this.editingId);
        if (idx !== -1) {
          this.halls.splice(idx, 1, {
            id: this.editingId,
            name: this.form.name,
            location: this.form.location,
            capacity: Number(this.form.capacity),
            price: Number(this.form.price),
            amenities: [...this.form.amenities],
            contact_number: this.form.contact_number,
            active: this.form.active,
            photoPreview: this.form.photoPreview || null
          });
        }
      } else {
        // create new id
         const data= {
            'hall_name':this.form.name,
            'location':this.form.location,
            'capacity':this.form.capacity,
            'price':this.form.price,
            'owner_id':this.form.owner_id,
            'contact_number':this.form.contact_number,
            'availability':this.form.availability,
            'hall_type':this.form.hall_type,
            'amenities':[...this.form.amenities],
            'hall_photo':this.form.photoPreview || null,
         };
          const response = await userService.addHall(data);
           toast.success(response.message);
           this.getHalls();
           this.form = this.emptyForm();
      }
    },

    async getHalls()
    {
        try{
          const response = await userService.getHalls();
          this.halls = response.data;
        }catch(error)
        {
          console.log("Something went wrong please try again");
        }
    },  
    deleteHall(id) {
      if (!confirm('Are you sure you want to delete this hall?')) return;
      this.halls = this.halls.filter(h => h.id !== id);
    },

    resetForm() {
      this.form = this.emptyForm();
      this.editMode = false;
      this.editingId = null;
      this.amenitiesError = false;
      const formEl = this.$refs.hallFormRef;
      if (formEl) {
        formEl.classList.remove('was-validated');
      }
    },
    chunkArray(array, chunkSize) {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    }
  }
};
</script>

<style scoped>
/* Premium visual styling */
.container { max-width: 1100px; }

/* Header */
h2 { font-size: 26px; }

/* Table card */
.card { border-radius: 14px; }

/* Table hover */
.table-hover tbody tr:hover { background: #fbfbfd; }

/* Offcanvas form styling */
.offcanvas { width: 480px; max-width: 95%; }
.offcanvas-body { padding: 1.5rem; }

/* Form inputs */
.form-control-lg { font-size: 1rem; padding: 10px 12px; }

/* Amenities badges */
.badge { border-radius: 6px; padding: 6px 8px; font-size: 12px; }

/* Buttons */
.btn-dark { background: #111827; border: none; }
.btn-dark:hover { background: #0b1220; }

/* Image preview */
.img-thumbnail { border-radius: 8px; border: 1px solid #e8e8ef; }

/* small responsiveness */
@media (max-width: 576px) {
  .offcanvas { width: 100% !important; }
}
</style>
