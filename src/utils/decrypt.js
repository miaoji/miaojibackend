import { Base64 } from 'js-base64'
import CryptoJS from 'crypto-js'
/**
 * [解密]
 * @param  {[type]} data [description]
 * @return {[string]}        [description]
 */
export function decryptData(data, type = 'normal') {
  let decData = ''
  if (type === 'str') {
    decData = data
  } else {
    delete data.message
    delete data.statusCode
    delete data.success
    data.forEach((item) => {
      decData += data[item]
    })
  }
  // 秘钥key
  // key不足24位自动以0(最小位数是0)补齐,如果多余24位,则截取前24位,后面多余则舍弃掉
  // let key = "NNcJxzQePoNP2V5E8tughsA0";
  // key = CryptoJS.enc.Utf8.parse(key)
  const key = 'NNcJxzQePoNP2V5E8tughsA0'
  const base64 = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.enc.Utf8.parse('9dBgh0GS')
  let decrypt = CryptoJS.TripleDES.decrypt(decData, base64, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  })
  let parseData = CryptoJS.enc.Base64.stringify(decrypt)
  parseData = Base64.decode(parseData)
  if (parseData.indexOf('"obj":[') !== -1) {
    parseData = parseData.split(']}')[0]
    parseData += ']}'
  } else if (parseData.indexOf('"obj":{') !== -1) {
    parseData = parseData.split('}}')[0]
    parseData += '}}'
  } else if (parseData.indexOf('"}') !== -1) {
    parseData = parseData.split('"}')[0]
    parseData += '"}'
  } else {
    parseData = parseData.split('}')[0]
    parseData += '}'
  }
  parseData = JSON.parse(parseData)
  return parseData
}
