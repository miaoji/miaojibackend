import { myCity, queryWeather, query } from '../services/dashboard'
import { parse } from 'qs'

// zuimei 摘自 http://www.zuimeitianqi.com/res/js/index.js
let zuimei = {
  parseActualData (actual) {
    let weather = {
      icon: `http://www.zuimeitianqi.com/res/icon/${zuimei.getIconName(actual.wea, 'big')}`,
      name: zuimei.getWeatherName(actual.wea),
      temperature: actual.tmp,
      dateTime: new Date(actual.PTm).format('MM-dd hh:mm'),
    }
    return weather
  },

  getIconName (wea, flg) {
    let myDate = new Date()
    let hour = myDate.getHours()
    let num = 0
    if (wea.indexOf('/') !== -1) {
      let weas = wea.split('/')
      if (hour < 12) {
        num = zuimei.replaceIcon(weas[0])
        if (num < 6) {
          num = `${num}_${flg}_night.png`
        } else {
          num = `${num}_${flg}.png`
        }
      } else if (hour >= 12) {
        num = zuimei.replaceIcon(weas[1])
        if (hour >= 18) {
          num = `${num}_${flg}_night.png`
        } else {
          num = `${num}_${flg}.png`
        }
      }
    } else {
      if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 6)) {
        num = `${num}_${flg}_night.png`
      } else {
        num = `${num}_${flg}.png`
      }
    }

    return num
  },

  replaceIcon (num) {
    if (num === 21) {
      num = 7
    } else if (num === 22) {
      num = 8
    } else if (num === 10 || num === 11 || num === 12 || num === 23 || num === 24 || num === 25) {
      num = 9
    } else if (num === 13 || num === 15 || num === 26 || num === 27 || num === 34) {
      num = 14
    } else if (num === 17 || num === 28) {
      num = 16
    } else if (num === 35) {
      num = 18
    } else if (num === 31 || num === 32 || num === 33) {
      num = 20
    } else if (num === 30) {
      num = 29
    }

    return num
  },

  getWeatherName (wea) {
    let name = ''
    if (wea.indexOf('/') !== -1) {
      let weas = wea.split('/')
      name = `${zuimei.getWeatherByCode(weas[0])}转${zuimei.getWeatherByCode(weas[1])}`
    } else {
      name = zuimei.getWeatherByCode(wea)
    }

    return name
  },

}

export default {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '上海',
      temperature: '5',
      name: '晴',
      icon: 'http://www.zuimeitianqi.com/res/icon/0_big.png',
      dateTime: new Date().format('MM-dd hh:mm'),
    },
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'queryWeather' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({ type: 'queryWeather', payload: { ...data } })
    },
  },
  reducers: {
    queryWeatherSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
