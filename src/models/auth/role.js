import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message } from 'antd'
import { query, create, update, remove, queryMenu } from '../../services/auth/role'
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
  return {
    title: item.menuName,
    key: item.id,
    children: item.children,
  }
}

const handleArrData = ({ list, arr }) => {
  const tmp = []
  list.forEach((item) => {
    const key = item.key
    if (item.children && item.children.length > 0) {
      item.children.forEach((j) => {
        const aa = j.key
        if (arr.indexOf(String(j.key)) >= 0) {
          tmp.push(key.toString())
        }
        if (j.children && j.children.length > 0) {
          j.children.forEach((i) => {
            if (arr.indexOf(String(i.key)) >= 0) {
              tmp.push(key.toString())
              tmp.push(aa.toString())
            }
          })
        }
      })
    }
  })
  return Array.from(new Set([...tmp, ...arr]))
}

export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    menuList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/role') {
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
        throw data.mess || '当前网络无法使用'
      }
    },

    *create({ payload }, { call, put, select }) {
      const menuList = yield select(({ role }) => role.menuList)
      payload.menuGroup = handleArrData({
        list: menuList,
        arr: payload.menus,
      })
      const data = yield call(create, { ...payload })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ role }) => role.currentItem.id)
      const newrole = {
        note: payload.note,
        id,
      }
      const data = yield call(update, newrole)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, [payload])
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *queryMenuList(_, { call, put }) {
      const data = yield call(queryMenu, { parentMenuId: 0, page: 1, pageSize: 10000 })
      if (data.code === 200 && data.obj) {
        let option = []
        if (data.obj instanceof Array) {
          option = data.obj.map((item) => {
            return reloadItem(item)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            menuList: option,
          },
        })
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
