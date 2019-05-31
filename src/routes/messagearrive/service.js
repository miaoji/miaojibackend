import { request, api, pageParams } from '../../utils'

const { messagearrive } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: messagearrive.list,
    method: 'post',
    data: params,
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: messagearrive.download,
    method: 'post',
    data: params,
  })
}

export async function expandQuery(params) {
  return request({
    url: messagearrive.expand,
    method: 'post',
    data: params,
  })
}


export function detailQuery(params) {
  params = pageParams(params)
  return request({
    url: messagearrive.detailList,
    method: 'post',
    data: params,
  })
}

export function detailDownload(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: messagearrive.detailDownload,
    method: 'post',
    data: params,
  })
}
