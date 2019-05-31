import { request, config, pageParams } from '../../utils'

const { api } = config
const { backlistdetail } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: backlistdetail.all,
    method: 'post',
    data: params,
  })
}
