import { createSSRApp } from 'vue'
import App from './App.vue'


//导入pinia实例
import pinia from '@/stores'

export function createApp() {
  const app = createSSRApp(App)

  // 使用pinia
  app.use(pinia)
  
  return {
    app,
  }
}
