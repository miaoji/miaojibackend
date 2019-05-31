import { request, config, pageParams } from '../../utils'

const { api } = config
const { blacklist } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: blacklist.all,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: blacklist.add,
    method: 'post',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: blacklist.update,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: blacklist.update,
    method: 'post',
    data: params,
  })
}

export async function download(params) {
  params = pageParams(params)
  delete params.pagination
  delete params.rownum
  return request({
    url: blacklist.all,
    method: 'post',
    data: params,
  })
}
