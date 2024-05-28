<template>
    <view class="container">
      <view class="report">
        <view class="report-header">情绪检测报告</view>
        <view class="user-info">
          <image class="user-avatar" src="../../static/my.png" mode="aspectFill"></image>
          <view class="user-details">
            <view class="detail-item"><view class="label">姓名</view><view class="value">Muradil</view></view>
            <view class="detail-item"><view class="label">年龄</view><view class="value">22</view></view>
            <view class="detail-item"><view class="label">性别</view><view class="value">男</view></view>
            <view class="detail-item"><view class="label">部门</view><view class="value">技术部</view></view>
            <view class="detail-item"><view class="label">职位</view><view class="value">产品经理</view></view>
          </view>
        </view>
        <view class="emotion-table">
          <view class="table-row table-header">
            <view class="table-cell">情绪</view>
            <view class="table-cell">参考</view>
            <view class="table-cell">测试</view>
            <view class="table-cell">结果</view>
          </view>
          <view class="table-row" v-for="(emotion, index) in emotions" :key="index">
            <view class="table-cell">{{ emotion.name }}</view>
            <view class="table-cell">{{ emotion.reference }}</view>
            <view class="table-cell">{{ emotion.test }}</view>
            <view class="table-cell">{{ emotion.result }}</view>
          </view>
        </view>
        <view class="advice">
          <view class="advice-title">意见：</view>
          <view class="advice-content">
            在本次检测中，明显感受到您展现出了极高的幸福感和积极性。这种情绪状态不仅对个人的心理健康有着显著的正面影响，同时也能在其社交圈中传递正能量，增强人际关系的和谐与亲密度。建议您继续保持这种乐观的生活态度，祝你好运！
          </view>
        </view>
        <view class="test-date">检测日期：2024-4-22 20:12:00</view>
      </view>
    </view>
  </template>
  

  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      const emotions = ref([
        { name: '开心', reference: '20~50', test: 60, result: '偏高' },
        { name: '正常', reference: '15~50', test: 30, result: '正常' },
        { name: '伤心', reference: '30~40', test: 0, result: '偏低' },
        { name: '惊喜', reference: '10~50', test: 55, result: '偏高' },
        { name: '快乐', reference: '25~50', test: 60, result: '偏高' },
        { name: '厌恶', reference: '40~70', test: 0, result: '偏低' },
        { name: '愤怒', reference: '30~40', test: 0, result: '偏低' },
        { name: '蔑视', reference: '40~50', test: 0, result: '偏低' }
      ]);
  
      return {
        emotions
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

.report {
  width: 90%;
  margin-top: 20px;
}

.report-header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  width: 110px;
  height: 145px;
  margin-right: 20px;
}

.user-details {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin-left: 30px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.label {
  width: 60px;
  font-weight: bold;
}

.value {
  margin-left: 40px;
}

.emotion-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table-row {
  display: flex;
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

.advice {
  margin-bottom: 20px;
}

.advice-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.advice-content {
  font-size: 14px;
}

.test-date {
  text-align: right;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

  </style>
  