import { request, config, pageParams } from '../../utils'

const { api: { auth: { menu } } } = config
// const { auth } = api
// const { menu } = auth

export async function query(params) {
  params = pageParams(params)
  return request({
    url: menu.list,
    method: 'get',
    params,
  })
}

export async function create(params) {
  return request({
    url: menu.add,
    method: 'post',
    params,
  })
}

export async function update(params) {
  return request({
    url: menu.update,
    method: 'post',
    params,
  })
}

export async function remove(params) {
  return request({
    url: menu.update,
    method: 'delete',
    params,
  })
}
