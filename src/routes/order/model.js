import modelExtend from 'dva-model-extend'
import { query } from './service'
import { config, initialCreateTime, time, storage, pageModel } from '../../utils'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order') {
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
      payload.name ? payload.name = payload.name.split('///')[1] : undefined
      payload.serialNumber = payload.serialNumber ? payload.serialNumber.trim() : undefined
      payload = initialCreateTime(payload)
      if (Number(payload.mailtype) === 9) {
        payload.mailtype = undefined
      }
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime(7, 7)
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      if (payload.serialNumber) {
        delete newpayload.startTime
        delete newpayload.endTime
      }
      let data = yield call(query, { ...newpayload })
      if (data.code === 200) {
        const storeuserArr = storage({ key: 'storeuserArr', json: true })
        const list = data.obj.map((i) => {
          const itemInfo = storeuserArr.find(k => +i.idUser && +i.idUser === k.idUser) || {}
          return {
            ...i,
            address: itemInfo.address || '/',
          }
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list,
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