// import React from 'react'
import modelExtend from 'dva-model-extend'
import { message, notification } from 'antd'
import { query, downLoad, create, update, remove } from '../services/storeordertotal'
import { pageModel } from './common'
import { config, time } from '../utils'

const { APIV3 } = config

export default modelExtend(pageModel, {
  namespace: 'storeordertotal',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/storeordertotal') {
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
      if (!payload.startTime) {
        message.info('默认查询昨日一天的数据')
      }
      const times = time.yesterTime()
      const data = yield call(query, { ...times, ...payload, download: 0 })
      // const data = yield call(query, { ...payload, download: 0 })
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

    *create({ payload }, { call, put }) {
      const newstoreordertotal = {
        idUser: payload.idUser.split('/-/')[1],
        mobile: payload.mobile,
        note: payload.note,
        state: 1,
      }
      const data = yield call(create, { state: 1, ...newstoreordertotal })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入输入的手机号已存在' : data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ storeordertotal }) => storeordertotal.currentItem.id)
      const newstoreordertotal = {
        note: payload.note,
        id,
      }
      const data = yield call(update, newstoreordertotal)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *'delete'({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload, state: 2 })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入的idUser不存在或者输入的手机号已存在' : data.mess || data
      }
    },

    *download({ payload }, { call }) {
      notification.success({
        message: '下载中...',
        description: '正在为您准备资源,请稍等!!!',
        duration: 0
      })
      if (!payload.startTime) {
        message.info('默认下载昨天一天的数据')
      }
      const times = time.yesterTime()
      const data = yield call(downLoad, { ...times, ...payload, download: 1 })
      if (data.code === 200 && data.obj) {
        const url = data.obj
        const sssss = window.open(`${APIV3}${url}`)
        if (sssss === null) {
          notification.warn({
            message: '下载失败',
            description: '请关闭浏览阻止网页弹窗的功能!!!',
            duration: 0
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
