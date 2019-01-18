import axios from 'axios'
import lodash from 'lodash'
import 'url-search-params-polyfill'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    params,
    timeout = 9000000,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: cloneData || params,
        timeout,
      })
    case 'delete':
      return axios({
        url,
        method: 'delete',
        params: cloneData || params,
        timeout,
      })
    case 'post':
      return axios({
        url,
        method: 'post',
        data: cloneData,
        params,
        timeout,
      })
    /* eslint-disable */
    case 'parampost':
      let param = new URLSearchParams()
      param.append('param', data.param)
      return axios({
        url,
        method: 'post',
        data: param,
        timeout: 200000,
        headers: {
          'content-Type': 'application/x-www-form-urlencoded'
        }
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
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
