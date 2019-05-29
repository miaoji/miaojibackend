import modelExtend from 'dva-model-extend'
import { query as queryStoreUser } from 'src/services/storeuser'
import md5 from 'js-md5'
import { pageModel } from './system/common'
import { color } from '../utils/theme'
import { storage, time, isSuperAdmin, getOrgIdUsers } from '../utils'
import { getLineData, weChatUser, income, terminalTotal, businessvolumecount, interfaceCallList } from '../services/dashboard'

export default modelExtend(pageModel, {
  namespace: 'dashboard',
  state: {
    receviceData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sendData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    interfaceCallData: {},
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
      number: 0,
    },
    storeTotal: {
      icon: 'shop',
      color: color.blue,
      title: '管理门店总数',
      number: 0,
    },
    weChatUser: {
      icon: 'message',
      color: color.purple,
      title: '微信用户',
      number: 0,
    },
    terminalTotal: {
      icon: 'tablet',
      color: color.red,
      title: '终端总数',
      number: 0,
    },
    trafficVolume: {
      someCargo: 0,
      scheduledReceipt: 0,
      signingVolume: 0,
    },
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      name: '',
      email: '',
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
        }
      })
    },
  },
  effects: {
    *getInterfaceCall(_, { call, put, select }) {
      const authStorage = yield select(({ app }) => app.user.sourceMenuList['/dashboard'])
      console.log('authStorage', authStorage)
      if (!authStorage.count) {
        return
      }
      const storageData = JSON.parse(storage({ key: 'interfaceCallData' }))
      const todayStr = time.getToday(new Date().getTime())
      if (storageData && todayStr === storageData.time) {
        const { qsArr, rkArr } = storageData
        yield put({
          type: 'setStates',
          payload: {
            interfaceCallData: {
              qsArr,
              rkArr,
            },
          },
        })
        return
      }

      const data = yield call(interfaceCallList, { cacheKey: md5(`api-stThirtyTime-${todayStr}`) })
      // qsId 签收次数
      // rkId 入库次数
      if (data.code === 200) {
        const arrs = data.obj
        const qsArr = arrs.filter(i => i.qsId).map(i => ([i.createTime, i.qsId]))
        const rkArr = arrs.filter(i => i.rkId).map(i => ([i.createTime, i.rkId]))
        yield put({
          type: 'setStates',
          payload: {
            interfaceCallData: {
              qsArr,
              rkArr,
            },
          },
        })
        storage({
          type: 'set',
          key: 'interfaceCallData',
          val: JSON.stringify({
            time: todayStr,
            qsArr,
            rkArr,
          }),
        })
      } else {
        throw new Error('开发平台接口调用统计数据获取失败')
      }
    },
    *getbusinessvolumecount(_, { call, put }) {
      const todayStr = time.getToday(new Date().getTime())
      let cacheDate = storage({ key: 'trafficVolume' })
      if (cacheDate) {
        cacheDate = JSON.parse(cacheDate)
        if (cacheDate.time === todayStr) {
          yield put({
            type: 'setStates',
            payload: {
              trafficVolume: { ...cacheDate },
            },
          })
          return
        }
      }
      const times = time.yesterTime()

      const data = yield call(businessvolumecount, { ...times })
      if (data.code === 200) {
        const trafficVolume = {
          someCargo: data.obj[0].someCargo,
          scheduledReceipt: data.obj[0].scheduledReceipt,
          signingVolume: data.obj[0].signingVolume,
        }
        storage({ type: 'set', key: 'trafficVolume', val: JSON.stringify({ ...trafficVolume, time: todayStr }) })
        yield put({
          type: 'setStates',
          payload: {
            trafficVolume,
          },
        })
      }
    },

    *getTerminalTotal(_, { call, put }) {
      const data = yield call(terminalTotal)
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            terminalTotal: {
              icon: 'tablet',
              color: color.red,
              title: '终端总数',
              number: data.obj,
            },
          },
        })
      } else {
        throw data.mess || '网络连接失败'
      }
    },
    *getIncome(_, { call, put }) {
      const data = yield call(income)
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
    *getStoreTotal({ payload = {} }, { call, put }) {
      const userIds = getOrgIdUsers()
      if (userIds) {
        yield put({
          type: 'setStates',
          payload: {
            storeTotal: {
              icon: 'shop',
              color: color.blue,
              title: '管理门店总数',
              number: userIds.split(',').length,
            },
          },
        })
        return
      }
      if (isSuperAdmin()) {
        payload.superId = -1
      }
      const data = yield call(queryStoreUser, { page: 1, pageSize: 100000000, ...payload })
      if (data.code === 200) {
        yield put({
          type: 'setStates',
          payload: {
            storeTotal: {
              icon: 'shop',
              color: color.blue,
              title: '管理门店总数',
              number: data.total,
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
    *query(_, { call, put, select }) {
      const showDashboard = yield select(({ app }) => app.showDashboard)
      if (showDashboard) {
        yield put({ type: 'getIncome' })
        yield put({ type: 'getStoreTotal' })
        yield put({ type: 'getWeChatUser' })
        yield put({ type: 'getTerminalTotal' })
        yield put({ type: 'getbusinessvolumecount' })
        yield put({ type: 'getInterfaceCall' })
      }
      const storageData = JSON.parse(storage({ key: 'linedata' }))
      const todayStr = time.getToday(new Date().getTime())
      let receviceData = []
      let sendData = []
      console.log('todayStr', todayStr)
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
      const data = yield call(getLineData, { cacheKey: md5(`api-lineChart-${todayStr}`) })
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
