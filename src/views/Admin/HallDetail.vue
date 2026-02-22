<template>
  <div class="container py-5">
    <!-- Premium Hall Card -->
    <div class="card shadow-lg rounded-4 overflow-hidden border-0">
      
      <!-- Hall Image -->
      <img
        src="https://img.freepik.com/free-vector/vector-hall-banquet-wedding-interior-ballroom-with-tables-chairs-feast-celebration_1441-2354.jpg?semt=ais_hybrid&w=740&q=80"
        class="card-img-top"
        alt="Hall Image"
        style="height: 450px; object-fit: cover;"
      />

      <!-- Hall Details -->
      <div class="card-body p-4 p-md-5">
        <h1 class="card-title mb-3 display-6">Grand Royal Banquet Hall</h1>
        <p class="text-muted mb-4">
          A luxurious hall perfect for weddings, corporate events, and private parties. Fully equipped with modern amenities and elegant decor for an unforgettable experience.
        </p>

        <!-- Info Row -->
        <div class="row mb-4 text-dark">
          <div class="col-md-6 mb-3">
            <p class="mb-1"><strong>Location:</strong> Downtown City Center</p>
            <p class="mb-1"><strong>Capacity:</strong> 500 Guests</p>
            <p class="mb-1"><strong>Availability:</strong> Mon - Sun</p>
          </div>
          <div class="col-md-6 mb-3">
            <p class="mb-1"><strong>Price:</strong> $5,000/day</p>
            <p class="mb-1"><strong>Contact:</strong> +123 456 7890</p>
            <p class="mb-1"><strong>Hall Type:</strong> Banquet / Event</p>
          </div>
        </div>

        <!-- Description -->
        <p class="text-muted mb-4">
          This hall offers a spacious main area with premium lighting, elegant furniture, and high-quality audio/visual systems. Perfect for hosting large gatherings with style and comfort.
        </p>

        <!-- Action Buttons -->
        <div class="d-flex gap-3 flex-wrap">
          <a href="#" class="btn btn-primary btn-lg">Book Now</a>
          <a href="#" class="btn btn-outline-secondary btn-lg">Back to Halls</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
.card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
}
.btn-primary {
  border-radius: 50px;
  font-weight: 600;
  transition: transform 0.3s;
}
.btn-primary:hover {
  transform: scale(1.05);
}
.btn-outline-secondary {
  border-radius: 50px;
  font-weight: 500;
}
.card-body h1 {
  font-weight: 700;
}
.text-muted {
  color: #6c757d !important;
}
</style>
