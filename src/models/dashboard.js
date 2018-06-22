import modelExtend from 'dva-model-extend'
import { pageModel } from './system/common'
import { color } from '../utils/theme'
import { storage, time } from '../utils'
import { getLineData, weChatUser, storeTotal, income } from '../services/dashboard'

export default modelExtend(pageModel, {
  namespace: 'dashboard',
  state: {
    receviceData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sendData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sales: [],
    quote: {
      name: '圈嘀科技',
      title: '--',
      content: '学如逆水行舟，不进则退',
      avatar: 'http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg',
    },
    income: {
      icon: 'pay-circle-o',
      color: color.green,
      title: '昨日收入',
      number: 2781,
    },
    storeTotal: {
      icon: 'shop',
      color: color.blue,
      title: '门店总数',
      number: 3241,
    },
    weChatUser: {
      icon: 'message',
      color: color.purple,
      title: '微信用户',
      number: 253,
    },
    shop: {
      icon: 'shopping-cart',
      color: color.red,
      title: '今日购买',
      number: 4324,
    },
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      name: '管理员',
      email: 'winner@qq.com',
      avatar: 'http://pic.qbaobei.com/Uploads/Picture/2016-01-14/569781503c21f.jpg',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/dashboard' || location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({ type: 'getIncome' })
          dispatch({ type: 'getStoreTotal' })
          dispatch({ type: 'getWeChatUser' })
        }
      })
    },
  },
  effects: {
    *getIncome(_, { call, put }) {
      console.log('1231')
      const data = yield call(income)
      console.log('data123123', data)
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            income: {
              icon: 'pay-circle-o',
              color: color.green,
              title: '昨日收入',
              number: data.obj,
            },
          },
        })
      } else {
        throw data.mess || '网络连接失败'
      }
    },
    *getStoreTotal(_, { call, put }) {
      const data = yield call(storeTotal)
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            storeTotal: {
              icon: 'shop',
              color: color.blue,
              title: '门店总数',
              number: data.obj,
            },
          },
        })
      } else {
        throw data.mess || '网络连接失败'
      }
    },
    *getWeChatUser(_, { call, put }) {
      const data = yield call(weChatUser)
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            weChatUser: {
              icon: 'message',
              color: color.purple,
              title: '微信用户',
              number: data.obj,
            },
          },
        })
      } else {
        throw data.mess || '网络连接失败'
      }
    },
    *query(_, { call, put }) {
      const storageData = JSON.parse(storage({ key: 'linedata' }))
      const todayStr = time.getToday(new Date().getTime())
      let receviceData = []
      let sendData = []

      if (storageData && todayStr === storageData.time) {
        yield put({
          type: 'setStates',
          payload: {
            receviceData: storageData.receviceData,
            sendData: storageData.sendData,
          },
        })
        return
      }
      const data = yield call(getLineData)
      if (data.code === 200) {
        const recevice = data.obj.recevice
        const send = data.obj.send
        recevice.forEach((item) => {
          receviceData.push([item.createTime, item.count])
        })
        send.forEach((item) => {
          sendData.push([item.createTime, item.count])
        })

        storage({
          type: 'set',
          key: 'linedata',
          val: JSON.stringify({
            time: todayStr,
            receviceData,
            sendData,
          }),
        })

        yield put({
          type: 'setStates',
          payload: {
            receviceData,
            sendData,
          },
        })
      }
    },
  },
  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
