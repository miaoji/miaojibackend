import { request, config, pageParams, getOrgId } from '../../utils'

const { api: { auth: { org } } } = config

export async function query(params) {
  params.orgId = getOrgId()
  params = pageParams(params)
  delete params.location
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
    method: 'get',
  })
}

export async function getIdUsers(data) {
  return request({
    url: org.getIdUsers,
    method: 'post',
    data,
  })
}
