<template>
  <div class="container py-5">

    <!-- Header -->
    <div class="text-center mb-5">
      <h1 class="fw-bold display-6">Book Your Hall</h1>
      <p class="text-muted">Choose the perfect plan for your event</p>
    </div>

    <!-- Plans -->
    <div class="row g-4">

      <div class="col-md-4" v-for="p in packages" :key="p.id">
        <div class="plan-card shadow-sm p-4">

          <!-- Plan Name -->
          <h3 class="fw-bold text-center mb-2">{{ p.name }}</h3>

          <!-- Price -->
          <div class="text-center mb-3">
            <span class="plan-price">${{ p.price }}</span>
            <span class="text-muted small">/ event</span>
          </div>

          <!-- Description -->
          <p class="text-muted text-center mb-3">{{ p.short }}</p>

          <!-- Features -->
          <ul class="list-unstyled mt-4">
            <li v-for="f in p.features" :key="f" class="d-flex align-items-start mb-2">
              <span class="check-icon me-2">✔</span>
              <span>{{ f }}</span>
            </li>
          </ul>

          <!-- Button -->
          <button class="btn btn-dark w-100 mt-4 rounded-pill py-2"
                  data-bs-toggle="modal"
                  data-bs-target="#bookingModal"
                  @click="selectedPackage = p">
            Select Plan
          </button>

        </div>
      </div>

    </div>

    <!-- Modal -->
    <!-- Modal -->
    <div class="modal fade" id="bookingModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0">

          <div class="modal-header border-0">
            <h5 class="fw-bold">Book: {{ selectedPackage?.name }}</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body px-4">

            <!-- User Select -->
            <label class="fw-semibold mb-1">Select User</label>
            <select class="form-select rounded-3 mb-3">
              <option value="">Select User</option>
              <option>Ali</option>
              <option>Hamza</option>
            </select>

            <!-- Hall Select -->
            <label class="fw-semibold mb-1">Select Hall</label>
            <select class="form-select rounded-3 mb-3">
              <option value="">Select Hall</option>
              <option>Royal Palace Hall</option>
              <option>City Grand Hall</option>
            </select>

            <!-- Payment Tabs -->
            <div class="payment-tabs my-3">
              <button
                  class="tab-btn"
                  :class="{ active: activeTab === 'stripe' }"
                  @click="activeTab='stripe'"
              >
                💳 Stripe
              </button>

              <button
                  class="tab-btn"
                  :class="{ active: activeTab === 'paypal' }"
                  @click="activeTab='paypal'"
              >
                🅿 PayPal
              </button>
            </div>

            <!-- Stripe Box -->
            <div v-if="activeTab === 'stripe'" class="payment-box">
              <h6 class="fw-bold mb-1">Stripe Payment</h6>
              <p class="text-muted small">
                Stripe card fields will appear here…
              </p>
            </div>

            <!-- PayPal Box -->
            <div v-if="activeTab === 'paypal'" class="payment-box">
              <h6 class="fw-bold mb-1">PayPal Checkout</h6>
              <p class="text-muted small">
                PayPal payment button will load here…
              </p>
            </div>

          </div>

          <div class="modal-footer border-0">
            <button class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-dark rounded-pill px-4">Continue</button>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPackage: null,
      activeTab: 'stripe',
      packages: [
        {
          id: 1,
          name: "Basic Plan",
          price: 100,
          short: "Ideal for small and simple functions.",
          features: [
            "Basic hall booking",
            "Up to 150 guests",
            "Standard decorations",
            "Basic sound system",
            "Standard seating arrangement"
          ]
        },
        {
          id: 2,
          name: "Advance Plan",
          price: 200,
          short: "Perfect for medium-sized events.",
          features: [
            "Hall booking + decoration",
            "Up to 300 guests",
            "Premium lighting setup",
            "Photography (Basic)",
            "Sound system upgrade",
            "VIP seating section"
          ]
        },
        {
          id: 3,
          name: "Premium Plan",
          price: 300,
          short: "Luxury experience for grand events.",
          features: [
            "Full luxury hall decoration",
            "Up to 500 guests",
            "HD Photography + Video",
            "Custom themed decoration",
            "Professional sound & lighting",
            "Full VIP area",
            "Event manager included"
          ]
        }
      ]
    };
  }
};
</script>

<style>
body {
  background: #f7f8fc;
}

.plan-card {
  background: #fff;
  border-radius: 20px;
  padding: 30px 25px;
  border: 1px solid #eee;
  width: 360px;              /* FIXED PREMIUM WIDTH */
  min-height: 500px;         /* PREMIUM HEIGHT */
  margin: 0 auto;
  transition: 0.3s;
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 32px rgba(0,0,0,0.10);
}

.plan-price {
  font-size: 34px;
  font-weight: bold;
}

.check-icon {
  color: #0d6efd;
  font-weight: bold;
}

.payment-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #d0d3d8;
  background: #f1f3f7;
  font-weight: 600;
  transition: 0.2s;
}

.tab-btn.active {
  background: #0d6efd;
  color: white;
  border-color: #0d6efd;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.payment-box {
  border: 2px dashed #d5d8de;
  padding: 15px;
  border-radius: 12px;
  background: #fafbff;
}

</style>
