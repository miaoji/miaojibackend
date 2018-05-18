import { request, config, pageParams } from '../utils'
const { api } = config

const { blacklist } = api


export async function query (params) {
  	params = pageParams(params)
	return request({
		url: blacklist.all,
		method: 'post',
		params
	})
}