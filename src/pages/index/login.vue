<template>
  <view class="container">
    <view class="login-box">
      <image class="logo" src="../../static/logo.png" mode="aspectFit"></image>
      <view class="title">欢迎使用 EmoTrack</view>
      <view class="input-box">
        <view class="input-wrapper">
          <label class="input-label">用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名" class="input" />
        </view>
        <view class="input-wrapper">
          <label class="input-label">密码</label>
          <input type="password" v-model="password" placeholder="请输入密码" class="input" />
        </view>
      </view>
      <button class="login-button" @click="login">登录</button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { userLogin } from '@/api/login'
import { useMemberStore } from '@/stores'

export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')

    const login = async () => {
      if (!username.value || !password.value) {
        uni.showToast({
          title: '请输入用户名和密码',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      const res = await userLogin({
        employeePhoneNumber: username.value,
        employeePassword: password.value,
      })
      const memberStore = useMemberStore()
      memberStore.setUser({
        token: res.token,
      })
      uni.setStorageSync('token', res.token)
      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index',
        })
      }, 500)
    }

    return {
      username,
      password,
      login,
    }
  },
})
</script>

<style>
.login-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.logo {
  width: 80px;
  height: 80px;
}

.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 50px;
}

.input {
  width: 95%;
  height: 50px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd; /* 只添加底部边框，可以根据需要调整颜色和宽度 */
  font-size: 18px; /* 可选：调整输入框字体大小 */
}

.input-wrapper {
  margin-left: 5%;
}

.login-button {
  width: 80%;
  padding: 5px;
  background-color: #007bff;
  color: #fff;
  margin-top: 60px;
  font-size: 16px;
}
</style>
