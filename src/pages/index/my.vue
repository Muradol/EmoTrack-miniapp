<template>
  <view class="container">
    <view class="header">
      <view class="profile">
        <image class="head" :src="userInfo.avatar" mode="aspectFill" @click="upavatar"></image>
        <view class="info">
          <view class="name">{{ userInfo.employeeName }}</view>
          <view class="position">{{ userInfo.employeeJob }}</view>
        </view>
      </view>
    </view>
    <view class="stats">
      <view class="stat-title">我的检测次数</view>
      <view class="stat-items">
        <view class="stat-item">
          <view class="stat-number">{{ todayCount }}</view>
          <view class="stat-label">今日</view>
        </view>
        <view class="stat-item">
          <view class="stat-number">{{ thisWeekCount }}</view>
          <view class="stat-label">本周</view>
        </view>
        <view class="stat-item">
          <view class="stat-number">{{ thisMonthCount }}</view>
          <view class="stat-label">本月</view>
        </view>
      </view>
    </view>
    <view class="menu">
      <view class="menu-item" @click="information">
        <image src="../../static/info.png" mode="aspectFill"></image>
        <view class="menu-text">个人信息</view>
      </view>
      <view class="menu-item" @click="historicalreport">
        <image src="../../static/history.png" mode="aspectFill"></image>
        <view class="menu-text">历史报告</view>
      </view>
      <view class="menu-item" @click="updatepassword">
        <image src="../../static/password.png" mode="aspectFill"></image>
        <view class="menu-text">修改密码</view>
      </view>
    </view>
    <button class="logout-button" @click="logout">退出登录</button>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getinfo } from '@/api/info_bytoken'
import { useMemberStore } from '@/stores'

export default defineComponent({
  setup() {
    const userInfo = ref({
      employeeName: '',
      employeeJob: '',
      avatar: '',
    })

    const todayCount = ref()
    const thisWeekCount = ref(0)
    const thisMonthCount = ref(0)

    onMounted(async () => {
      const response = await getinfo()
      if (response) {
        userInfo.value = {
          employeeName: response.employeeName,
          employeeJob: response.employeeJob,
          avatar: response.employeeAvatar,
        }
      }

      // 从本地存储中获取数据，并提供默认值
      todayCount.value = uni.getStorageSync('todayCount') || 0
      thisWeekCount.value = uni.getStorageSync('thisWeekCount') || 0
      thisMonthCount.value = uni.getStorageSync('thisMonthCount') || 0
    })

    const historicalreport = () => {
      uni.navigateTo({
        url: '/pages/index/historicalreport',
      })
    }

    const information = () => {
      uni.navigateTo({
        url: '/pages/index/information',
      })
    }

    const updatepassword = () => {
      uni.navigateTo({
        url: '/pages/index/updatepassword',
      })
    }

    const upavatar = () => {
      wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        success: async (res) => {
          if (!res.cancel) {
            let sourceType = []
            if (res.tapIndex === 0) {
              sourceType = ['camera']
            } else if (res.tapIndex === 1) {
              sourceType = ['album']
            }
            uni.chooseImage({
              count: 1,
              sourceType: sourceType,
              success: (chooseImageRes) => {
                const tempFilePaths = chooseImageRes.tempFilePaths
                const file = tempFilePaths[0]
                const memberStore = useMemberStore()

                // 显示加载框
                uni.showLoading({
                  title: '上传中...',
                })

                uni.uploadFile({
                  url: 'http://47.120.44.17:8080/employeeBasic/upload_Avatar',
                  filePath: file,
                  name: 'file',
                  header: {
                    Authorization: memberStore.user?.token,
                    'content-type': 'multipart/form-data',
                  },
                  success: (res) => {
                    // 隐藏加载框
                    uni.hideLoading()
                    console.log(res)

                    // 解析返回数据
                    const data = JSON.parse(res.data)

                    if (data.code === 20000) {
                      // 显示成功提示框
                      uni.showToast({
                        title: '上传成功',
                        icon: 'success',
                      })
                    }
                  },
                })
              },
            })
          }
        },
      })
    }

    const logout = () => {
      uni.removeStorageSync('token')
      uni.removeStorageSync('todayCount')
      uni.removeStorageSync('thisWeekCount')
      uni.removeStorageSync('thisMonthCount')
      const memberStore = useMemberStore()
      memberStore.clearUser() // 清除用户信息
      uni.showToast({
        title: '退出登录成功',
        icon: 'success',
      })
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/login',
        })
      }, 500)
    }

    return {
      userInfo,
      historicalreport,
      information,
      updatepassword,
      logout,
      upavatar,
      todayCount,
      thisWeekCount,
      thisMonthCount,
    }
  },
})
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  height: 100vh;
}

.header {
  width: 100%;
  height: 25%;
  background-color: #5290ff;
}

.profile {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
}

.head {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #fff;
}

.info {
  display: flex;
  flex-direction: column;
  color: #fff;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.position {
  font-size: 12px;
  color: #fff;
  margin-top: 2px;
  margin-left: 6px;
}

.stats {
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 150px;
  background-color: #fff;
  margin-top: -70px; /* 移动 stats 位置，使其与蓝色背景重叠 */
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 20px;
}

.stat-title {
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 25px;
}

.stat-items {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
}

.stat-label {
  font-size: 16px;
  color: #666;
}

.menu {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 30px;
  border-bottom: 1px solid #eee;
}

image {
  width: 25px; /* 调整菜单图标的宽度 */
  height: 25px; /* 调整菜单图标的高度 */
  margin-right: 20px;
}

.menu-text {
  font-size: 18px;
}

.logout-button {
  width: 80%;
  padding: 3px 0;
  background-color: #e74c3c;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
  border-radius: 5px;
  margin-top: 100px;
}
</style>
