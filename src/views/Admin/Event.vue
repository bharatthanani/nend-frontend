<template>
  <div class="container-fluid py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="mb-0">
        <i class="bi bi-calendar-heart me-2"></i> Wedding Event Management
      </h4>
      <button class="btn btn-primary btn-sm" data-bs-toggle="offcanvas" @click="onCanvasOpen" data-bs-target="#addEventForm">
        <i class="bi bi-plus-circle me-1"></i> Add New Event
      </button>
    </div>

    <!-- Search -->
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Search event, groom, bride..." />
    </div>

    <!-- Table -->
    <div class="card shadow-sm mb-3">
      <div class="card-body p-0">
        <table class="table table-striped mb-0 align-middle">
          <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Groom Name</th>
            <th>Bride Name</th>
            <th>Event Type</th>
            <th>Date</th>
            <th>Venue</th>
            <th class="text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td class="fw-semibold">Ahmed</td>
            <td>Ayesha</td>
            <td><span class="badge bg-primary">Barat</span></td>
            <td>12 Dec 2025</td>
            <td>Karachi</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-1">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td class="fw-semibold">Bilal</td>
            <td>Hina</td>
            <td><span class="badge bg-success">Walima</span></td>
            <td>15 Dec 2025</td>
            <td>Lahore</td>
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
          <a class="page-link">Previous</a>
        </li>
        <li class="page-item active"><a class="page-link">1</a></li>
        <li class="page-item"><a class="page-link">2</a></li>
        <li class="page-item"><a class="page-link">3</a></li>
        <li class="page-item">
          <a class="page-link">Next</a>
        </li>
      </ul>
    </nav>

    <!-- Offcanvas Form -->
    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="addEventForm"
         @change="handleChange"
        aria-labelledby="addEventFormLabel"
    >
      <div class="offcanvas-header">
        <h5 id="addEventFormLabel" class="fw-bold">Add New Wedding Event</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>

      <div class="offcanvas-body">
        <form ref="hallFormRef"  @submit.prevent="addBrideEvent"  novalidate class="needs-validation">

          <!-- Groom -->
          <div class="mb-3">
            <label class="form-label">Groom (Dulha) Name</label>
            <select class="form-select" v-model="form.groom_id" @change="getGroomFather" required>
              <option :value="null" disabled >Select Groom (Dulha) Name</option>
              <option v-for="groom in grooms_list" :value="groom.id">{{ groom.first_name }} {{ groom.last_name }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Groom Father Name</label>
            <select class="form-select" v-model="form.groom_father_id" required>
              <option :value="null" disabled>Select Groom Father Name</option>
              <option v-for="g_father in groom_father" :value="g_father.id">{{ g_father.first_name }} {{ g_father.last_name }}</option>
            </select>
          </div>

          <!-- Bride -->
          <div class="mb-3">
            <label class="form-label">Bride (Dulhan) Name</label>
            <select class="form-select" v-model="form.bride_id" @change="getBrideFather" required>
              <option :value="null" disabled>Select Bride (Dulhan) Name</option>
              <option v-for="bride in birdes_list" :value="bride.id">{{ bride.first_name }} {{ bride.last_name }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Bride Father Name</label>
            <select class="form-select" v-model="form.bride_father_id"  required>
              <option :value="null" disabled>Select Bride Father Nam</option>
              <option v-for="b_father in bride_father" :value="b_father.id">{{ b_father.first_name }} {{ b_father.last_name }}</option>
            </select>
          </div>

          <!-- Event Type -->
          <div class="mb-3">
            <label class="form-label">Event Type</label>
            <select class="form-select" v-model="form.event_type" required>
              <option :value="null" disabled>Select Event Type</option>
              <option value="Barat">Barat</option>
              <option value="Walima">Walima</option>
              <option value="Mehndi">Mehndi</option>
              <option value="Nikkah">Nikkah</option>
            </select>
          </div>

          <!-- Venue -->
          <div class="mb-3">
            <label class="form-label">Venue / Location</label>
            <input type="text" v-model="form.location" class="form-control" placeholder="Event venue" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Event Hall</label>
            <select class="form-select" v-model="form.hall_id" required>
              <option :value="null" disabled>Select Event Hall</option>
              <option v-for="hall in hall_list" :value="hall.id">{{ hall.hall_name }}</option>
            </select>
          </div>

          <!-- Date & Time -->
          <div class="mb-3">
            <label class="form-label">Event Date</label>
            <input type="date" v-model="form.event_date" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Event Time</label>
            <input type="time" v-model="form.event_time" class="form-control" required />
          </div>

          <!-- Contact -->
          <div class="mb-3">
            <label class="form-label">Contact Number</label>
            <input type="number" v-model="form.contact_number" class="form-control" placeholder="03xxxxxxxxx" required />
          </div>

          <!-- Guests -->
          <div class="mb-3">
            <label class="form-label">Number of Guests</label>
            <input type="number" v-model="form.number_of_guest" class="form-control" placeholder="Enter guest count" required />
          </div>

          <!-- Notes -->
          <div class="mb-3">
            <label class="form-label">Additional Notes</label>
            <textarea class="form-control" v-model="form.additional_note" rows="3" placeholder="Any additional information" required></textarea>
          </div>

          <button type="submit" class="btn btn-success w-100">
            <i class="bi bi-check-lg me-1"></i> Save Event
          </button>

        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import userService from '@/services/userService';
  import { useToast } from 'vue-toastification';
  const toast = useToast();
  export default{
    data()
    {
      return{
         events: [],
         birdes_list: [],
         grooms_list: [],
         groom_father: null,
         bride_father: null,
         hall_list:[],
         offcanvasInitialized: false,
         form:{
            groom_id:null,
            groom_father_id:null,
            bride_id:null,
            bride_father_id:null,
            event_type:null,
            location:null,
            hall_id:null,
            event_date:null,
            event_time:null,
            contact_number:null,
            number_of_guest:null,
            additional_note:null,
          },
          editMode: false,
          editingId: null,
      }
    },
    created()
    {

    },
    mounted() {
     
    },
    methods:{
      async addBrideEvent()
      {
        try{
        const formEl = this.$refs.hallFormRef;
        if (!formEl.checkValidity()) {
          formEl.classList.add('was-validated');
          return;
        }

        if (this.editMode && this.editingId !== null) {
          // update
          const idx = this.events.findIndex(h => h.id === this.editingId);
          if (idx !== -1) {
            this.events.splice(idx, 1, {
              id: this.editingId,
              groom_id: this.form.groom_id,
              groom_father_id: this.form.groom_father_id,
              bride_id: this.form.bride_id,
              bride_father_id: this.form.bride_father_id,
              event_type: this.form.event_type,
              location: this.form.location,
              hall_id: this.form.hall_id,
              event_date: this.form.event_date,
              event_time: this.form.event_time,
              contact_number: this.form.contact_number,
              number_of_guest: this.form.number_of_guest,
              additional_note: this.form.additional_note
            });
          }
        }
        else
        {
          const eventData = {
                groom_id:this.form.groom_id,
                groom_father_id:this.form.groom_father_id,
                bride_id:this.form.bride_id,
                bride_father_id:this.form.bride_father_id,
                event_type:this.form.event_date,
                location:this.form.location,
                hall_id:this.form.hall_id,
                event_date:this.form.event_date,
                event_time:this.form.event_time,
                contact_number:this.form.contact_number,
                number_of_guest:this.form.number_of_guest,
                additional_note:this.form.additional_note,
          }
          const { data } = await userService.addEvents(eventData)
          console.log("ssss",data)
          if(data.success)
          {
            toast.success(data.message);
          }else{
            toast.error(data.message);
          }
            
        }
       }catch(error){
         toast.error(error.message);
        console.error("Error:", error)
       }
      },
      async onCanvasOpen() {
        const grooms = await userService.getGrooms();
        const brides = await userService.getBrides();
        const halls = await userService.getHalls();
        this.birdes_list = brides.data;
        this.grooms_list = grooms.data;
        this.hall_list = halls.data;
        console.log('Offcanvas opened');
      },
      async getGroomFather()
      {
         try{
          const response = await userService.getFather(this.form.groom_id)
          this.groom_father = response.data ? [response.data] : [];
         }catch(error)
         {
            console.log(error);
         }
      },
      async getBrideFather()
      {
         try{
          const response = await userService.getFather(this.form.bride_id)
          this.bride_father = response.data ? [response.data] : [];
         }catch(error)
         {
            console.log(error);
         }
      }
    }
  }
</script>
