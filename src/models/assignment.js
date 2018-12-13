import modelExtend from 'dva-model-extend'
import { config, initialCreateTime } from 'utils'
import { query } from '../services/assignment'
import { pageModel } from './system/common'

const { prefix } = config
export default modelExtend(pageModel, {
  namespace: 'assignment',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/assignment') {
          if (location.query && !location.query.name) {
            dispatch({ type: 'querySuccess', payload: { list: [], pagination: { total: 0 } } })
          } else {
            dispatch({ type: 'query', payload: location.query })
          }
        }
      })
    },
  },

  effects: {

    * query({ payload = {} }, { call, put }) {
      // 如果使用了日期选择器, 则需要配合initialCreateTime方法处理时间
      payload = initialCreateTime(payload)
      const data = yield call(query, payload)
      if (data.code === 200) {
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
        throw data.mess || '当前网络无法使用'
      }
    },

  },

  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion(state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
