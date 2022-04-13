import axios from 'axios'
import config from './config'
const axiosInstance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true
})
const TIME_CHECK = 3480000

axiosInstance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  let status = error.response.status
  console.log(error)
  return Promise.reject(error)
})
export default axiosInstance
