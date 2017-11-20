import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query, create, update, remove, showSiteName } from '../services/blacklists'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'blacklist',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
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

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      console.log('data',data)
      if (data) {  
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

    *create ({ payload }, { call, put }) {
      const newblacklist = {
        idUser: payload.idUser.split('/-/')[1],
        mobile: payload.mobile,
        note: payload.note,
        state: 1
      }
      const data = yield call(create, {state:1,...newblacklist})
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess=="id或手机号已存在"?'您输入输入的手机号已存在':data.mess || data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ blacklist }) => blacklist.currentItem.id)
      const newblacklist = {
        note: payload.note,
        id
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

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload, state:2 })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess=="id或手机号已存在"?'您输入的idUser不存在或者输入的手机号已存在':data.mess || data
      }
    },

    *getSiteName ({}, { call, put }) {
      const data = yield call(showSiteName)
      console.log('data', data)
      if (data.code === 200 && data.obj) {
        let children = []
        for (let i= 0; i < data.obj.length; i++) {
          let item = data.obj[i]
          children.push(<Option key={item.name+'/-/'+item.idUser}>{item.name}</Option>)
        }
        yield put({
          type: 'setSiteName',
          payload: {
            selectSiteName: children
          }
        })
      } else {
        throw data.mess || '无法跟服务器建立有效连接' 
      }
    }

  },

  reducers: {

    setSiteName (state, { payload }) {
      return { ...state, ...payload }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    }

  },
})
