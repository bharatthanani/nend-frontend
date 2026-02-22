<template>
  <div class="container-fluid py-4">
    <h2 class="page-title">📅 Event Calendar</h2>

    <div class="calendar-wrapper shadow-sm">
      <FullCalendar :options="calendarOptions" />
    </div>

    <!-- Modal for event detail -->
    <div v-if="selectedEvent" class="modal-overlay" @click="selectedEvent = null">
      <div class="modal-card" @click.stop>
        <h4 class="modal-title">{{ selectedEvent.title }}</h4>
        <p class="modal-date">📆 {{ selectedEvent.date }}</p>

        <button class="btn-close" @click="selectedEvent = null">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: { FullCalendar },

  data() {
    return {
      selectedEvent: null,

      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        height: "auto",

        eventClick: (info) => {
          this.selectedEvent = {
            title: info.event.title,
            date: info.event.startStr
          };
        },

        events: [
          { title: 'Wedding - Ahmed & Ayesha', date: '2025-12-12' },
          { title: 'Barat Event', date: '2025-12-12' },
          { title: 'Mehndi Event', date: '2025-12-10' },
          { title: 'Birthday Party', date: '2025-12-18' }
        ]
      }
    }
  }
}
</script>

<style>
/* --------------------------- */
/*       PAGE STYLING          */
/* --------------------------- */
.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #1f2937;
}

.calendar-wrapper {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
}

/* Event hover effect */
.fc-event:hover {
  transform: scale(1.02);
  transition: 0.1s ease-in-out;
}

/* --------------------------- */
/*       MODAL STYLING         */
/* --------------------------- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.25s ease-in-out;
  z-index: 9999;
}

/* Smooth fade animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-card {
  background: white;
  padding: 25px 30px;
  border-radius: 14px;
  width: 380px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  animation: scaleIn 0.25s ease-in-out;
  text-align: center;
}

/* Card animation */
@keyframes scaleIn {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-title {
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 8px;
  color: #111827;
}

.modal-date {
  font-size: 16px;
  color: #374151;
  margin-bottom: 18px;
}

/* Close Button */
.btn-close {
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: 0.2s;
}

.btn-close:hover {
  background: #dc2626;
}
</style>

