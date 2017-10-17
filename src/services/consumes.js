import { request, config } from '../utils'
const { api } = config
const { consume } = api

export async function query (params) {
  return request({
    url: consume.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: consume,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: consume,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: consume,
    method: 'patch',
    data: params,
  })
}
