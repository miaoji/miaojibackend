import { request, config, pageParams } from 'utils'

const { api } = config
const { wallet } = api

export async function query(params) {
  params = pageParams(params)
  return request({
    url: wallet.withdraw.list,
    method: 'get',
    data: params,
  })
}
