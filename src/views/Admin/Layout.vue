<template>
  <div class="dashboard">

    <!-- Sidebar -->
    <aside class="sidebar shadow-sm">
      <div class="logo">
        SYSTEM
      </div>

      <!-- <div class="add-btn">
        <button><i class="bi bi-plus-lg"></i> Add</button>
      </div> -->

      <nav>
        <router-link :to="{ name: 'Dashboard'}" class="nav-link">
          <i class="bi bi-grid-fill"></i>  &nbsp;Dashboard
        </router-link>

        
        <router-link v-if="$hasPermission('/user-list', 'GET')" :to="{ name: 'Users'}" class="nav-link">
          <i class="bi bi-people"></i> &nbsp;Users
        </router-link>

        <router-link :to="{ name:'Calendar' }" class="nav-link">
          <i class="bi bi-calendar-event"></i>  &nbsp;Calendar
        </router-link>

        <details>
          <summary>
            <i class="bi bi-credit-card"></i>  &nbsp;Village/City
          </summary>
          <div class="submenu">
            <router-link v-if="$hasPermission('/get-village', 'GET')" :to="{ name: 'Village'}" class="nav-link">Active</router-link>
            <router-link to="villages?status=inactive" class="nav-link">De-Active</router-link>
          </div>
        </details>

        <details v-if="$hasPermission('/get-events', 'GET')">
          <summary>
            <i class="bi bi-credit-card"></i>  &nbsp;Event
          </summary>
          <div class="submenu">
            <router-link v-if="$hasPermission('/get-events', 'GET')"  :to="{ name:'Event' }" class="nav-link">Active Event</router-link>
          </div>
        </details>

        <details>
          <summary>
            <i class="bi bi-credit-card"></i>  &nbsp;Hall Management
          </summary>
          <div class="submenu">
            <router-link v-if="$hasPermission('/get-hall', 'GET')"  :to="{ name: 'Hall'}" class="nav-link">List</router-link>
            <router-link :to="{ name: 'BookHall' }" class="nav-link">Book Hall</router-link>
          </div>
        </details>

        <details>
          <summary><i class="bi bi-gear"></i>  &nbsp;Settings</summary>
          <div class="submenu">
                 <router-link :to="{ name: 'Profile'}" >My Profile </router-link>
                <a href="#">Preferences</a>
          </div>
        </details>
      </nav>

      <div class="logout">
       <button class="btn btn-outline-danger btn-sm" @click="logout">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
      </div>
    </aside>

    <!-- Main -->
    <main class="main">
      <!-- Topbar -->
      <header class="topbar shadow-sm">
        <div class="dropdown">
          <button
              class="btn d-flex align-items-center"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
            <div class="avatar me-2">{{ userInitials }}</div>
            <span>{{ userFullName }}</span>
            <i class="bi bi-chevron-down ms-2"></i>
          </button>
          <ul
              class="dropdown-menu dropdown-menu-end shadow-sm"
              aria-labelledby="userDropdown"
          >
            <li>
              <router-link to="profile" class="dropdown-item">
                <i class="bi bi-person me-2"></i> Profile
              </router-link>

            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a href="#" class="dropdown-item text-danger">
                <i class="bi bi-box-arrow-right me-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </header>

      <!-- Scrollable Content -->
      <section class="content p-4">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null , // yahan user ka data store hoga
      permissions: [],
    }
  },

  computed: {
    // Full name: first_name + last_name
    userFullName() {
    if (this.user) {
        const full = `${this.user.first_name || ''} ${this.user.last_name || ''}`.trim()
        return full || this.user.email || 'User'
      }
      return 'Guest User'
    },

    userInitials() {
      if (this.user) {
        const first = (this.user.first_name || '').charAt(0).toUpperCase()
        const last = (this.user.last_name || '').charAt(0).toUpperCase()
        return first + last || 'GU'
      }
      return 'GU'
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    // async fetchPermissions() {
    //   const res = await fetch('http://localhost:3000/api/permissions', {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    //   });
    //   const data = await res.json();
    //   if (data.success) {
    //     this.permissions = data.permissions; // [{path, method}, ...]
    //   }
    // },
    // hasPermission(path, method) {
    //   return this.permissions.some(p => p.path === path && p.method === method);
    // }
  
  },

   async created() {
    // Page load hote hi localStorage se user data load kar lo
    //  await this.fetchPermissions();
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      this.user = JSON.parse(savedUser)
    }
  }
}
</script>

<style scoped>
/* -------------------- Overall Layout -------------------- */
.dashboard {
  display: flex;
  height: 100vh;
  font-family: "Inter", Arial, sans-serif;
  overflow: hidden;
  background: #f5f6fa;
}

/* -------------------- Sidebar -------------------- */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-right: 1px solid #e0e0e0;
  transition: all 0.3s;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  border-radius: 0 15px 15px 0;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 25px;
  color: #0d6efd;
}

.add-btn button {
  width: 100%;
  padding: 10px;
  background: #e7f1ff;
  border: none;
  border-radius: 8px;
  color: #0d6efd;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.add-btn button:hover {
  background: #d0e4ff;
}

.sidebar nav {
  flex: 1;
  overflow-y: auto;
}

.sidebar nav a,
.sidebar nav summary {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  color: #444;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar nav a:hover,
.sidebar nav summary:hover {
  background: #f0f4ff;
  color: #0d6efd;
}

.nav-link.router-link-active {
  font-weight: 600;
  color: #0d6efd;
  background: #e7f1ff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.submenu {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

.submenu a {
  font-size: 14px;
  color: #666;
  padding: 4px 0;
}

.submenu a:hover {
  color: #0d6efd;
}

.logout {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.logout a {
  display: flex;
  align-items: center;
  color: #d9534f;
  font-weight: 600;
  text-decoration: none;
}

.logout a:hover {
  color: #c9302c;
}

/* -------------------- Main -------------------- */
.main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* -------------------- Topbar -------------------- */
.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border-radius: 0 15px 0 0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #0d6efd;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

/* Scrollable Content */
.content {
  flex: 1;
  overflow-y: auto;
  background: #f5f6fa;
  padding: 25px;
}

/* Smooth transitions for details */
details summary {
  list-style: none;
  cursor: pointer;
}
details summary::-webkit-details-marker {
  display: none;
}
</style>
