import { request, config, pageParams, } from '../utils'
const { api } = config
const { storeusers } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: storeusers,
    method: 'get',
    fetchType:'CORS',
    data:params
  })
}

export async function remove (params) {
  return request({
    url: storeusers,
    method: 'delete',
    data: params,
  })
}
