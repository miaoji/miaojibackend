import { request, api, pageParams } from '../utils'

const { communicationbill } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: communicationbill.list,
    method: 'post',
    data: params,
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: communicationbill.list,
    method: 'post',
    data: params,
  })
}

export function detailQuery(params) {
  params = pageParams(params)
  return request({
    url: communicationbill.detail,
    method: 'post',
    data: params,
  })
}

export function detailDownload(params) {
  params = pageParams(params)
  return request({
    url: communicationbill.detail,
    method: 'post',
    data: params,
  })
}
