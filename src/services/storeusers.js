import { request, config } from '../utils'
const { api } = config
const { storeusers } = api

export async function query (params) {
  return request({
    url: storeusers,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: storeusers,
    method: 'delete',
    data: params,
  })
}
