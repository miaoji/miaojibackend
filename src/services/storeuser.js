import { request, config } from '../utils'
const { api } = config
const { storeuser } = api

export async function query (params) {
  return request({
    url: storeuser,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: storeuser.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: storeuser,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: storeuser,
    method: 'patch',
    data: params,
  })
}
