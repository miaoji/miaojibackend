import { request, config, pageParams } from '../../utils'

const { api } = config
const { operatorbyname } = api

export async function query(params) {
  params = pageParams(params)
  delete params.location
  return request({
    url: operatorbyname.all,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}
