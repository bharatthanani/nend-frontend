// src/services/userService.js → FINAL VERSION
import api from './api'
import router from '@/router'; 

const userService = {
  async register(userData) {
    try {
    const response = await api.post('/api/create-account', userData)
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Registration failed!' }
    }
  },

  async login(credentials) {
    try {
    const response = await api.post('/api/login', credentials)
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Login failed!' }
    }
  },

  async otpVerifiy(credentials) {
    try {
    const response = await api.post('/api/otp-verify', credentials)
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Otp Verify failed!' }
    }
  },

  async getProfile() {
    try {
        const response = await api.get('/api/profile')
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch profile' }
    }
 },
  async updateProfile(userData) {
      try{
          const response = await api.post('/api/update-profile',userData);
          return response.data
      }catch(error){
          throw error.response?.data || { message: 'Update profile failed!' }
      }
  },
  async getUserList(){
      try{
          const response = await api.get('/api/user-list')
          return response.data
      }catch(error){
        throw error.response?.data || { message: 'Failed to fetch user list data' }
      }
  },

  async getUserDetail(id)
  {
    try{
        const response = await api.get(`/api/get-user-detail/${id}`);
        return response.data;
    }catch(error)
    {
    //  router.push('/admin/forbidden'); 
     throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },

  async addUser(userData) {
    try {
    const response = await api.post('/api/add-user', userData)
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Registration failed!' }
    }
  },

  async updateUser(id, userData)
  {
    try {
    const response = await api.post(`/api/update-user/${id}`, userData)
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Update failed!' }
    }
  },
  async addHall(hallData)
  {
    try{
      const response = await api.post('/api/add-hall',hallData);
      return response.data;
    }catch(error)
    {
      throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },

  async getHalls()
  {
    try{
      const response = await api.get('/api/get-hall');
      return response.data;
    }catch(error)
    {
      throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },
  async addEvents(eventData)
  {
    try{
      const response = await api.post('/api/add-event',eventData)
      return response;
    }catch(error){
      throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },
  async getEvents(){
    try{
      const response = await api.get('/api/get-events');
      return response.data;
    }catch(error)
    {
      router.push('/admin/forbidden'); 
     throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },
  async getEventDetail(id)
  {
    try{
        const response = await api.get(`/api/get-event-detail/${id}`);
        return response.data;
    }catch(error)
    {
     router.push('/admin/forbidden'); 
     throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },
  async getGrooms()
  {
    try{
      const response = await api.get('/api/get-grooms');
      return response.data;
    }catch(error)
    {
      throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },
  async getBrides()
  {
    try{
      const response = await api.get('/api/get-brides');
      return response.data;
    }catch(error)
    {
      throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },
  async getFather(id)
  {
    try{
      const response = await api.get(`/api/get-father/${id}`);
      return response.data;
    }catch(error)
    {
      throw error.response?.data || { message: 'Something went wrong please try again' }
    }
  },

}

export default userService