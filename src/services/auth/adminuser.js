import { request, config, pageParams } from '../../utils'

const { api: { auth: { adminuser } } } = config

export async function query(params) {
  params = pageParams(params)
  return request({
    url: adminuser.list,
    method: 'get',
    params,
  })
}

export async function create(params) {
  return request({
    url: adminuser.create,
    method: 'post',
    params,
  })
}

export async function update(params) {
  return request({
    url: adminuser.update,
    method: 'post',
    params,
  })
}

export async function remove(params) {
  console.log('params', params)
  return request({
    url: adminuser.delete,
    method: 'delete',
    params,
  })
}

export async function showSiteName() {
  return request({
    url: adminuser.showSiteName,
    method: 'post',
  })
}
