import { request, config, pageParams } from '../../utils'

const { api } = config
const { operator } = api

export async function query (params) {
  params = pageParams(params)
  if (params.download && params.download === 1) {
    delete params.pagination
    delete params.rownum
  }
  delete params.page
  delete params.pageSize
  params = JSON.stringify(params)
  return request({
    url: operator.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}
