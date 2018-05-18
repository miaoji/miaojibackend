import { request, config, pageParams } from '../utils'
const { api } = config
const { expend } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: expend,
    method: 'get',
    data: params,
  })
}
