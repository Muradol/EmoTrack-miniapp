import { http } from '@/utils/http'

export const getdepartment = (data: any) => {
  return http({
    method: 'GET',
    url: '/employeeJobInfo/empJob_info',
    data,
  })
}
