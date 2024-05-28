import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useMemberStore = defineStore(
  'member',
  () => {
    //用户信息
    const user =ref()

    //保存用户信息
    const setUser = (val: any) => {
      user.value = val;
    };
    

    //清理用户信息，退出时使用
    const clearUser=()=>{
      user.value=undefined
    }

    //记得return
    return { user,setUser,clearUser }
  },
  {
    // 配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
