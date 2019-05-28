import axios from 'axios'
import lodash from 'lodash'
import { storage } from './storage'
import { getUserId } from './getUserInfo'

axios.defaults.withCredentials = true

const fetch = (options) => {
  let {
    method = 'get',
    data,
    params,
    timeout = 9000000,
    url,
    auth = true,
    token,
  } = options

  params = params ? { ...params, requestId: getUserId() } : undefined
  data = data ? { ...data, requestId: getUserId() } : undefined

  const cloneData = lodash.cloneDeep(data)

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: cloneData || params,
        timeout,
        headers: auth ? { token } : {},
      })
    case 'delete':
      return axios({
        url,
        method: 'delete',
        params: cloneData || params,
        timeout,
        headers: auth ? { token } : {},
      })
    case 'post':
      return axios({
        url,
        method: 'post',
        data: cloneData,
        params,
        timeout,
        headers: auth ? { token } : {},
      })
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

/**
 * [用于发起ajax请求的一个封装的方法]
 */
export default function request(options) {
  options.token = storage({ key: 'token' })
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
      if (statusCode === 401) {
        storage({ type: 'clear' })
        // window.location.href = '/login'
      }
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
