// import React from 'react'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query, create, update, remove } from '../services/storeallot'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'storeallot',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/storeallot') {
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
      // const newPayload = {
      //   // feeType: 1,
      //   // status: 'success',
      //   // startTime: '1486310400000',
      //   // endTime: '1486396800000',
      //   download: 0,
      //   // rownum: 1,
      //   // pagination: 10,
      // }
      const data = yield call(query, { ...payload, download: 0 })
      console.log('data', data)
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
      const newstoreallot = {
        idUser: payload.idUser.split('/-/')[1],
        mobile: payload.mobile,
        note: payload.note,
        state: 1,
      }
      const data = yield call(create, { state: 1, ...newstoreallot })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入输入的手机号已存在' : data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ storeallot }) => storeallot.currentItem.id)
      const newstoreallot = {
        note: payload.note,
        id,
      }
      const data = yield call(update, newstoreallot)
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
      console.log('payload', payload)
      const data = yield call(query, {
        feeType: 1,
        status: 'success',
        startTime: '1486310400000',
        endTime: '1486396800000',
        download: 1,
        rownum: 1,
        pagination: 10,
      })
      console.log('data', data)
      if (data.code === 200 && data.obj) {
        console.log('数据正在请求下载')
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
