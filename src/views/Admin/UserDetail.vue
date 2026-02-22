<template>
  <div class="container-fluid py-4 premium-bg">

    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title">User Profile</h2>
      <button class="btn btn-premium-dark btn-sm">
        <i class="bi bi-pencil-square"></i> Edit
      </button>
    </div>

    <!-- PROFILE CARD -->
    <div class="card premium-card mb-4">
      <div class="card-body p-4 d-flex align-items-center">

        <img src="https://via.placeholder.com/100" class="user-avatar-lg" />

        <div class="ms-4">
          <h3 class="user-name">Muhammad Ahmed</h3>
          <p class="user-subtitle">Male • Age: 26</p>
          <span class="status-chip active">Active</span>
        </div>

      </div>
    </div>

    <!-- BASIC INFO -->
    <div class="card premium-card mb-4">
      <div class="card-header premium-card-header">
        Basic Information
      </div>

      <div class="card-body p-4">

        <div class="row g-4">

          <div class="col-md-4">
            <p class="info-label">Father Name</p>
            <p class="info-value">Abdul Rehman</p>
          </div>

          <div class="col-md-4">
            <p class="info-label">CNIC</p>
            <p class="info-value">42101-1234567-0</p>
          </div>

          <div class="col-md-4">
            <p class="info-label">Marital Status</p>
            <p class="info-value">Married</p>
          </div>

        </div>

        <!-- MARRIED INFO BOX -->
        <div class="info-box mt-4">
          <p class="info-label">Spouse Name</p>
          <p class="info-value mb-3">Ayesha Ahmed</p>

          <p class="info-label">Short Details</p>
          <p class="info-desc">
            Married in 2022 — Living in Lahore. Families from Karachi.
          </p>
        </div>

      </div>
    </div>

    <!-- FAMILY DETAILS -->
    <div class="card premium-card mb-4">
      <div class="card-header premium-card-header">
        Family Details
      </div>

      <div class="card-body p-4">

        <!-- BROTHERS -->
        <h5 class="section-title mb-3">Brothers</h5>

        <div class="family-item">
          <div>
            <p class="member-name">Hamza Rehman</p>
            <span class="status-chip married">Married</span>
          </div>

          <div class="family-details-box">
            <p class="info-label">Spouse</p>
            <p class="info-value mb-1">Khadija Hamza</p>

            <p class="info-label">Details</p>
            <p class="info-desc">Married since 2020 — Living in Karachi.</p>
          </div>
        </div>

        <div class="family-item">
          <div>
            <p class="member-name">Farhan Rehman</p>
            <span class="status-chip single">Not Married</span>
          </div>
        </div>

        <hr class="divider">

        <!-- SISTERS -->
        <h5 class="section-title mb-3">Sisters</h5>

        <div class="family-item">
          <div>
            <p class="member-name">Ayesha Rehman</p>
            <span class="status-chip married">Married</span>
          </div>

          <div class="family-details-box">
            <p class="info-label">Husband</p>
            <p class="info-value mb-1">Owais Raza</p>

            <p class="info-label">Details</p>
            <p class="info-desc">Lives in Islamabad. Married in 2021.</p>
          </div>
        </div>

        <div class="family-item">
          <div>
            <p class="member-name">Mehak Rehman</p>
            <span class="status-chip single">Not Married</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<style>
/* GLOBAL PREMIUM BG */
.premium-bg {
  background: #f8f9fb;
}

/* HEADERS */
.page-title {
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
}

/* PREMIUM BUTTON */
.btn-premium-dark {
  background: #111827;
  color: white;
  padding: 6px 14px;
  border-radius: 10px;
}

.btn-premium-dark:hover {
  background: #000;
}

/* CARD STYLING */
.premium-card {
  border: 0;
  border-radius: 16px;
  box-shadow: 0px 6px 24px rgba(0,0,0,0.08);
  background: white;
}

.premium-card-header {
  background: transparent;
  border: 0;
  padding: 20px 24px 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

/* PROFILE */
.user-avatar-lg {
  width: 100px;
  height: 100px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 4px 22px rgba(0,0,0,0.15);
}

.user-name {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.user-subtitle {
  color: #6b7280;
  font-size: 15px;
}

/* BADGE / STATUS */
.status-chip {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.status-chip.active {
  background: #16a34a;
  color: white;
}

.status-chip.married {
  background: #dcfce7;
  color: #166534;
}

.status-chip.single {
  background: #fef3c7;
  color: #92400e;
}

/* LABELS */
.info-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748b;
}

.info-value {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.info-desc {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.5;
}

/* INFO BOX */
.info-box {
  background: #f9fafb;
  border-radius: 12px;
  padding: 18px;
  border-left: 4px solid #d1d5db;
}

/* FAMILY SECTION */
.section-title {
  font-weight: 700;
  color: #1e293b;
}

.family-item {
  padding: 14px 0;
}

.family-details-box {
  background: #f9fafb;
  padding: 15px;
  border-radius: 12px;
  border-left: 4px solid #d1d5db;
  margin-top: 12px;
}

.member-name {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.divider {
  margin: 30px 0;
  border-color: #e5e7eb;
}

</style>
