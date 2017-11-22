import { request, config, pageParams } from '../utils'
const { api } = config
const { collection } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: collection,
    method: 'get',
    data: params,
  })
}
