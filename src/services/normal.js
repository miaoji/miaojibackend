import { request, config } from '../utils'
const { api } = config
const { normal } = api

export async function query (params) {
  return request({
    url: normal,
    method: 'get',
    data: params,
  })
}
