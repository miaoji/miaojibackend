import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query } from '../../services/store/business'
import { pageModel } from '../common'
import { time } from '../../utils'
import { query as queryOperator } from '../../services/store/operatorbyname'

export default modelExtend(pageModel, {
  namespace: 'business',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    expandedRowKeys: [],
    sonlist: [],
    iduser: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/business') {
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
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(query, { mailtype: 0, ...newpayload, download: 0 })
      if (data.obj) {
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

    *getOperator({ payload }, { call, put, select }) {
      const idusers = yield select(({ business }) => business.iduser)
      console.log('payloaddd', payload)
      if (payload.idUser === idusers || payload.idUser === undefined) {
        yield put({
          type: 'setSiteName',
          payload: {
            expandedRowKeys: [payload.idUser]
          }
        })
        return
      }
      message.success('信息正在加载，请稍等')
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(queryOperator, { mailtype: 0, ...newpayload, download: 0 })
      if (data.code === 200) {
        console.log('data', data)
        yield put({
          type: 'setSiteName',
          payload: {
            sonlist: data.obj,
            expandedRowKeys: [payload.idUser],
            iduser: payload.idUser
          }
        })
      } else {
        message.warning('信息加载失败')
      }
    }

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
