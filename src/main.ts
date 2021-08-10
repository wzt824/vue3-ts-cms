import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './api/axios_demo'
import ZTRequest from './api'

// 引入element-plus
import { globalRegister } from './global'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

// globalRegister(app) === app.use(globalRegister)
app.use(globalRegister)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// ZTRequest.request<DataType>({
//   url: '/home/multidata',
//   method: 'GET'
// }).then((res) => {
//   console.log(res.data)
//   console.log(res.returnCode)
//   console.log(res.success)
// })

ZTRequest.get<DataType>({
  url: '/home/multidata'
}).then((res) => {
  console.log(res.data)
  console.log(res.returnCode)
  console.log(res.success)
})

// setTimeout(() => {
//   ZTRequest.request({
//     url: '/home/multidata',
//     method: 'GET'
//   })
// }, 8000)

// ZTRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单个特体验的拦截')
//       return config
//     }
//   }
// })
