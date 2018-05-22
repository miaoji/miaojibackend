import { request, config, pageParams } from 'utils'

const { api } = config
const { wallet } = api
export async function query(params) {
  console.log('wallet', wallet)
  params = pageParams(params)
  return request({
    url: wallet.topup.list,
    method: 'get',
    fetchType: 'CORS',
    data: params,
  })
}
