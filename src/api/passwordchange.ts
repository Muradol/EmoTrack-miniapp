import { http } from '@/utils/http'

export const changepassword = (data: any) => {
  return http({
    method: 'PUT',
    url: '/employeeBasic/change_password',
    data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}
