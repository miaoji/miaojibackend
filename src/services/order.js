import { request, config, pageParams } from '../utils'
import { getLocation } from '../utils/getUserInfo'

const { api } = config
const { order } = api

export async function query(params) {
  params = pageParams(params)
  params.location = getLocation().length ? getLocation() : undefined
  return request({
    url: order.list,
    method: 'post',
    data: params,
  })
}
