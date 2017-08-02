import { request, config } from '../utils'
const { api } = config
const { expressitems } = api

export async function query (params) {
  return request({
    url: expressitems,
    method: 'get',
    data: params,
  })
}
