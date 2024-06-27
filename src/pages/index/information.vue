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
    <view class="user-details">
      <view class="detail-item">
        <view class="label2">用户名</view>
        <view class="value">{{ userInfo.employeeName }}</view>
      </view>
      <view class="detail-item">
        <view class="label2">手机号</view>
        <view class="value">{{ userInfo.employeePhoneNumber }}</view>
      </view>
      <view class="detail-item">
        <view class="label">生日</view>
        <view class="value">{{ userInfo.employeeBirthday }}</view>
      </view>
      <view class="detail-item">
        <view class="label">性别</view>
        <view class="value">{{ userInfo.employeeGender === '1' ? '男' : '女' }}</view>
      </view>
      <view class="detail-item">
        <view class="label">部门</view>
        <view class="value">{{ userInfo.employeeDepartment }}</view>
      </view>
      <view class="detail-item">
        <view class="label">职位</view>
        <view class="value">{{ userInfo.employeeJob }}</view>
      </view>
    </view>
    <button class="edit-button" @click="update">编辑</button>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getinfo } from '@/api/info_bytoken'
import { getdepartment } from '@/api/getdepartment'

export default defineComponent({
  setup() {
    const userInfo = ref({
      employeeName: '',
      employeePhoneNumber: '',
      employeeBirthday: '',
      employeeGender: '',
      employeeJob: '',
      employeeDepartment: '',
      employeeId: '',
      avatar: '',
    })

    onMounted(async () => {
      const response = await getinfo()
      if (response) {
        userInfo.value = {
          employeeName: response.employeeName,
          employeePhoneNumber: response.employeePhoneNumber,
          employeeBirthday: response.employeeBirthday,
          employeeGender: response.employeeGender,
          employeeJob: response.employeeJob,
          employeeDepartment: '',
          employeeId: response.employeeId,
          avatar: response.employeeAvatar,
        }

        const departmentResponse = await getdepartment({
          employeeId: response.employeeId,
        })
        if (departmentResponse) {
          const departmentMap = {
            0: '技术部',
            1: '策划部',
            42: '设计部',
            3: '广告部',
            4: '公关部',
            5: '监督部',
            34: '行政',
            44: '无所属部门',
            41: '宣传部',
            10: '策划部1',
            49: '研发部',
          }
          userInfo.value.employeeDepartment = departmentMap[departmentResponse.employeeDepartmentNo]
        }
      }
    })

    const update = () => {
      uni.navigateTo({
        url: '/pages/index/updateinformation',
      })
    }

    return {
      userInfo,
      update,
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
  margin-bottom: 20px;
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
  font-size: 20px;
  font-weight: bold;
}

.position {
  font-size: 12px;
  color: #000000;
  margin-top: 2px;
  margin-left: 6px;
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

.label {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-right: 150px;
  margin-left: 20px;
}

.label2 {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-right: 133px;
  margin-left: 20px;
}

.value {
  font-size: 16px;
  color: #666;
}

.edit-button {
  width: 80%;
  padding: 3px 0;
  background-color: #4285f4;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
  border-radius: 5px;
  margin-top: 80px;
}
</style>
