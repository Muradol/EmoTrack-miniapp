import { useMemberStore } from '@/stores'

const baseURL = 'http://47.120.44.17:8080'
// const baseURL='http://localhost:8080';

//添加拦截器
const httpInterceptor = {
  //拦截前处罚
  invoke(options: UniApp.RequestOptions) {
    //1.非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //2.请求超时，默认60s
    options.timeout = 60000
    //3.添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //4.添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.user?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  data: T
}

//添加类型，支持泛型(
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1.返回promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //请求成功
      success(res) {
        const data = res.data as { code: number; message: string; data: any }
        if (data.code !== 20000) {
          uni.showToast({
            title: data.message,
            icon: 'none',
          })
        } else {
          resolve(data.data)
        }
      },
      //请求失败
      fail(err) {
        uni.showToast({
          title: '网络错误,请检查网络',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
