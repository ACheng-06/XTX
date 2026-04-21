import axios from "axios";
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores/user'
import router from '@/router/index'

import 'element-plus/theme-chalk/el-message.css'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const getuserStore = userStore()
  const token = getuserStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage({
    type: 'warning',
    message: e.response.data.message,

  })
  const getuserStore = userStore()
  if (e.response.status === 401) {
    getuserStore.clearUserInfo()
    router.replace('/login')
  }
  return Promise.reject(e)
})


export default httpInstance