<template>
    <view class="container">
      <view class="header">
        <view class="profile" @click="my">
          <image class="head" src="../../static/head.png" mode="aspectFill"></image>
          <view class="info" @click="my">
            <view class="name">Muradil</view>
            <view class="position">产品经理</view>
          </view>
        </view>
      </view>
      <view class="main-content">
        <image class="logo" src="../../static/logo.png" mode="aspectFit"></image>
        <view class="title">欢迎使用 EmoTrack</view>
        <button class="button-primary" @tap="showActionSheet">情绪检测</button>
        <button class="button-secondary" @click="historicalreport">历史报告</button>
      </view>
    </view>
  </template>

  <script>
export default {
  data() {
    return {};
  },
  methods: {
    showActionSheet() {
      wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        success: (res) => {
          if (!res.cancel) {
            if (res.tapIndex === 0) {
              // 访问相机
              wx.chooseImage({
                sourceType: ['camera'],
                success: (cameraRes) => {
                  console.log(cameraRes.tempFilePaths);
                  // 在这里处理拍照后的图片
                }
              });
            } else if (res.tapIndex === 1) {
              // 访问相册
              wx.chooseImage({
                sourceType: ['album'],
                success: (albumRes) => {
                  console.log(albumRes.tempFilePaths);
                  // 在这里处理选中的相册图片
                }
              });
            }
          }
        },
        fail(res) {
          console.log(res.errMsg);
        }
      });
    },
    historicalreport() {
        uni.navigateTo({
          url: '/pages/index/historicalreport' 
        });
      },
      my() {
        uni.navigateTo({
          url: '/pages/index/my' 
        });
      }
  }
};

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
  margin-bottom: 90px;
}

.profile {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
}

.head {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 18px;
  font-weight: bold;
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
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.title {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 150px;
}

.button-primary {
  width: 80%;
  padding: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.button-secondary {
  width: 80%;
  padding: 5px;
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  font-size: 16px;
  cursor: pointer;
}

  </style>
  