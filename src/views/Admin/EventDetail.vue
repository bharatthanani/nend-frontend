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
              <p class="fw-semibold fs-5 mb-1">Ahmed Khan</p>
              <p class="text-secondary mb-0">Father: <strong>Shabbir Khan</strong></p>
            </div>

            <div class="col-md-6 mb-3">
              <h6 class="text-muted">Bride (Dulhan)</h6>
              <p class="fw-semibold fs-5 mb-1">Ayesha Tariq</p>
              <p class="text-secondary mb-0">Father: <strong>Tariq Hussain</strong></p>
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
              <p class="fw-semibold">Barat</p>
            </div>

            <div class="col-md-4 mb-3">
              <h6 class="text-muted">Event Date</h6>
              <p class="fw-semibold">12 December 2025</p>
            </div>

            <div class="col-md-4 mb-3">
              <h6 class="text-muted">Event Time</h6>
              <p class="fw-semibold">08:00 PM</p>
            </div>

            <div class="col-md-12 mb-3">
              <h6 class="text-muted">Venue / Location</h6>
              <p class="fw-semibold fs-6">Royal Palace Banquet Hall, Karachi</p>
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
            <div class="alert alert-light border">
              Bride arrival at 7:30 PM. Photographer: XYZ Studio.
              Car decoration required. Catering confirmed for 250 guests.
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
                <span>Event Type:</span> <strong>Barat</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Date:</span> <strong>12 Dec 2025</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Guests:</span> <strong>250</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Contact:</span> <strong>0312-3456789</strong>
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
