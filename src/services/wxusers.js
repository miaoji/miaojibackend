import { request, config, pageParams, } from '../utils'
const { api } = config
const { wxusers } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: wxusers,
    method: 'get',
    fetchType: 'CORS',
    data: params
  })
}
