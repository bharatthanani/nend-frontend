import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Layout from '@/views/Admin/Layout.vue'

import Dashboard from '@/views/Admin/Dashboard.vue'
import Paypal from "@/views/Admin/Paypal.vue";
import Users from '@/views/Admin/Users.vue'
import Profile from '@/views/Admin/Profile.vue'
import Village from '@/views/Admin/Village.vue'
import Event from "@/views/Admin/Event.vue";
import EventDetail from "@/views/Admin/EventDetail.vue";
import Calendar from "@/views/Admin/Calendar.vue";
import UserDetail from "@/views/Admin/UserDetail.vue";
import BookHall from "@/views/Admin/BookHall.vue";
import Hall from "@/views/Admin/Hall.vue";
import HallDetail from '@/views/Admin/HallDetail.vue'
import Otp from '@/views/Otp.vue'
import Forbidden from '@/views/Admin/Forbidden.vue';


const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/otp', component: Otp },
    {
    path: '/admin',
    component: Layout,
    children: [
      { path: 'dashboard', name:'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
      { path: 'paypal', component: Paypal, meta: { requiresAuth: true }  },
      { path: 'users', name:'Users', component: Users, meta: { requiresAuth: true }  },
      { path: 'profile', name:'Profile', component: Profile, meta: { requiresAuth: true }  },
      { path: 'village', name:"Village", component: Village,  meta: { requiresAuth: true }  },
      { path: 'event', name:'Event', component: Event, meta: { requiresAuth: true }  },
      { path: 'event-detail/:id', name:'EventDetail', component: EventDetail , meta: { requiresAuth: true } },
      { path: 'calendar', name:'Calendar', component: Calendar, meta: { requiresAuth: true }  },
      { path: 'user-detail/:id', name:'userDetail', component: UserDetail, meta: { requiresAuth: true }  },
      { path: 'book-hall', name:'BookHall', component: BookHall, meta: { requiresAuth: true }  },
      { path: 'hall', name:"Hall", component: Hall, meta: { requiresAuth: true }  },
      { path: 'hall-detail/:id', name:'hallDetail', component: HallDetail, meta: { requiresAuth: true }  },
      { path: 'forbidden', name:"Forbidden", component: Forbidden, meta: { requiresAuth: true }  },
      // You can add more admin routes here
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),   // ✅ correct
  routes
})

// Global Guard - Har route change se pehle check karega
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    alert("Please login first!")
    next('/login')  // ya phir login page pe bhej do
  } else {
    next()  // aage jaane do
  }
})

export default router