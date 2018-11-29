import { request, api, pageParams } from '../utils'

const { storeuser } = api

export async function query(params) {
  params = pageParams(params)
  // if (params.rownum === 10000) {
  //   delete params.location
  // }
  if (!params.userIds && !params.superId) {
    params.superId = -1
  }
  return request({
    url: storeuser.list,
    method: 'post',
    data: params,
  })
}

export async function updateFee(params) {
  return request({
    url: storeuser.updateFee,
    method: 'post',
    params,
  })
}

export async function versionswitch(params) {
  return request({
    url: storeuser.versionswitch,
    method: 'post',
    params,
  })
}
