import { request, api, pageParams } from '../../utils'

const { businessvolume } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: businessvolume.list,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}

export async function detail(params) {
  params = pageParams(params)
  return request({
    url: businessvolume.detail,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}

export async function count(params) {
  params = pageParams(params)
  return request({
    url: businessvolume.count,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}

export async function downloadExcel(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: businessvolume.downloadExcel,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}

export function downloadDetailExcel(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: businessvolume.downloadDetailExcel,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}

export function downloadAllData(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: businessvolume.downloadAllData,
    method: 'post',
    data: { ...params, isHistory: 1 },
  })
}
