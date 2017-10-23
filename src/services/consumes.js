import { request, config, pageParams, } from '../utils'
const { api } = config
const { consume } = api

export async function query (params) {
  params = pageParams(params)
  params = {param:JSON.stringify(params)}

  console.log('params',params)
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
