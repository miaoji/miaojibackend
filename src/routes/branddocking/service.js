import { request, config, pageParams } from '../../utils'

const { api } = config
const { brandDocking } = api

export async function query(params) {
  params = pageParams(params)
  delete params.name
  return request({
    url: brandDocking.list,
    method: 'post',
    data: params,
  })
}
