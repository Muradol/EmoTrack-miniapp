import { http } from "@/utils/http";

export const getinfo = () => {
  return http({
    method: 'GET',
    url: '/employeeBasic/info_bytoken',
  })
};

