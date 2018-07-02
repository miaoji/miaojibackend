import { request, config, pageParams } from '../../utils'

const { api } = config
const { expressfeedetail } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  delete params.showName
  delete params.download
  params = JSON.stringify(params)
  return request({
    url: expressfeedetail.all,
    method: 'post',
    params: {
      param: params,
    },
  })
}

export async function download (params) {
  delete params.page
  delete params.pageSize
  delete params.showName
  params = JSON.stringify(params)
  return request({
    url: expressfeedetail.download,
    method: 'post',
    params: {
      param: params,
    },
  })
}
