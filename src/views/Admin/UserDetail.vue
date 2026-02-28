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

        <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="user-avatar-lg" />

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

<script setup>
 import userService from '@/services/userService';
 import { ref , onMounted} from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const userId = route.params.id;
const userData = ref(null);
const getUserDetail = async () => {
  try{
    const response = await userService.getUserDetail(userId);
    userData.value = response.data;

  }catch(error)
  {
    console.log("Error found", error)
  }finally{

  }
};

onMounted(() => {
  getUserDetail();
})


</script>
<style>
/* PREMIUM BACKGROUND */
.premium-bg {
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
}

/* PAGE TITLE */
.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.5px;
}

/* PREMIUM BUTTON */
.btn-premium-dark {
  background: linear-gradient(135deg, #111827, #374151);
  color: white;
  padding: 8px 18px;
  border-radius: 12px;
  border: none;
  transition: 0.3s ease;
}

.btn-premium-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
}

/* CARD */
.premium-card {
  border: 0;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: 0.3s ease;
}

.premium-card:hover {
  transform: translateY(-3px);
}

/* CARD HEADER */
.premium-card-header {
  font-size: 20px;
  font-weight: 700;
  padding: 25px 25px 10px;
  color: #111827;
}

/* AVATAR */
.user-avatar-lg {
  width: 110px;
  height: 110px;
  border-radius: 20px;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

/* USER TEXT */
.user-name {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
}

.user-subtitle {
  color: #6b7280;
  font-size: 15px;
  margin-bottom: 6px;
}

/* STATUS CHIP */
.status-chip {
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.4px;
}

.status-chip.active {
  background: linear-gradient(135deg, #16a34a, #22c55e);
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
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.info-value {
  font-size: 17px;
  font-weight: 600;
  color: #111827;
}

.info-desc {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
}

/* INFO BOX */
.info-box {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #e5e7eb;
}

/* FAMILY SECTION */
.section-title {
  font-weight: 700;
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 15px;
}

.family-item {
  padding: 16px;
  border-radius: 14px;
  transition: 0.3s;
}

.family-item:hover {
  background: #f9fafb;
}

.family-details-box {
  background: #ffffff;
  padding: 16px;
  border-radius: 14px;
  margin-top: 12px;
  border: 1px solid #e5e7eb;
}

.member-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.divider {
  margin: 35px 0;
  border-color: #e5e7eb;
}

</style>
