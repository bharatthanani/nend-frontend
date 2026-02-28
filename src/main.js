import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { hasPermission } from './utils/permission';


import './assets/main.css'



const app = createApp(App)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true
});
app.config.globalProperties.$hasPermission = hasPermission;
app.use(router) 

app.mount('#app')
