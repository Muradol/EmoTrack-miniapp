import { http } from "@/utils/http"


export const userLogin = (data: any) => {
  return http({
    method: 'POST',
    url: '/employeeBasic/login',
    data,
  })
};
