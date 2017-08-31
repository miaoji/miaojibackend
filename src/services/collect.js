import { request, config, pageParams, } from '../utils'
const { api } = config
const { collect } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: collect,
    method: 'get',
    data: params,
  })
}
