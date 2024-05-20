<template>
    <view class="container">
      <view class="header">
        <view class="profile">
          <image class="head" src="../../static/head.png" mode="aspectFill"></image>
          <view class="info">
            <view class="name">Muradil</view>
            <view class="position">产品经理</view>
          </view>
        </view>
      </view>
      <view class="stats">
        <view class="stat-title">我的检测次数</view>
        <view class="stat-items">
          <view class="stat-item">
            <view class="stat-number">3</view>
            <view class="stat-label">今日</view>
          </view>
          <view class="stat-item">
            <view class="stat-number">20</view>
            <view class="stat-label">本周</view>
          </view>
          <view class="stat-item">
            <view class="stat-number">78</view>
            <view class="stat-label">本月</view>
          </view>
        </view>
      </view>
      <view class="menu">
        <view class="menu-item" @click="information">
         <image src="../../static/info.png" mode="aspectFill"></image>
          <view class="menu-text" >个人信息</view>
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
  
  
  

  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      historicalreport() {
        uni.navigateTo({
          url: '/pages/index/historicalreport'
        });
      },
      information() {
        uni.navigateTo({
          url: '/pages/index/information'
        });
      },
      updatepassword() {
        uni.navigateTo({
          url: '/pages/index/updatepassword'
        });
      },
      logout() {
        uni.navigateTo({
          url: '/pages/index/login'
        });
      }
    }
  };
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
  background-color: #5290FF;
}

.profile {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
}

.head {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid #fff;
}

.info {
  display: flex;
  flex-direction: column;
  color: #fff;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

.position {
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
}

.stats {
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 150px;
  background-color: #fff;
  margin-top: -70px;  /* 移动 stats 位置，使其与蓝色背景重叠 */
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
  padding: 15px 30px;
  border-bottom: 1px solid #eee;
}

image{
  width: 25px;  /* 调整菜单图标的宽度 */
  height: 25px; /* 调整菜单图标的高度 */
  margin-right: 20px;
}

.menu-text {
  font-size: 18px;
}

.logout-button {
  width: 80%;
  padding: 5px 0;
  background-color: #e74c3c;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
  border-radius: 5px;
  margin-top: 100px;
}
  </style>
  