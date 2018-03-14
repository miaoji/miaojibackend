import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { color } from '../utils/theme'
import { storage, time } from '../utils'
import { myCity, query, getLineData } from '../services/dashboard'
import { parse } from 'qs'

export default modelExtend(pageModel, {
  namespace: 'dashboard',
  state: {
    receviceData: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    sendData: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    sales: [],
    quote: {
      name: '圈嘀科技',
      title: '--',
      content: '学如逆水行舟，不进则退',
      avatar: 'http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg',
    },
    numbers: [
      {
        icon: 'pay-circle-o',
        color: color.green,
        title: '今日收入',
        number: 2781,
      }, {
        icon: 'team',
        color: color.blue,
        title: '新增用户',
        number: 3241,
      }, {
        icon: 'message',
        color: color.purple,
        title: '在线人数',
        number: 253,
      }, {
        icon: 'shopping-cart',
        color: color.red,
        title: '今日购买',
        number: 4324,
      },
    ],
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
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/dashboard' || location.pathname === '') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const storageData = JSON.parse(storage({key: 'linedata'}))
      const todayStr = time.getToday(new Date().getTime())
      let receviceData = []
      let sendData = []

      console.log('storageData', storageData)
      
      if (storageData && todayStr === storageData.time) {
        yield put({
          type: 'setStates',
          payload: {
            receviceData: storageData.receviceData,
            sendData: storageData.sendData
          }
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


        localStorage.setItem('time', '123456')
        yield put({
          type: 'setStates',
          payload: {
            receviceData,
            sendData
          }
        })
        storage({type: 'set', key:'linedata', val: JSON.stringify({
          time: todayStr,
          receviceData,
          sendData
        })})
      }
      
    },
  },
  reducers: {
    setStates (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
