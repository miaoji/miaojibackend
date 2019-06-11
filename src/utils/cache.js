import md5 from 'js-md5'
import { getToday } from './time'

export const initCacheKey = (params = {}) => {
  const todayStr = getToday(new Date().getTime())
  return `api-${location.pathname.replace(/[/]/, '') || 'dashboard'}-${todayStr}-${md5(`${todayStr}-${JSON.stringify(params || {})}`)}`
}
