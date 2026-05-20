import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://thesimpsonsapi.com/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'fr',
    },
})

export function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        delete api.defaults.headers.common.Authorization
    }
}

export default api