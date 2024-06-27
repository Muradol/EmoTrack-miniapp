<template>
  <view class="container">
    <view class="report">
      <view class="report-header">情绪检测报告</view>
      <view class="user-info">
        <image class="user-avatar" :src="userInfo.avatar" mode="aspectFill"></image>
        <view class="user-details">
          <view class="detail-item">
            <view class="label">姓名</view>
            <view class="value">{{ userInfo.employeeName }}</view>
          </view>
          <view class="detail-item">
            <view class="label">年龄</view>
            <view class="value">{{ userInfo.age }}</view>
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
        <view class="advice-content">{{ getAdvice() }} </view>
      </view>
      <view class="test-date">检测日期：{{ recordTime }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { defineComponent, ref, onMounted } from 'vue'
import { getinfo } from '@/api/info_bytoken'
import { getdepartment } from '@/api/getdepartment'

export default defineComponent({
  setup() {
    const emotions = ref([
      { name: '愤怒', reference: '0~100', test: 0, result: '' },
      { name: '蔑视', reference: '0~100', test: 0, result: '' },
      { name: '厌恶', reference: '0~100', test: 0, result: '' },
      { name: '恐惧', reference: '0~100', test: 0, result: '' },
      { name: '快乐', reference: '0~100', test: 0, result: '' },
      { name: '正常', reference: '0~100', test: 0, result: '' },
      { name: '伤心', reference: '0~100', test: 0, result: '' },
      { name: '惊讶', reference: '0~100', test: 0, result: '' },
    ])

    const userInfo = ref({
      employeeName: '',
      employeePhoneNumber: '',
      employeeBirthday: '',
      employeeGender: '',
      employeeJob: '',
      employeeDepartment: '',
      employeeId: '',
      avatar: '',
      age: '',
    })

    const recordTime = ref('')

    const calculateAge = (birthday) => {
      const birthDate = new Date(birthday)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }

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
          age: calculateAge(response.employeeBirthday),
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

    const getAdvice = () => {
      let advice = ''
      emotions.value.forEach((emotion) => {
        if (emotion.result === '偏高') {
          switch (emotion.name) {
            case '愤怒':
              advice +=
                '对于愤怒情绪的高显现可能表明您可能面临一些挑战或者感到被误解或不公平对待。建议您在面对挑战时保持冷静，尝试采取理性的解决方式，可以通过沟通、寻求支持或者寻找放松的方式来缓解愤怒情绪。'
              break
            case '蔑视':
              advice +=
                '高蔑视情绪可能反映出您对某些事物或者人群持有偏见或者轻视的态度。建议您尝试理解他人的观点和感受，培养包容和尊重的态度，促进更加和谐的人际关系。'
              break
            case '厌恶':
              advice +=
                '厌恶情绪的高显现可能表明您对某些事物或者情境感到强烈的不满或厌恶。建议您尝试分析厌恶的根源，并寻找解决问题的方法，或者采取一些正面的行动来改变令人厌恶的情况。'
              break
            case '恐惧':
              advice +=
                '高恐惧情绪可能表明您对未来或者某些情境感到焦虑或不安。建议您尝试面对恐惧，勇敢地应对挑战，并寻求支持或者专业帮助来处理焦虑情绪。'
              break
            case '快乐':
              advice +=
                '高快乐情绪是一种积极的情绪体验，可以增强个人的幸福感和生活满意度。建议您继续保持积极乐观的心态，享受生活中的美好时刻，并与他人分享快乐。'
              break
            case '正常':
              advice +=
                '高正常情绪可能表明您对生活中的各种情境能够做出适当的反应，保持了一种平衡的心态。建议您继续保持良好的情绪调节能力，灵活应对各种挑战和变化。'
              break
            case '伤心':
              advice +=
                '高伤心情绪可能表明您最近经历了一些不愉快的事情或者遭遇了一些挫折。建议您给自己一些时间来面对和处理伤心情绪，并寻求支持或者参与一些愉快的活动来转移注意力和提升情绪。'
              break
            case '惊讶':
              advice +=
                '高惊讶情绪可能表明您最近遇到了一些令人意外或者突然的事件。建议您尝试从意外中学习和成长，并逐步适应新的情境，以减少不确定性带来的焦虑和压力。'
              break
            default:
              break
          }
        }
      })
      return advice
    }

    onLoad((options) => {
      if (options.data) {
        // 解析传递过来的数据
        const decodedData = decodeURIComponent(options.data)
        const reportData = parseReportData(decodedData)

        const parsedData = JSON.parse(decodedData)
        const { recordTime: receivedRecordTime } = parsedData
        // 提取每个情感的值并放入数组中
        const extractedValues = [
          reportData.anger,
          reportData.contempt,
          reportData.disgust,
          reportData.fear,
          reportData.happy,
          reportData.neutral,
          reportData.sad,
          reportData.surprise,
        ]
        // 更新 emotions 数组中每个情感对象的 test 属性
        emotions.value.forEach((emotion, index) => {
          emotion.test = extractedValues[index]
          if (emotion.test >= 30) {
            emotion.result = '偏高'
          } else if (emotion.test >= 10) {
            emotion.result = '正常'
          } else {
            emotion.result = '偏低'
          }
        })
        recordTime.value = receivedRecordTime
      }
    })

    // 导出解析 reportData 函数
    function parseReportData(dataString) {
      const regex = /([a-zA-Z]+)\s*=\s*([\d.]+)/g
      const reportData = {}
      let match
      while ((match = regex.exec(dataString)) !== null) {
        const key = match[1]
        const value = parseFloat(match[2])
        reportData[key] = value
      }
      return reportData
    }

    return {
      emotions,
      userInfo,
      recordTime,
      getAdvice,
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
