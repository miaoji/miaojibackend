import { request, config, pageParams } from '../utils'
const { api } = config
const { mailprice } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  params = JSON.stringify(params)
  return request({
    url: mailprice.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}
