import { request, config, pageParams, } from '../utils'
const { api } = config
const { consume } = api

export async function query (params) {
  const replParam = params
  params = {param:JSON.stringify(params)}
  params.page = replParam.page
  params.pageSize = replParam.pageSize
  let newparams = pageParams(params)
  return request({
    url: consume.query,
    method: 'post',
    params: newparams,
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
