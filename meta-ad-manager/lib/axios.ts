import axios from "axios"
import { getCookie, deleteCookie } from 'cookies-next'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  validateStatus: (status) => status >= 200 && status < 500 // Accept all responses except 5xx
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Only try to get token from cookies if we're in the browser
    if (typeof window !== "undefined") {
      const token = getCookie('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    console.error("Request interceptor error:", error.message)
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data?.message || 'An error occurred'
      console.error("API Error:", errorMessage)
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Clear token and redirect to signin if we're in the browser
        if (typeof window !== "undefined") {
          deleteCookie('token')
          window.location.href = "/auth/signin"
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error: No response received from server")
      
      // Check if we're in the browser and show a user-friendly message
      if (typeof window !== "undefined") {
        // You can dispatch a notification here if you have a notification system
        console.error("Please check your internet connection and try again")
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message)
    }
    
    // Always reject with a user-friendly error message
    return Promise.reject({
      message: error.response?.data?.message || 
              error.message || 
              "An unexpected error occurred. Please try again."
    })
  }
)

export default api