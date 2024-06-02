<template>
  <view class="container">
    <view class="header">
      <view class="profile" @click="handleProfileClick">
        <image
          class="head"
          :src="userInfo.avatar || '../../static/my.png'"
          mode="aspectFill"
        ></image>
        <view class="info">
          <view class="name">{{ userInfo.employeeName || '请登录' }}</view>
        </view>
      </view>
    </view>
    <view class="main-content">
      <image
        class="logo"
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGczM2tkb3ByM3o0cWhvb25teHhncTdrY3Zpb29ieXA2cmxycXF4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jRTlHjXwkw43WRgCnW/giphy.gif"
        mode="aspectFit"
      ></image>
      <view class="title">欢迎使用 EmoTrack</view>
      <button class="button-primary" @tap="showActionSheet">情绪检测</button>
      <button class="button-secondary" @click="historicalreport">历史报告</button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getinfo } from '@/api/info_bytoken'
import { useMemberStore } from '@/stores'

export default defineComponent({
  setup() {
    const userInfo = ref<{
      employeeName: string | null
      avatar: string | null
    }>({
      employeeName: null,
      avatar: null,
    })

    onMounted(async () => {
      const response = await getinfo()
      if (response && response.employeeName) {
        userInfo.value.employeeName = response.employeeName
        userInfo.value.avatar = response.employeeAvatar
      }
    })

    const showActionSheet = () => {
      const token = uni.getStorageSync('token')
      if (token) {
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
                    url: 'http://47.120.44.17:8080/emotion/detect',
                    filePath: file,
                    name: 'image',
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
                        uni.showModal({
                          title: '上传图片成功',
                          showCancel: true,
                          cancelText: '再次上传',
                          confirmText: '查看报告',
                          success: (modalRes) => {
                            if (modalRes.confirm) {
                              // 处理查看报告的逻辑
                              console.log('用户选择查看报告')
                              uni.navigateTo({
                                url: '/pages/index/historicalreport',
                              })
                            } else if (modalRes.cancel) {
                              // 处理再次上传的逻辑
                              console.log('用户选择再次上传')
                            }
                          },
                        })
                      } else {
                        // 显示失败提示框
                        uni.showModal({
                          title: '上传图片失败',
                          content: '请确保上传的照片清晰并且是本人',
                          showCancel: false,
                          confirmText: '重新上传',
                          success: (modalRes) => {
                            if (modalRes.confirm) {
                              // 处理重新上传的逻辑
                              console.log('用户选择重新上传')
                            }
                          },
                        })
                      }
                    },
                  })
                },
              })
            }
          },
        })
      } else {
        uni.navigateTo({
          url: '/pages/index/login',
        })
        return
      }
    }

    const historicalreport = () => {
      const token = uni.getStorageSync('token')
      if (!token) {
        uni.navigateTo({
          url: '/pages/index/login',
        })
        return
      }
      uni.navigateTo({
        url: '/pages/index/historicalreport',
      })
    }

    const handleProfileClick = () => {
      if (userInfo.value.employeeName) {
        uni.navigateTo({
          url: '/pages/index/my',
        })
      } else {
        uni.reLaunch({
          url: '/pages/index/login',
        })
      }
    }

    return {
      userInfo,
      showActionSheet,
      historicalreport,
      handleProfileClick,
    }
  },
})
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #fff;
}

.header {
  width: 100%;
  margin-bottom: 5px;
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
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 18px;
  text-decoration: underline;
}

.position {
  font-size: 12px;
  color: #666;
  margin-left: 10px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 400px;
  height: 300px;
}

.title {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 70px;
  margin-top: 20px;
}

.button-primary {
  width: 250px;
  padding: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.button-secondary {
  width: 250px;
  padding: 5px;
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  font-size: 16px;
  cursor: pointer;
}
</style>
