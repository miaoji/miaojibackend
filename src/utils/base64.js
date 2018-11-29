import { Base64 } from 'js-base64'

const key = 'miaoji_pcsdfsdfsfsfdsf'

/**
 * [base64加密]
 */
export function encode(str) {
  str = Base64.encode(str)
  str = str.substr(0, 5) + key + str.substr(5)
  return str
}

/**
 * [base64解密]
 */
export function decode(str) {
  try {
    str = str.split(key)
    str = str[0] + str[1]
    str = Base64.decode(str)
    return str
  } catch (error) {
    return ''
  }
}
