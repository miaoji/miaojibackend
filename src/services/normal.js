import { request, config, pageParams, } from '../utils'
const { api } = config
const { normal } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: normal,
    method: 'get',
    data: params,
  })
}
