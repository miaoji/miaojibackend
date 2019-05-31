import { request, api, pageParams } from 'utils'

const { articles } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: articles.list,
    method: 'post',
    data: params,
  })
}