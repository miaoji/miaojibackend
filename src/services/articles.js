import { request, api, pageParams } from 'utils'

const { articles } = api

export async function query (params) {
  params = pageParams(params)
  params = JSON.stringify(params)
  return request({
    url: articles.list,
    method: 'post',
    params: {
      param: params,
    },
  })
}
