import { request, api, pageParams } from '../../utils'

const { docking } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: docking.list,
    method: 'post',
    data: params,
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.list,
    method: 'post',
    data: params,
  })
}

export async function detail(params) {
  params = pageParams(params)
  return request({
    url: docking.detail,
    method: 'post',
    data: params,
  })
}

export async function count(params) {
  params = pageParams(params)
  return request({
    url: docking.count,
    method: 'post',
    data: params,
  })
}

export async function downloadExcel(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.detail,
    method: 'post',
    data: params,
  })
}

export function downloadDetailExcel(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.detail,
    method: 'post',
    data: params,
  })
}

export function downloadAllData(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: docking.downloadAllData,
    method: 'post',
    data: params,
  })
}

export function brandList(params) {
  params = pageParams(params)
  return request({
    url: docking.brandList,
    method: 'post',
    data: params,
  })
}
