import { request, config, pageParams } from '../utils'
const { api } = config
const { ordernumber } = api

export async function query(data) {
  data = pageParams(data)
  data = JSON.stringify(data)
  return request({
    url: ordernumber.index,
    method: 'post',
    params: { param: data },
  })
}

export async function create(data) {
  console.log('data', data)
  return request({
    url: ordernumber.create,
    method: 'post',
    params: { param: data },
  })
}

export async function remove(params) {
  return request({
    url: ordernumber.update,
    method: 'post',
    params,
  })
}

export async function update(data) {
  return request({
    url: ordernumber.update,
    method: 'post',
    params: { param: data }
  })
}

export async function showBrandName(params) {
  return request({
    url: ordernumber.showBrandName,
    method: 'post',
    params,
  })
}
