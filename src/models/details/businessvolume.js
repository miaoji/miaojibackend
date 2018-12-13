import modelExtend from 'dva-model-extend'
import { message, notification } from 'antd'
import { detail as query, downloadDetailExcel } from '../../services/businessvolume'
import { pageModel } from '../system/common'
import { time, initialCreateTime, APIV3 } from '../../utils'

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

    *download({ payload = {} }, { call }) {
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
      console.log('payload', newpayload)
      const data = yield call(downloadDetailExcel, { ...newpayload })
      if (data.code === 200 && data.obj) {
        const url = APIV3 + data.obj
        const openUrl = window.open(url)
        if (openUrl === null) {
          notification.warn({
            message: '下载失败',
            description: '请关闭浏览阻止网页弹窗的功能!!!',
            duration: 3,
          })
        } else {
          notification.warn({
            message: '正在下载',
            description: '请等待!!!',
            duration: 3,
          })
        }
      } else {
        throw data.mess || '无法跟服务器建立有效连接'
      }
    },

  },

  reducers: {},
})
