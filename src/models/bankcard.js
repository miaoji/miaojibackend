import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { list, add, mod, del } from '../services/bankcard'
import { pageModel } from './system/common'

export default modelExtend(pageModel, {

  namespace: 'bankcard',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/bankcard') {
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
      const Tmp = { ...payload }
      if (payload.name) {
        Tmp.stationName = payload.name.split('///')[1]
        delete Tmp.name
      }
      const data = yield call(list, { ...Tmp })
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

    *create({ payload = {} }, { call, put }) {
      const { idUser } = payload
      const data = yield call(add, {
        userId: idUser.split('///')[0],
        customerCode: payload.customerCode,
        loginName: payload.loginName,
        idType: payload.idType,
        hxName: payload.hxName,
        idNumber: payload.idNumber,
        hxMobile: payload.hxMobile,
        hxSpecialUse: payload.hxSpecialUse,
        email: payload.email,
        card: payload.card,
        hxTel: payload.hxTel,
        hxAddress: payload.hxAddress,
      })
      if (data.code === 200) {
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
        message.success('新增成功')
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *update({ payload = {} }, { call, put }) {
      const data = yield call(mod, payload)
      if (data.code === 200) {
        yield put({ type: 'query' })
        message.success('更新成功')
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *delete({ payload = {} }, { call, put }) {
      const data = yield call(del, {
        id: payload.id,
      })
      if (data.code === 200) {
        yield put({ type: 'query' })
        message.success('删除成功')
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

  },

})
