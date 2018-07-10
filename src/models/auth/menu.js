import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message } from 'antd'
import { query, create, update, remove } from '../../services/auth/menu'
import { pageModel } from '../system/common'

const reloadItem = (item) => {
  if (item.children && item.children.length === 0) {
    delete item.children
  }
  if (item.children && item.children.length > 0) {
    item.children = item.children.map((items) => {
      return reloadItem(items)
    })
  }
  return item
}

export default modelExtend(pageModel, {
  namespace: 'menu',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/menu') {
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
      const data = yield call(query, payload)
      if (data) {
        data.obj.map((item) => {
          return reloadItem(item)
        })
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
      // const newmenu = {
      //   idUser: payload.idUser.split('/-/')[1],
      //   mobile: payload.mobile,
      //   note: payload.note,
      //   state: 1,
      // }
      console.log('payload', payload)
      const data = yield call(create, { ...payload })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入输入的手机号已存在' : data.mess || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ menu }) => menu.currentItem.id)
      const newmenu = {
        note: payload.note,
        id,
      }
      const data = yield call(update, newmenu)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入的idUser不存在或者输入的手机号已存在' : data.mess || data
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
