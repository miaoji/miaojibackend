import { request, config, pageParams } from '../utils'

const { api } = config
const { log } = api

export async function query(params) {
  params = pageParams(params)
  delete params.userIds
  return request({
    url: log.list,
    method: 'post',
    data: params,
  })
}
