import modelExtend from 'dva-model-extend'
import { query } from '../services/collect'
import { pageModel } from './common'
import { config } from '../utils'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'collect',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {

    setup ({ dispatch, history }) {

      history.listen(location => {
        if (location.pathname === '/collect') {
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
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data.mess || '网络不行了!!!'
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
