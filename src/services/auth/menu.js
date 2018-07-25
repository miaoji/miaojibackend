import { request, config, pageParams } from '../../utils'

const { api: { auth: { menu } } } = config

export async function query(params) {
  params = pageParams(params)
  return request({
    url: menu.list,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: menu.create,
    method: 'post',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: menu.update,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: menu.delete,
    method: 'post',
    data: params,
  })
}

export async function getMenuByParentId(params) {
  return request({
    url: menu.getMenuByParentId,
    method: 'post',
    data: params,
  })
}

export async function updateAdminOrangeize() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, 'done')
  }).then((value) => {
    console.log(value)
    return value
  })
}
