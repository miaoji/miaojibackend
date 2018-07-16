import { request, config, pageParams } from '../../utils'

const { api: { auth: { role } } } = config

export async function query(params) {
  params = pageParams(params)
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


export async function getLocation() {
  return request({
    url: role.getLocation,
    method: 'get',
  })
}
