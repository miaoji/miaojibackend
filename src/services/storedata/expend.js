import { request, api, pageParams } from 'utils'

const { storedata } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: storedata.expend.list,
    method: 'get',
    params,
  })
}
