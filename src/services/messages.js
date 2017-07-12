import { request, config } from '../utils'
const { api } = config
const { messages } = api

export async function query (params) {
  return request({
    url: messages,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: messages,
    method: 'delete',
    data: params,
  })
}
