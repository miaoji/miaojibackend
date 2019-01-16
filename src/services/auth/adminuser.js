import { request, config, pageParams, getUserId, getOrgId, isSuperAdmin } from '../../utils'

const isSuperRole = isSuperAdmin()

const { api: { auth: { adminuser } } } = config

export async function query(params) {
  params.userId = getUserId() === 1 || isSuperRole ? undefined : getUserId()
  params.orgId = getOrgId()
  params = pageParams(params)
  delete params.location
  return request({
    url: adminuser.list,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: adminuser.create,
    method: 'post',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: adminuser.update,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: adminuser.delete,
    method: 'post',
    data: params,
  })
}
