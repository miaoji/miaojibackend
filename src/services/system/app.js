import { request, config, pageParams } from 'utils'

const { api } = config
const { user, userLogout, userLogin, storeuser } = api

export async function login(params) {
  return request({
    url: userLogin.login,
    method: 'post',
    data: params,
  })
}

export async function logout(params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query(params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

export async function queryStoreUser(params) {
  params = pageParams(params)
  // if (params.rownum === 10000) {
  //   delete params.location
  // }
  if (!params.userIds && !params.superId) {
    params.superId = -1
  }
  return request({
    url: storeuser.conciseStores,
    method: 'post',
    data: params,
  })
}
