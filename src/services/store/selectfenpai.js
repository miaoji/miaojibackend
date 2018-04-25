import { request, config, pageParams } from '../../utils'
const { api } = config
const { selectfenpai } = api

export async function query (params) {
  params = pageParams(params)
  delete params.page
  delete params.pageSize
  delete params.download
  params = JSON.stringify(params)
  return request({
    url: selectfenpai.all,
    method: 'post',
    params: {
      param: params
    }
  })
}
