import { http } from '@/utils/http'

export const getEmoList = (data: any) => {
  return http({
    method: 'GET',
    url: '/emotion/emo_list',
    data,
  })
}
