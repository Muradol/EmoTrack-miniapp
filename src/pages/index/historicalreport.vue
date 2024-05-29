<template>
    <view class="container">
      <view class="header">
        <view class="profile" @click="my">
          <image class="head" src="../../static/my.png" mode="aspectFill"></image>
          <view class="info" @click="my">
            <view class="name">{{ userInfo.employeeName }}</view>
            <view class="position">{{ userInfo.employeeJob }}</view>
          </view>
        </view>
      </view>
      <view class="main-content">
        <view class="table">
          <view class="table-header">
            <view class="table-cell serial">序号</view>
            <view class="table-cell time">检测时间</view>
            <view class="table-cell">操作</view>
          </view>
          <view v-for="(report, index) in reports" :key="index" class="table-row">
            <view class="table-cell serial">{{ index + 1 }}</view>
            <view class="table-cell time">{{ report.time }}</view>
            <view class="table-cell"><text class="link" @tap="viewReport(index)">查看报告</text></view>
          </view>
        </view>
      </view>
    </view>
  </template>
  

  

  <script lang="ts">
  import { defineComponent, ref,onMounted } from 'vue';
  import { getinfo } from '@/api/info_bytoken';
  
  export default defineComponent({
    setup() {
      const reports = ref([
        { time: '2024-4-22 20:12:00' },
        { time: '2024-4-22 19:12:00' },
        // { time: '2024-4-22 18:12:00' },
        // { time: '2024-4-22 17:12:00' },
        // { time: '2024-4-22 16:12:00' },
        // { time: '2024-4-22 15:12:00' },
        // { time: '2024-4-22 14:12:00' },
        // { time: '2024-4-22 13:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' },
        // { time: '2024-4-22 12:12:00' }
      ]);

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
  
      const viewReport = (index) => {
        // 跳转到 report 页面，并传递参数
        uni.navigateTo({
          url: `/pages/index/report?index=${index}`
        });
      };
  
      const my = () => {
        uni.navigateTo({
          url: '/pages/index/my'
        });
      };
  
      return {
        userInfo,
        reports,
        viewReport,
        my
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
  font-size: 19px;
  font-weight: bold;
}

.position {
  font-size: 12px;
  color: #000000;
  margin-top: 2px;
  margin-left: 6px;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-header,
.table-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border: 1px solid #ccc;
}

.table-cell {
  flex: 1;
  text-align: center;
  padding: 10px;
}

.table-header {
  background-color: #f8f8f8;
  font-weight: bold;
}

.table-row:nth-child(even) {
  background-color: #f2f2f2;
}

.link {
  color: #007bff;
  cursor: pointer;
}

/* 设置“序号”列的宽度 */
.serial {
  flex: none;
  width: 50px;
}

/* 设置“检测时间”列的宽度 */
.time {
  flex: none;
  width: 170px;
}
  </style>
  