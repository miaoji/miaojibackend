import { request, config, pageParams } from '../../utils'

const { api } = config
const { problemdetail } = api

export async function query (params) {
  params = pageParams(params)
  delete params.download
  delete params.location
  return request({
    url: problemdetail.all,
    method: 'post',
    data: params,
  })
}
