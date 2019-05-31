import { request, config, pageParams } from '../../utils'

const { api: { auth: { org } }, storeuser } = config

export async function query(params) {
  // params.orgId = getOrgId()
  params = pageParams(params)
  // delete params.location
  return request({
    url: org.list,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: org.create,
    method: 'post',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: org.update,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: org.delete,
    method: 'post',
    data: params,
  })
}

export async function getLocation() {
  return request({
    url: org.getLocation,
    method: 'post',
    data: {},
  })
}

export async function getIdUsers(data) {
  return request({
    url: org.getIdUsers,
    method: 'post',
    data,
  })
}

export function queryStoreUser(params) {
  console.log('params', params)
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
