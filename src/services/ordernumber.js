import { request, config, pageParams } from '../utils'

const { api } = config
const { ordernumber } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: ordernumber.index,
    method: 'post',
    data: params,
  })
}

export async function create(data) {
  return request({
    url: ordernumber.create,
    method: 'post',
    data,
  })
}

export async function remove(params) {
  return request({
    url: ordernumber.update,
    method: 'post',
    data: params,
  })
}

export async function update(data) {
  return request({
    url: ordernumber.update,
    method: 'post',
    data,
  })
}

export async function showBrandName(params = {}) {
  return request({
    url: ordernumber.showBrandName,
    method: 'post',
    data: params,
  })
}
