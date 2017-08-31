import { request, config, pageParams, } from '../utils'
const { api } = config
const { income } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: income,
    method: 'get',
    data: params,
  })
}
