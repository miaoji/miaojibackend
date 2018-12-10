import { request, config, pageParams } from '../utils'

const { api } = config
const { order } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: order.list,
    method: 'post',
    data: params,
  })
}
