import { request, config } from '../utils'
const { api } = config
const { topups } = api

export async function query (params) {
  return request({
    url: topups,
    method: 'get',
    data: params,
  })
}
