import { request, config, pageParams } from '../utils'
const { api } = config
const { storeorderinfo } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  params = JSON.stringify(params)
  return request({
    url: storeorderinfo.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}

export async function downLoad(params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  delete params.pagination
  delete params.rownum
  params = JSON.stringify(params)
  return request({
    url: storeorderinfo.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}
