import { request, api } from '../utils'

const { articles } = api

export async function upload (params) {
  return request({
    url: articles.publish.upload,
    method: 'parampost',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: articles.publish.send,
    method: 'parampost',
    data: params,
  })
}
