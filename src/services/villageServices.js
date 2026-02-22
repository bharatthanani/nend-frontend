import api from "./api";

const villageServices = {
  async villageList() {
    try {
    const response = await api.get('/api/get-village')
    return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Village List failed!' }
    }
  },
}

export default villageServices