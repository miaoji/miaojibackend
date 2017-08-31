import { request, config, pageParams, } from '../utils'
const { api } = config
const { withdraws } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: withdraws,
    method: 'get',
    fetchType: 'CORS',
    data: params
  })
}
