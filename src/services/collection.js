import { request, config } from '../utils'
const { api } = config
const { collection } = api

export async function query (params) {
  return request({
    url: collection,
    method: 'get',
    data: params,
  })
}
