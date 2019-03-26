import modelExtend from 'dva-model-extend'
import { initialCreateTime, APIV3, storage } from 'utils'
import { message, notification } from 'antd'
import { query, create, update, remove, download } from '../services/blacklist'
import { pageModel } from './system/common'


export default modelExtend(pageModel, {
  namespace: 'blacklist',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/blacklist') {
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
      payload.name ? payload.name = payload.name.split('///')[1] : undefined
      const data = yield call(query, payload)
      if (data) {
        const storeuserArr = storage({ key: 'storeuserArr', json: true })
        const list = data.obj.map((i) => {
          const itemInfo = storeuserArr.find(k => +i.idUser && +i.idUser === k.idUser) || {}
          return {
            ...i,
            address: itemInfo.address,
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
      }
    },

    *create({ payload }, { call, put }) {
      const newblacklist = {
        idUser: payload.idUser.split('///')[0],
        mobile: payload.mobile,
        note: payload.note,
        state: 1,
      }
      const data = yield call(create, { state: 1, ...newblacklist })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入输入的手机号已存在' : data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ blacklist }) => blacklist.currentItem.id)
      const newblacklist = {
        note: payload.note,
        id,
      }
      const data = yield call(update, newblacklist)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload, state: 2 })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入的idUser不存在或者输入的手机号已存在' : data.mess || data
      }
    },

    *export({ payload = {} }, { call }) {
      payload = initialCreateTime(payload)
      payload.name ? payload.name = payload.name.split('///')[1] : undefined
      const data = yield call(download, { ...payload, downLoad: 1 })
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
