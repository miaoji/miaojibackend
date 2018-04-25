import { request, config, pageParams } from '../../utils'
const { api } = config
const { selectpjjeDetails } = api

export async function query (params) {
  params = pageParams(params)
  // delete params.page
  // delete params.pageSize
  // delete params.pagination
  // delete params.rownum
  params = JSON.stringify(params)
  return request({
    url: selectpjjeDetails.all,
    method: 'post',
    params: {
      param: params
    }
  })
}

export async function download (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  delete params.pagination
  delete params.rownum
  params = JSON.stringify(params)
  return request({
    url: selectpjjeDetails.all,
    method: 'post',
    params: {
      param: params
    }
  })
}
