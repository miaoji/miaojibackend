import { request, config, pageParams, getRoleId, getUserId, isSuperAdmin } from '../../utils'

const { api: { auth: { role } } } = config

export async function query(params) {
  params.roleId = getRoleId()
  if (!isSuperAdmin()) {
    params.createUserId = getUserId()
  }
  params = pageParams(params)
  delete params.location
  return request({
    url: role.list,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: role.create,
    method: 'post',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: role.update,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: role.delete,
    method: 'post',
    data: params,
  })
}

export async function queryMenu(params) {
  params = pageParams(params)
  return request({
    url: role.queryMenu,
    method: 'post',
    data: params,
  })
}
