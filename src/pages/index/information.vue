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
      <view class="user-details">
        <view class="detail-item">
          <view class="label">用户名</view>
          <view class="value">Muradil</view>
        </view>
        <view class="detail-item">
          <view class="label">+86</view>
          <view class="value">15770081281</view>
        </view>
        <view class="detail-item">
          <view class="label">生日</view>
          <view class="value">2002年7月23日</view>
        </view>
        <view class="detail-item">
          <view class="label">性别</view>
          <view class="value">男</view>
        </view>
        <view class="detail-item">
          <view class="label">部门</view>
          <view class="value">技术部</view>
        </view>
      </view>
      <button class="edit-button" @click="update">编辑</button>
    </view>
  </template>
  

  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      // 编辑按钮点击事件处理函数
      update() {
        uni.navigateTo({
          url: '/pages/index/updateinformation'
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
  margin-bottom: 20px;
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
  
  .user-details {
    width: 90%;
    padding: 10px;
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .detail-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  
  .detail-item:last-child {
    border-bottom: none;
  }
  
  .label {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-right: 150px;
    margin-left: 20px;
  }
  
  .value {
    font-size: 16px;
    color: #666;
  }
  
  .edit-button {
    width: 80%;
    padding: 5px 0;
    background-color: #4285f4;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border: none;
    border-radius: 5px;
    margin-top: 80px;
  }
  </style>
  