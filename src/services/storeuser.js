import { request, api, pageParams } from '../utils'
import mainRequest from '../utils/mainRequest'

const { storeuser, registerAPP } = api

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
    data: params,
  })
}

export async function versionswitch(params) {
  return request({
    url: storeuser.versionswitch,
    method: 'post',
    data: params,
  })
}

export async function createAccount(params) {
  return mainRequest({
    url: registerAPP,
    method: 'parampost',
    data: params,
    decrypt: true,
  })
}

export function monitorAdd(params) {
  return request({
    url: storeuser.monitorAdd,
    method: 'post',
    data: params,
  })
}

export function monitorList(params) {
  return request({
    url: storeuser.monitorList,
    method: 'post',
    data: params,
  })
}

export function storeDel(params) {
  return request({
    url: storeuser.del,
    method: 'post',
    data: params,
  })
}
