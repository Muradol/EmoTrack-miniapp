<template>
  <view class="container">
    <view class="header">
      <view class="profile">
        <image class="head" :src="userInfo.avatar" mode="aspectFill"></image>
        <view class="info">
          <view class="name">{{ userInfo.employeeName }}</view>
          <view class="position">{{ userInfo.employeeJob }}</view>
        </view>
      </view>
    </view>
    <view class="input-box">
      <view class="input-wrapper">
        <label class="input-label">原密码</label>
        <input type="password" v-model="oldPassword" placeholder="请输入原密码" class="input" />
      </view>
      <view class="input-wrapper">
        <label class="input-label">新密码</label>
        <input type="password" v-model="newPassword" placeholder="请输入新密码" class="input" />
      </view>
    </view>
    <button class="save-button" @click="save">保存</button>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { changepassword } from '@/api/passwordchange'
import { getinfo } from '@/api/info_bytoken'
import { useMemberStore } from '@/stores'

export default defineComponent({
  setup() {
    const oldPassword = ref('')
    const newPassword = ref('')
    const userInfo = ref({
      employeeName: '',
      employeeJob: '',
      avatar: '',
    })

    onMounted(async () => {
      const response = await getinfo()
      if (response) {
        userInfo.value = {
          employeeName: response.employeeName,
          employeeJob: response.employeeJob,
          avatar: response.employeeAvatar,
        }
      }
    })

    const save = async () => {
      if (!oldPassword.value || !newPassword.value) {
        uni.showToast({
          title: '请输入所有必填项',
          icon: 'none',
          duration: 2000,
        })
        return
      }

      try {
        // 发送修改密码请求
        const response = await changepassword({
          old_password: oldPassword.value,
          new_password: newPassword.value,
        })
        uni.removeStorageSync('token')
        uni.removeStorageSync('todayCount')
        uni.removeStorageSync('thisWeekCount')
        uni.removeStorageSync('thisMonthCount')
        const memberStore = useMemberStore()
        memberStore.clearUser() // 清除用户信息
        // 根据你的接口封装，20000表示成功
        uni.showToast({
          title: '修改密码成功',
          icon: 'success',
        })

        // 等待一段时间后跳转到个人中心页面
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/login', // 假设index页面路径为/pages/index/my
          })
        }, 1500) // 等待1.5秒以显示修改密码成功的提示
      } catch (error) {
        uni.showToast({
          title: '请求失败，请重试',
          icon: 'none',
        })
        console.error('Error changing password:', error)
      }
    }

    return {
      userInfo,
      oldPassword,
      newPassword,
      save,
    }
  },
})
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  background-color: #fff;
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.profile {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 40px;
}

.head {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.position {
  font-size: 12px;
  color: #000000;
  margin-top: 2px;
  margin-left: 6px;
}

.input {
  width: 90%;
  height: 50px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd; /* 只添加底部边框，可以根据需要调整颜色和宽度 */
  font-size: 18px; /* 可选：调整输入框字体大小 */
}

.input-wrapper {
  margin-left: 10%;
}

.save-button {
  width: 70%;
  padding: 3px 0;
  background-color: #4285f4;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
  border-radius: 5px;
  margin-top: 70px;
}

.cancel-button {
  width: 70%;
  padding: 3px 0;
  background-color: #fff;
  color: #4285f4;
  font-size: 18px;
  text-align: center;
  border: 1px solid #4285f4;
  border-radius: 5px;
  margin-top: 15px;
}
</style>
