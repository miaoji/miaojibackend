import { request, api } from '../../utils'

const { articles } = api

export async function upload (params) {
  return request({
    url: articles.publish.upload,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: articles.publish.send,
    method: 'post',
    data: params,
  })
}
