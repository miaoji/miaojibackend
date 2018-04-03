import { request, config, pageParams } from '../../utils'
const { api } = config
const { storeSign } = api

export async function query (params) {
  params = pageParams(params)
  // delete params.page
  // delete params.pageSize
  params = JSON.stringify(params)
  return request({
    url: storeSign.all,
    method: 'post',
    params: {
      param: params
    }
  })
}
