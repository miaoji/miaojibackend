import { request, config, pageParams } from '../utils'
const { api } = config
const { communications } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: communications,
    method: 'get',
    // fetchType: 'CORS',
    data: params,
  })
}
