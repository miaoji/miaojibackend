import { request, api, pageParams } from '../utils'

const { businessoperation } = api

export async function query(params) {
  params = pageParams(params)
  if (params.brandId) {
    params.brandId = params.brandId.split('///')[0]
  }
  return request({
    url: businessoperation.list,
    method: 'post',
    data: params,
  })
}
