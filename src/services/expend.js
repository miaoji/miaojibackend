import { request, config } from '../utils'
const { api } = config
const { expend } = api

export async function query (params) {
  return request({
    url: expend,
    method: 'get',
    data: params,
  })
}
