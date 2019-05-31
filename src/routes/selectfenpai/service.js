import { request, config, pageParams } from '../../utils'

const { api } = config
const { selectfenpai } = api

export async function query (params) {
  params = pageParams(params)
  delete params.download
  return request({
    url: selectfenpai.all,
    method: 'post',
    data: params,
  })
}
