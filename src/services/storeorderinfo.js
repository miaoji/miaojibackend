import { request, config, pageParams } from '../utils'
const { api: { storeorderinfo, storeusers } } = config

export async function query(params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  params.pagination = Number(params.pagination)
  params.rownum = Number(params.rownum)
  params = JSON.stringify(params)
  return request({
    url: storeorderinfo.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}

export async function getStoreInfo(params) {
  return request({
    url: storeusers.list,
    method: 'post',
    params: {
      param: JSON.stringify(params)
    }
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
