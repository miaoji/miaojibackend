import { request, api, pageParams } from 'utils'

const { wxuser } = api

export async function query (params) {
  params = pageParams(params)
  delete params.location
  return request({
    url: wxuser.list,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: wxuser.getById,
    method: 'get',
    data: params,
  })
}
