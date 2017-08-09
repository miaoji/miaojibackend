import { request, config } from '../utils'
const { api } = config
const { collect } = api

export async function query (params) {
  return request({
    url: collect,
    method: 'get',
    data: params,
  })
}
