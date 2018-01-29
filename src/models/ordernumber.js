import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query, create, update, remove, showBrandName } from '../services/ordernumber'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'ordernumber',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/ordernumber') {
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
      }
    },

    *create ({ payload }, { call, put, select }) {
      const { userId } = yield select(_ => _.app.user)
      let newOrderNumber = {
        cname: userId,
        // brand: payload.brand.split('/-/')[0],
        brandId: payload.brand.split('/-/')[1],
        start: payload.start,
        end: payload.end,
        length: payload.length
      }
      newOrderNumber = JSON.stringify(newOrderNumber)
      const data = yield call(create, newOrderNumber)
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ ordernumber }) => ordernumber.currentItem.id)
      const { userId } = yield select(_ => _.app.user)
      let orderNumber = {
        id,
        cname: userId,
        // brand: payload.brand.split('/-/')[0],
        brandId: payload.brand.split('/-/')[1],
        start: payload.start,
        end: payload.end,
        length: payload.length
      }
      orderNumber = JSON.stringify(orderNumber)
      const data = yield call(update, orderNumber)
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      let orderNumber = {
        id: payload,
        state: 2
      }
      orderNumber = JSON.stringify(orderNumber)
      const data = yield call(update, orderNumber)
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *getBrandName ({}, { call, put }) {
      const data = yield call(showBrandName)
      if (data.code === 200 && data.obj) {
        let children = []
        for (let i = 0; i < data.obj.length; i++) {
          let item = data.obj[i]
          children.push(<Option key={`${item.brand}/-/${item.id}`}>{item.brand}</Option>)
        }
        yield put({
          type: 'setBrandName',
          payload: {
            brandName: children,
          },
        })
      } else {
        throw data.mess || '无法跟服务器建立有效连接'
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

    setBrandName (state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
