import axios from 'axios'

const apiConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
}

const api = axios.create(apiConfig)

export { api }