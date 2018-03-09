import { request, config, pageParams } from '../utils'
const { api } = config
const { sentalong } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  params.pagination = Number(params.pagination)
  params.rownum = Number(params.rownum)
  params = JSON.stringify(params)
  return request({
    url: sentalong.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}
