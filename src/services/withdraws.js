import { request, config } from '../utils'
const { api } = config
const { withdraws } = api

export async function query (params) {
  return request({
    url: withdraws,
    method: 'get',
    fetchType: 'CORS',
    data: params
  })
}
