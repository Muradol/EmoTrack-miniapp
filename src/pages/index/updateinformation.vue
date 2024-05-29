<template>
    <view class="container">
      <view class="header">
        <view class="profile">
          <image class="head" src="../../static/my.png" mode="aspectFill"></image>
          <view class="info">
            <view class="name">{{ userInfo.employeeName }}</view>
            <view class="position">{{ userInfo.employeeJob }}</view>
          </view>
        </view>
      </view>
      <view class="input-box">
        <view class="input-wrapper">
          <label class="input-label">用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名" class="input"/>
        </view>
        <view class="input-wrapper">
          <label class="input-label">手机号</label>
          <input type="number" v-model="phone" placeholder="请输入手机号" class="input"/>
        </view>
        <view class="input-wrapper">
          <label class="input-label">生日</label>
          <picker mode="date" :value="birthday" @change="onBirthdayChange" class="input">
            <view class="picker">{{ '请选择生日' }}</view>
          </picker>
        </view>
        <view class="input-wrapper">
          <label class="input-label">性别</label>
          <picker mode="selector" :range="genderOptions" :value="genderIndex" @change="onGenderChange" class="input">
            <view class="picker">{{  '请选择性别' }}</view>
          </picker>
        </view>
        <view class="input-wrapper">
          <label class="input-label">部门</label>
          <picker mode="selector" :range="departmentOptions" :value="departmentIndex" @change="onDepartmentChange" class="input">
            <view class="picker">{{ '请选择部门' }}</view>
          </picker>
        </view>
      </view>
      <button class="button-primary" @click="save">保存</button>
      <button class="button-secondary" @click="cancel">取消</button>
    </view>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref,onMounted } from 'vue';
  import { getinfo } from '@/api/info_bytoken';
  
  export default defineComponent({
    setup() {
      const username = ref('');
      const phone = ref('');
      const birthday = ref('');
      const genderIndex = ref(0);
      const departmentIndex = ref(0);
  
      const genderOptions = ref(['男', '女', '不限']);
      const departmentOptions = ref(['产品部', '研发部', '销售部', '市场部']);

      const userInfo = ref({
      employeeName: '',
      employeeJob: ''
    });

    onMounted(async () => {
        const response = await getinfo();
        if (response) {
          userInfo.value = {
            employeeName: response.employeeName,
            employeeJob: response.employeeJob
          };
        }
    });
  
      const save = () => {
        uni.reLaunch({
          url: '/pages/index/my'
        });
      };
  
      const cancel = () => {
        uni.redirectTo({
          url: '/pages/index/my'
        });
      };
  
      return {
        userInfo,
        username,
        phone,
        birthday,
        genderIndex,
        departmentIndex,
        genderOptions,
        departmentOptions,
        save,
        cancel
      };
    }
  });
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
    margin-bottom: 25px;
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
  font-size: 19px;
  font-weight: bold;
}

.position {
  font-size: 12px;
  color: #000000;
  margin-top: 2px;
  margin-left: 6px;
}
  
  .input {
    width: 95%;
    height: 50px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
  }
  
  .input-wrapper {
    margin-left: 5%;
  }
  
  .picker {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    color: #666;
  }
  
  .button-primary {
    width: 80%;
    padding: 3px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  
  .button-secondary {
    width: 80%;
    padding: 3px;
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  