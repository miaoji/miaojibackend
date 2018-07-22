import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { detail as query } from '../../services/businessvolume'
import { pageModel } from '../system/common'
import { time, initialCreateTime } from '../../utils'

export default modelExtend(pageModel, {
  namespace: 'businessvolumeDetail',

  state: {
    currentItem: {},
    idUser: '',
    startTime: '',
    endTime: '',
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/businessvolumeDetail') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      payload = initialCreateTime(payload)
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      if (payload.idUser) {
        newpayload.idUser = payload.idUser.split('///')[0]
      }
      if (payload.state) {
        newpayload.state = payload.state.split('///')[0]
      }
      if (!payload.orderSn) {
        delete newpayload.orderSn
      }
      const data = yield call(query, { ...newpayload })
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
        yield put({
          type: 'querySuccess',
          payload: {
            list: [],
            pagination: {
              current: 1,
              pageSize: 10,
              total: 0,
            },
          },
        })
        message.error(data.mess || '网络错误')
      }
    },

  },

  reducers: {

    setSiteName(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

  },
})
