import { request, api, pageParams } from '../../utils'
import { yesterTime } from '../../utils/time'

const { businessregist } = api

export async function query(params) {
  params = pageParams(params)
  if (params.brandId) {
    params.brandId = params.brandId.split('///')[0]
  }
  if (!params.startTime) {
    const timeArr = yesterTime(1, 0)
    params.startTime = timeArr.startTime
    params.endTime = timeArr.endTime
  }
  return request({
    url: businessregist.list,
    method: 'post',
    data: params,
  })
}
