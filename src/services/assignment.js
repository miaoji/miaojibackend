import { request, api, pageParams } from 'utils'

const { assignment } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: assignment.list,
    method: 'post',
    data: params,
  })
}
