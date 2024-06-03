<template>
  <view class="container">
    <view class="header">
      <view class="profile" @click="my">
        <image class="head" :src="userInfo.avatar" mode="aspectFill"></image>
        <view class="info">
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
        <view v-for="(report, index) in paginatedReports" :key="index" class="table-row">
          <view class="table-cell serial">{{ (current - 1) * pageSize + index + 1 }}</view>
          <view class="table-cell time">{{ report.recordTime }}</view>
          <view class="table-cell">
            <text class="link" @tap="viewReport(index)">查看报告</text>
          </view>
        </view>
      </view>
      <uni-section title="" padding>
        <uni-pagination
          :total="total"
          :current="current"
          :pageSize="pageSize"
          @change="handlePageChange"
        />
      </uni-section>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getinfo } from '@/api/info_bytoken'
import { getEmoList } from '@/api/emo_list'

export default defineComponent({
  setup() {
    const userInfo = ref({
      employeeName: '',
      employeeJob: '',
      avatar: '',
    })

    onMounted(async () => {
      const response = await getinfo()
      if (response) {
        userInfo.value = {
          employeeName: response.employeeName,
          employeeJob: response.employeeJob,
          avatar: response.employeeAvatar,
        }
      }
    })

    const current = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const paginatedReports = ref([])
    const allReports = ref([]) // 存储所有记录数据

    const todayCount = ref(0)
    const thisWeekCount = ref(0)
    const thisMonthCount = ref(0)

    // 格式化日期字符串为 "yyyy/MM/dd HH:mm:ss"
    const formatDateString = (dateString) => {
      return dateString.replace(/-/g, '/')
    }

    // 获取当前日期的开始和结束时间
    const getTodayRange = () => {
      const today = new Date()
      const start = new Date(today.setHours(0, 0, 0, 0))
      const end = new Date(today.setHours(23, 59, 59, 999))
      return { start, end }
    }

    // 获取本周的开始和结束时间（从周一开始计算）
    const getWeekRange = () => {
      const today = new Date()
      const dayOfWeek = today.getDay() || 7 // 如果是星期天（getDay()返回0），则设置为7
      const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + 1))
      const endOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + 7))
      return {
        start: new Date(startOfWeek.setHours(0, 0, 0, 0)),
        end: new Date(endOfWeek.setHours(23, 59, 59, 999)),
      }
    }

    // 获取本月的开始和结束时间
    const getMonthRange = () => {
      const today = new Date()
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      return {
        start: new Date(startOfMonth.setHours(0, 0, 0, 0)),
        end: new Date(endOfMonth.setHours(23, 59, 59, 999)),
      }
    }

    const filterReportsByDateRange = (reports, { start, end }) => {
      return reports.filter((report) => {
        const reportDate = new Date(formatDateString(report.recordTime))
        return reportDate >= start && reportDate <= end
      })
    }

    const updateStatistics = () => {
      const todayRange = getTodayRange()
      const weekRange = getWeekRange()
      const monthRange = getMonthRange()

      todayCount.value = filterReportsByDateRange(allReports.value, todayRange).length
      thisWeekCount.value = filterReportsByDateRange(allReports.value, weekRange).length
      thisMonthCount.value = filterReportsByDateRange(allReports.value, monthRange).length

      uni.setStorageSync('todayCount', todayCount.value)
      uni.setStorageSync('thisWeekCount', thisWeekCount.value)
      uni.setStorageSync('thisMonthCount', thisMonthCount.value)
    }

    onMounted(async () => {
      const res = await getEmoList({ pageNum: 1, pageSize: 300 })
      allReports.value = res.items
      total.value = res.total

      updateStatistics() // 更新统计
    })

    const viewReport = (index) => {
      const reportData = paginatedReports.value[index].emotionData
      const recordTime = paginatedReports.value[index].recordTime
      const dataToSend = { reportData, recordTime }
      const encodedData = encodeURIComponent(JSON.stringify(dataToSend))

      uni.navigateTo({ url: `/pages/index/report?data=${encodedData}` })
    }

    const handlePageChange = async (e) => {
      current.value = e.current
      const res = await getEmoList({
        pageNum: current.value,
        pageSize: pageSize.value,
      })
      paginatedReports.value = res.items
      total.value = res.total

      // 将当前页的数据添加到总数据中
      allReports.value = [...allReports.value, ...res.items]
      updateStatistics() // 更新统计
    }

    onMounted(async () => {
      const res = await getEmoList({
        pageNum: current.value,
        pageSize: pageSize.value,
      })
      paginatedReports.value = res.items
      total.value = res.total

      // 将第一页的数据添加到总数据中
      allReports.value = [...allReports.value, ...res.items]

      updateStatistics() // 更新统计
    })

    const my = () => {
      uni.navigateTo({ url: '/pages/index/my' })
    }

    return {
      userInfo,
      paginatedReports,
      current,
      pageSize,
      total,
      viewReport,
      my,
      handlePageChange,
      todayCount,
      thisWeekCount,
      thisMonthCount,
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
  margin-bottom: 40px;
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

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
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
