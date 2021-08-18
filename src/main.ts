import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { setupStore } from '@/store'

// 引入element-plus
import { globalRegister } from '@/global'
import 'assets/css/index.less'
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

// globalRegister(app) === app.use(globalRegister)
app.use(globalRegister)
app.use(router)
app.use(store)
setupStore()
// app.use(ElementPlus)
app.mount('#app')
