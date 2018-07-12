import { request, config, pageParams } from '../../utils'

const { api } = config
const { backlistdetail } = api

export async function query(params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  // delete params.pagination
  // delete params.rownum
  params = JSON.stringify(params)
  return request({
    url: backlistdetail.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}
