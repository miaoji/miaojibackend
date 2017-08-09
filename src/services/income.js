import { request, config } from '../utils'
const { api } = config
const { income } = api

export async function query (params) {
  return request({
    url: income,
    method: 'get',
    data: params,
  })
}
