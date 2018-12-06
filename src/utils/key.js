const initCode = () => {
  const tmpcode = '0123456789asdfghjklpoiuytrewqzxcvbnmASDFGHJKLPOIUYTREWQZXCVBNM'
  let tmpStr = ''
  for (let i = 0; i < 4; i += 1) {
    tmpStr += tmpcode[Math.round(Math.random() * 61)]
  }
  return tmpStr
}

export default function () {
  const tmpStr = initCode()
  const tmpNum = new Date().getTime()
  return tmpStr + tmpNum
}
