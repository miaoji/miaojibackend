import { request, config, pageParams, } from '../utils'
const { api } = config
const { topups } = api

export async function query (params) {
	params = pageParams(params)
  	return request({
	    url: topups,
	    method: 'get',
	    fetchType: 'CORS',
	    data: params
  })
}
