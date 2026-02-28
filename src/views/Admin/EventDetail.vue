<template>
  <div class="container-fluid py-4">

    <!-- Page Title -->
    <div class="mb-4">
      <h2 class="fw-bold mb-1">
        <i class="bi bi-heart-fill text-danger me-2"></i> Wedding Event Details
      </h2>
      <p class="text-muted">Complete information about this wedding ceremony</p>
    </div>

    <div class="row">

      <!-- LEFT SIDE CONTENT -->
      <div class="col-lg-8">

        <!-- Groom & Bride Card -->
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="fw-bold mb-0">
              <i class="bi bi-people-fill me-2 text-primary"></i> Couple Information
            </h5>
          </div>
          <div class="card-body row">

            <div class="col-md-6 mb-3">
              <h6 class="text-muted">Groom (Dulha)</h6>
              <p class="fw-semibold fs-5 mb-1" v-if="eventData?.groom">{{  eventData?.groom.first_name }} {{  eventData?.groom.last_name }}</p>
              <p class="text-secondary mb-0" v-if="eventData?.groom.father">Father: <strong>{{ eventData?.groom.father.first_name }} {{ eventData?.groom.father.last_name }}</strong></p>
            </div>

            <div class="col-md-6 mb-3">
              <h6 class="text-muted">Bride (Dulhan)</h6>
              <p class="fw-semibold fs-5 mb-1" v-if="eventData?.bride"> {{  eventData?.bride.first_name }} {{ eventData?.bride.last_name }}</p>
              <p class="text-secondary mb-0" v-if="eventData?.bride.father">Father: <strong>{{ eventData?.bride.father.first_name }} {{ eventData?.bride.father.last_name }}</strong></p>
            </div>

          </div>
        </div>

        <!-- Event Details Card -->
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="fw-bold mb-0">
              <i class="bi bi-calendar-event me-2 text-success"></i> Event Information
            </h5>
          </div>
          <div class="card-body row">

            <div class="col-md-4 mb-3">
              <h6 class="text-muted">Event Type</h6>
              <p class="fw-semibold">{{ eventData?.event_type }}</p>
            </div>

            <div class="col-md-4 mb-3">
              <h6 class="text-muted">Event Date</h6>
              <p class="fw-semibold">{{ formatDate(eventData?.event_date) }}</p>
            </div>

            <div class="col-md-4 mb-3">
              <h6 class="text-muted">Event Time</h6>
              <p class="fw-semibold">{{ formatTime(eventData?.event_time) }}</p>
            </div>

            <div class="col-md-12 mb-3">
              <h6 class="text-muted">Venue / Location</h6>
              <p class="fw-semibold fs-6">{{ eventData?.location }}</p>
            </div>

          </div>
        </div>

        <!-- Notes Card -->
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="fw-bold mb-0">
              <i class="bi bi-journal-text me-2 text-warning"></i> Additional Notes
            </h5>
          </div>
          <div class="card-body">
            <div class="alert alert-light border">{{ eventData?.additional_note }}.
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT SIDE SUMMARY -->
      <div class="col-lg-4">

        <div class="card shadow-sm sticky-top" style="top: 90px;">
          <div class="card-body">

            <h5 class="fw-bold mb-3">
              <i class="bi bi-info-circle me-2 text-primary"></i> Quick Summary
            </h5>

            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between">
                <span>Event Type:</span> <strong>{{  eventData?.event_type }}</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Date:</span> <strong>{{ formatDate(eventData?.event_date) }}</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Guests:</span> <strong>{{ eventData?.number_of_guest }}</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Contact:</span> <strong>{{ eventData?.contact_number }}</strong>
              </li>
            </ul>

            <div class="d-grid gap-2">
              <button class="btn btn-outline-primary">
                <i class="bi bi-pencil me-1"></i> Edit Event
              </button>

              <button class="btn btn-danger">
                <i class="bi bi-trash me-1"></i> Delete Event
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script setup>
import userService from '@/services/userService';
import { formatDate, formatTime } from '@/utils/helper';
import {ref , onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const eventId = route.params.id;

const eventData = ref(null);
const loading = ref(false);

const getEventDetail =  async () => {
    loading.value = true;
   try{
      const response = await userService.getEventDetail(eventId);
      eventData.value = response.data;
   }catch(error)
   {
     console.log(error,'Something went wrong');

   }finally{
      loading.value = false;
   }
};
onMounted(() => {
 getEventDetail();
});
</script>
