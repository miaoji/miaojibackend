import { request, api, pageParams } from 'utils'

const { brandcount } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: brandcount.list,
    method: 'post',
    data: params,
  })
}
