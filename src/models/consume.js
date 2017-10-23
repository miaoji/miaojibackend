import modelExtend from 'dva-model-extend'
import { create, remove, update, markBlack } from '../services/consumes'
import { query } from '../services/consumes'
import { pageModel } from './common'
import { config } from '../utils'
import { gettimes } from '../utils/time' //转换时间戳的函数

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'consume',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {

    setup ({ dispatch, history }) {

      history.listen(location => {
        if (location.pathname === '/consume') {
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
      console.log('提交请求的数据---',payload)
      // 转换提交的交易类型的数据
      if (typeof(payload.transactionType)==='string') {
        payload.transactionType = [payload.transactionType]
      }
      // 转换提交的订单状态的数据
      if (typeof(payload.status)==='string') {
        payload.status = [payload.status]
      }
      // 转换提交的支付方式的数据
      if (typeof(payload.paymentMethod)==='string') {
        payload.paymentMethod = [payload.paymentMethod]
      }
      console.log('payload',payload)
      // return
      let data = yield call(query, payload)
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
        throw data.msg || '网络不行了!!!'
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ storeUser }) => storeUser.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
