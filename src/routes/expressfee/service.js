import { request, config, pageParams } from '../../utils'

const { api } = config
const { expressfee } = api

export async function query (params) {
  params = pageParams(params)
  delete params.download
  return request({
    url: expressfee.all,
    method: 'post',
    data: params,
  })
}
