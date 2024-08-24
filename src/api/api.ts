import axios  from 'axios'

const config = {
    baseURL: process.env.API_BASE_URL,
    timeout: 5000
}

const api = axios.create(config)

export { api }