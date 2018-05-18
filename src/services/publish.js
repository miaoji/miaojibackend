import { request, config } from '../utils'
const { api } = config
const { publish } = api

export async function upload (params) {
  // params = pageParams(params)
  return request({
    url: publish.upload,
    method: 'post',
    data: params
  })
}

export async function create (params) {
  // params = pageParams(params)
  return request({
    url: publish.send,
    method: 'post',
    data: params,
  })
}
