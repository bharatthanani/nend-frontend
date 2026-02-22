<template>
 
    <div class="container-fluid py-4">
      <!-- Page Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="fw-bold mb-0">Dashboard</h2>
          <p class="text-muted mb-0">Welcome back, {{ user.name }} 👋</p>
        </div>
        
      </div>

      <!-- Stats Cards -->
      <div class="row g-3">
        <div class="col-md-3 col-sm-6">
          <div class="card shadow-sm border-0 rounded-3">
            <div class="card-body text-center">
              <i class="bi bi-people fs-2 text-primary"></i>
              <h5 class="mt-3 mb-1 fw-semibold">Users</h5>
              <p class="text-muted mb-0">1,245</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6">
          <div class="card shadow-sm border-0 rounded-3">
            <div class="card-body text-center">
              <i class="bi bi-bar-chart fs-2 text-success"></i>
              <h5 class="mt-3 mb-1 fw-semibold">Reports</h5>
              <p class="text-muted mb-0">56</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6">
          <div class="card shadow-sm border-0 rounded-3">
            <div class="card-body text-center">
              <i class="bi bi-bag-check fs-2 text-warning"></i>
              <h5 class="mt-3 mb-1 fw-semibold">Sales</h5>
              <p class="text-muted mb-0">$12,450</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-6">
          <div class="card shadow-sm border-0 rounded-3">
            <div class="card-body text-center">
              <i class="bi bi-clock-history fs-2 text-danger"></i>
              <h5 class="mt-3 mb-1 fw-semibold">Pending Tasks</h5>
              <p class="text-muted mb-0">8</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card mt-4 border-0 shadow-sm rounded-3">
        <div class="card-header bg-white fw-semibold">
          <i class="bi bi-activity me-2 text-primary"></i>Recent Activity
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">User John updated a proposal.</li>
            <li class="list-group-item">New invoice created by {{ user.name }}.</li>
            <li class="list-group-item">Payment received from client ABC Corp.</li>
            <li class="list-group-item">System backup completed successfully.</li>
          </ul>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import Layout from './Layout.vue';
document.title = "Dashboard";
const user = {
  name: "Bharat"
};
</script>
