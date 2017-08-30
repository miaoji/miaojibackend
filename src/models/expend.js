import modelExtend from 'dva-model-extend'
import { query } from '../services/expend'
import { pageModel } from './common'
import { config } from '../utils'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'expend',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {

    setup ({ dispatch, history }) {

      history.listen(location => {
        if (location.pathname === '/expend') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      // console.log(data)
      if (data) {
        delete data.success
        delete data.message
        delete data.statusCode
        let list=[]
        // gettimes("subscribeTime",data) //将13位的时间戳转换成常见时间格式      
        Object.keys(data).forEach(key=>{
          list.push(data[key])
        })
        // console.log('list',list)
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: 60,
            },
          },
        })
      }
    },

  },

  reducers: {

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
