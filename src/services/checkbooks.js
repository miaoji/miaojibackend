import { request, config } from '../utils'
const { api } = config
const { checkbooks } = api

export async function query (params) {
  return request({
    url: checkbooks,
    method: 'get',
    data: params,
  })
}
