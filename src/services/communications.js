import { request, config } from '../utils'
const { api } = config
const { communications } = api

export async function query (params) {
  return request({
    url: communications,
    method: 'get',
    data: params,
  })
}
