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
      <view class="input-box">
        <view class="input-wrapper">
          <label class="input-label">用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名" class="input"/>
        </view>
        <view class="input-wrapper">
          <label class="input-label">密码</label>
          <input type="password" v-model="password" placeholder="请输入密码" class="input"/>
        </view>
        <view class="input-wrapper">
          <label class="input-label">确认密码</label>
          <input type="password" v-model="password" placeholder="请再次输入密码" class="input"/>
        </view>
      </view>
      <button class="save-button" @click="save">保存</button>
      <button class="cancel-button" @click="cancel">取消</button>
    </view>
  </template>
  

  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      // 保存按钮点击事件处理函数
      save() {
      uni.showToast({
        title: '修改密码成功',
        icon: 'success'
      });

      // 跳转到index页面
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/index/my' // 假设index页面路径为/pages/index/index
        });
      }, 1500); // 等待1.5秒以显示登录成功的提示
    },
      // 取消按钮点击事件处理函数
      cancel() {
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


.input {
  width: 90%;
  height: 50px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd; /* 只添加底部边框，可以根据需要调整颜色和宽度 */
  font-size: 18px; /* 可选：调整输入框字体大小 */
  
}

.input-wrapper{
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
