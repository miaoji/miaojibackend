import { message, notification } from 'antd'
import modelExtend from 'dva-model-extend'
import moment from 'moment'
import { config, initialCreateTime } from '../utils'
import { query, download, expandQuery } from '../services/messagearrive'
import { pageModel } from './system/common'

const { prefix, APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'messagearrive',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    expandedRowKeys: [],
    rowExpandList: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/messagearrive') {
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
      payload = initialCreateTime(payload, true)
      if (payload.name) {
        payload.userIds = payload.name.split('///')[0]
        delete payload.name
      }
      const locationPayload = {}
      if (payload.location && payload.location.length > 0) {
        // 不要对传进来的payload直接修改,会直接影响原数据
        let location = payload.location.split(',')
        switch (location.length) {
          case 1:
            locationPayload.province = location[0]
            break
          case 2:
            locationPayload.city = location[1]
            break
          case 3:
            locationPayload.district = location[2]
            break
          default:
            break
        }
      }
      const data = yield call(query, {
        ...payload,
        ...locationPayload,
        location: undefined,
      })
      if (data.code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj || [],
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        message.error(data.mess || '网络错误')
      }
    },

    *download({ ...props }, { call }) {
      let { payload } = props
      notification.success({
        message: '准备中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 3,
      })
      payload = initialCreateTime(payload, true)
      if (payload.name) {
        payload.userIds = payload.name.split('///')[0]
        delete payload.name
      }
      const locationPayload = {}
      if (payload.location && payload.location.length > 0) {
        // 不要对传进来的payload直接修改,会直接影响原数据
        let location = payload.location.split(',')
        switch (location.length) {
          case 1:
            locationPayload.province = location[0]
            break
          case 2:
            locationPayload.city = location[1]
            break
          case 3:
            locationPayload.district = location[2]
            break
          default:
            break
        }
      }
      const newpayload = {
        ...payload,
        ...locationPayload,
        location: undefined,
      }
      const data = yield call(download, { ...newpayload, download: 1 })
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

    *expand({ payload = {} }, { call, put }) {
      const record = JSON.parse(JSON.stringify(payload))
      record.startTime = `${moment(`${record.startTime} 00:00:00`).unix()}000` / 1
      record.endTime = `${moment(`${record.endTime} 23:59:59`).unix()}999` / 1
      const data = yield call(expandQuery, {
        idUser: payload.idUser,
        startTime: record.startTime,
        endTime: record.endTime,
      })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            rowExpandList: data.obj || {},
          },
        })
      } else {
        throw data.mess || '无法跟服务器建立有效连接'
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
