import { request, config, pageParams } from '../../utils'
const { api } = config
const { operatorAssignFee } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  params = JSON.stringify(params)
  return request({
    url: operatorAssignFee.all,
    method: 'post',
    params: {
      param: params
    }
  })
}
