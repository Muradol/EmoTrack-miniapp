import { http } from '@/utils/http'

export const updatainfo = (data: any) => {
  return http({
    method: 'POST',
    url: '/employeeBasic/app_update_employee',
    data,
  })
}
