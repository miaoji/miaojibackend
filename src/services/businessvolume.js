import { request, api, pageParams } from '../utils'

const { businessvolume } = api

console.log('businessvolume.list', businessvolume.list)
export async function query(params) {
  params = pageParams(params)
  return request({
    url: businessvolume.list,
    method: 'post',
    data: params,
  })
}

export async function detail(params) {
  params = pageParams(params)
  return request({
    url: businessvolume.detail,
    method: 'post',
    data: params,
  })
}

export async function count(params) {
  params = pageParams(params)
  return request({
    url: businessvolume.count,
    method: 'post',
    data: params,
  })
}

export async function downloadExcel(params) {
  return request({
    url: businessvolume.downloadExcel,
    method: 'post',
    data: params,
  })
}
