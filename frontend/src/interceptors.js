import { StatusCodes } from 'http-status-codes'
import { TokenStorage } from './token-storage'
const axios = require('axios')
const axiosApiInstance = axios.create()

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${TokenStorage.getAccessToken()}`
    config.headers['Accept'] = 'application/json'
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== StatusCodes.UNAUTHORIZED) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }

    const token = await TokenStorage.getNewToken()

    if (!token) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
    const config = error.config
    config.headers['Authorization'] = `Bearer ${token}`

    // Try request again with new token
    return new Promise((resolve, reject) => {
      axios
        .request(config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
)

export default axiosApiInstance