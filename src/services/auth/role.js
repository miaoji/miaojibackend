import { request, config, pageParams } from '../../utils'

const { api: { auth: { role } } } = config

export async function query(params) {
  params = pageParams(params)
  return request({
    url: role.list,
    method: 'get',
    params,
  })
}

export async function create(params) {
  return request({
    url: role.add,
    method: 'post',
    params,
  })
}

export async function update(params) {
  return request({
    url: role.update,
    method: 'post',
    params,
  })
}

export async function remove(params) {
  return request({
    url: role.update,
    method: 'post',
    params,
  })
}
