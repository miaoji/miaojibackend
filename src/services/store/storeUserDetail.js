import { request, config, pageParams } from '../../utils'
const { api } = config
const { storeUserDetail } = api

export async function query(params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  delete params.download
  delete params.pagination
  delete params.rownum
  params = JSON.stringify(params)
  return request({
    url: storeUserDetail.all,
    method: 'post',
    params: {
      param: params
    }
  })
}
