import modelExtend from 'dva-model-extend'
import { query, gitBrandByIdUser } from '../../services/store/problem'
import { pageModel } from '../system/common'
import { time, initialCreateTime, filterStoreSelect } from '../../utils'

export default modelExtend(pageModel, {
  namespace: 'problem',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    expandedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/problem') {
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
      filterStoreSelect(payload)
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(query, { ...newpayload, download: 0 })
      if (data.obj) {
        const list = data.obj
        // list.forEach((item, index) => {
        //   item.key = index
        // })
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
      }
    },

    *queryDetail({ payload, rowItem }, { select, put, call }) {
      if (rowItem.brandList instanceof Array) {
        return
      }
      const list = yield select(({ problem }) => problem.list)
      payload = initialCreateTime(payload)
      let newpayload = {}
      if (!payload.startTime) {
        const times = time.yesterTime()
        newpayload = { ...times, ...payload }
      } else {
        newpayload = { ...payload }
      }
      // download是否下载 0表示不下载,进行的是分页查询1表示的是按当前的筛选下载全部数据
      const data = yield call(gitBrandByIdUser, { ...newpayload })
      list.forEach((item) => {
        if (item.idUser === payload.idUser) {
          if (data.code === 200 && data.obj && data.obj.length) {
            item.brandList = data.obj
          } else {
            item.brandList = []
          }
        }
      })
      yield put({
        type: 'querySuccess',
        payload: {
          list,
        },
      })
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
