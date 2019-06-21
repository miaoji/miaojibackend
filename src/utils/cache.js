import md5 from 'js-md5'
import { getToday } from './time'

export const initCacheKey = ({ url, ...params } = {}) => {
  const todayStr = getToday(new Date().getTime())
  return `api-${url}-${location.pathname.replace(/[/]/, '') || 'dashboard'}-${todayStr}-${md5(JSON.stringify(params || {}))}`
}
