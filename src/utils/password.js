import md5 from 'js-md5'

// 此方法不得修改,否则后台网站将登录失败
export default function (pwd) {
  const str = 'mingz-tech'
  return md5(pwd + str)
}
