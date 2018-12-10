import { request, config, pageParams } from '../../utils'

const { api } = config
const { business } = api

export async function query (params) {
  params = pageParams(params)
  delete params.download
  return request({
    url: business.all,
    method: 'post',
    data: params,
  })
}
