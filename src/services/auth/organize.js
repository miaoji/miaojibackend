import { request, config, pageParams } from '../../utils'

const { api: { auth: { organize } } } = config

export async function query(params) {
  params = pageParams(params)
  return request({
    url: organize.list,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: organize.create,
    method: 'post',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: organize.update,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: organize.delete,
    method: 'post',
    data: params,
  })
}
