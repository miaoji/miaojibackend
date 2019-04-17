import React from 'react'
import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { storage } from 'utils'
import { create } from 'src/services/publish'
import { query } from 'src/services/storeuser'
import { pageModel } from './system/common'

const { Option } = Select
export default modelExtend(pageModel, {
  namespace: 'publish',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    typeOption: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/publish') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },

  effects: {

    * query(_, { call, put }) {
      const data = yield call(query, {
        page: 1,
        pageSize: 10000,
      })
      if (data.code === 200) {
        const option = data.obj.map((item) => {
          if (!item.name) {
            return false
          }
          const val = `${item.id}///${item.name}`
          return <Option key={val}>{`${item.id}-${item.name}`}</Option>
        })
        yield put({
          type: 'setStates',
          payload: {
            typeOption: option,
          },
        })
      }
    },

    * create({ payload }, { call }) {
      if (payload.title === '') {
        message.warning('请输入文章标题')
        return
      }
      if (payload.contant === '') {
        message.warning('正文不能为空')
        return
      }
      if (payload.receiveId !== '0') {
        payload.receiveId = payload.receiveId.split('///')[0]
      }
      payload.contant = payload.contant.replace('+', '%2b')
      const createId = JSON.parse(storage({ key: 'user' })).userId
      const data = yield call(create, { ...payload, createId })
      if (data.code === 200) {
        message.success('文章发布成功')
        /* eslint no-alert: 'off' */
        window.alert('文章发布成功')
        location.reload()
      } else {
        throw '网络故障，请稍后重试' || data.mess
      }
    },

  },

  reducers: {

    setStates(state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
