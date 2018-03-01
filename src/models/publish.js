import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create } from '../services/publish'
import { pageModel } from './common'
import { storage } from '../utils'

export default modelExtend(pageModel, {
  namespace: 'publish',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/publish') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { put }) {
      yield put({
        type: 'querySuccess',
        payload: {
          list: ''
        },
      })
    },

    *create({ payload }, { call }) {
      if (payload.title === '') {
        message.warning('请输入文章标题')
        return
      }
      if (payload.contant === '') {
        message.warning('正文不能为空')
        return
      }
      payload.contant = payload.contant.replace('+','%2b')
      const createId = JSON.parse(storage({ key: 'user' })).userId
      const data = yield call(create, { ...payload, createId })
      if (data.code === 200) {
        message.success('文章发布成功')
        window.alert('文章发布成功')
        location.reload()
      } else {
        throw '网络故障，请稍后重试' || data.mess
      }
    }

  },

  reducers: {

    setStates(state, { payload }) {
      return { ...state, ...payload }
    }

  }
})
