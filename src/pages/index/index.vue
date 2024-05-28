<template>
  <view class="container">
    <view class="header">
      <view class="profile" @click="handleProfileClick">
        <image class="head" src="../../static/my.png" mode="aspectFill"></image>
        <view class="info">
          <view class="name">{{ username || '请登录' }}</view>
        </view>
      </view>
    </view>
    <view class="main-content">
      <image class="logo" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGczM2tkb3ByM3o0cWhvb25teHhncTdrY3Zpb29ieXA2cmxycXF4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jRTlHjXwkw43WRgCnW/giphy.gif" mode="aspectFit"></image>
      <view class="title">欢迎使用 EmoTrack</view>
      <button class="button-primary" @tap="showActionSheet">情绪检测</button>
      <button class="button-secondary" @click="historicalreport">历史报告</button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const username = ref('');

    onMounted(() => {
      try {
        const storedUsername = uni.getStorageSync('username');
        if (storedUsername) {
          username.value = storedUsername;
        }
      } catch (error) {
        console.error('Error accessing local storage:', error);
      }
    });

    const showActionSheet = () => {
      try {
        wx.showActionSheet({
          itemList: ['拍照', '从手机相册选择'],
          success: (res) => {
            if (!res.cancel) {
              if (res.tapIndex === 0) {
                wx.chooseImage({
                  sourceType: ['camera'],
                  success: (cameraRes) => {
                    console.log(cameraRes.tempFilePaths);
                  }
                });
              } else if (res.tapIndex === 1) {
                wx.chooseImage({
                  sourceType: ['album'],
                  success: (albumRes) => {
                    console.log(albumRes.tempFilePaths);
                  }
                });
              }
            }
          },
          fail(res) {
            console.log(res.errMsg);
          }
        });
      } catch (error) {
        console.error('Error showing action sheet:', error);
      }
    };

    const historicalreport = () => {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.navigateTo({
            url: '/pages/index/login'
          });
          return;
        }
        uni.navigateTo({
          url: '/pages/index/historicalreport'
        });
      } catch (error) {
        console.error('Error accessing local storage:', error);
      }
    };

    const handleProfileClick = () => {
      if (username.value) {
        uni.navigateTo({
          url: '/pages/index/my'
        });
      } else {
        uni.reLaunch({
          url: '/pages/index/login'
        });
      }
    };

    return {
      username,
      showActionSheet,
      historicalreport,
      handleProfileClick
    };
  }
});
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
  