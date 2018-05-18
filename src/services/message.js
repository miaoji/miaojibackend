import { request, config, pageParams } from '../utils'
const { api } = config
const { message } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: message,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: message.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: message,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: message,
    method: 'patch',
    data: params,
  })
}
