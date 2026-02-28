<template>
  <div class="container-fluid py-4">
    
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-0">Event Management Dashboard</h2>
        <p class="text-muted mb-0">
          Welcome back, {{ user.name }} 👋
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3">

      <!-- Total Events -->
      <div class="col-md-3 col-sm-6">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <i class="bi bi-calendar-event fs-2 text-primary"></i>
            <h5 class="mt-3 mb-1 fw-semibold">Total Events</h5>
            <p class="text-muted mb-0">128</p>
          </div>
        </div>
      </div>

      <!-- Wedding Bookings -->
      <div class="col-md-3 col-sm-6">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <i class="bi bi-heart-fill fs-2 text-danger"></i>
            <h5 class="mt-3 mb-1 fw-semibold">Wedding Bookings</h5>
            <p class="text-muted mb-0">45</p>
          </div>
        </div>
      </div>

      <!-- Hall Bookings -->
      <div class="col-md-3 col-sm-6">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <i class="bi bi-building fs-2 text-success"></i>
            <h5 class="mt-3 mb-1 fw-semibold">Hall Bookings</h5>
            <p class="text-muted mb-0">76</p>
          </div>
        </div>
      </div>

      <!-- Available Halls -->
      <div class="col-md-3 col-sm-6">
        <div class="card shadow-sm border-0 rounded-3">
          <div class="card-body text-center">
            <i class="bi bi-door-open fs-2 text-warning"></i>
            <h5 class="mt-3 mb-1 fw-semibold">Available Halls</h5>
            <p class="text-muted mb-0">12</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Revenue + Upcoming Events -->
    <div class="row mt-4 g-3">

      <!-- Revenue Card -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-header bg-white fw-semibold">
            <i class="bi bi-cash-stack me-2 text-success"></i>
            Monthly Revenue
          </div>
          <div class="card-body">
            <h3 class="fw-bold text-success">$25,400</h3>
            <p class="text-muted">Revenue from hall & wedding bookings</p>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-header bg-white fw-semibold">
            <i class="bi bi-calendar-check me-2 text-primary"></i>
            Upcoming Events
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Ali & Sara Wedding - 12 March</li>
              <li class="list-group-item">Corporate Meetup - 18 March</li>
              <li class="list-group-item">Birthday Party - 22 March</li>
              <li class="list-group-item">Mehndi Ceremony - 28 March</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
document.title = "Event Dashboard";

const user = {
  name: "Bharat"
};
</script>