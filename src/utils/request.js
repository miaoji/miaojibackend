import axios from 'axios'
import qs from 'qs'
// import { YQL, CORS } from './config'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    // paramkey,
    params,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 60000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: cloneData || params,
        timeout: 60000,
      })
    case 'delete':
      return axios({
        url,
        method: 'delete',
        params: cloneData || params,
        timeout: 60000,
      })
    case 'post':
      return axios({
        url,
        method: 'post',
        data: cloneData,
        params,
        timeout: 60000,
      })
    // case 'parampost':
    //   let param = new URLSearchParams()
    //   param.append(paramkey, cloneData)
    //   return axios({
    //     url,
    //     method: 'post',
    //     data: param,
    //     timeout: 200000,
    //     headers: {
    //       'content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   })
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
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
