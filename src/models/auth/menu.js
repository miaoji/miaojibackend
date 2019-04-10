import React from 'react'
import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { initialCreateTime } from '../../utils'
import { getMenuByParentId, query, create, update, remove } from '../../services/auth/menu'
import { update as updateAdminMenus } from '../../services/auth/role'
import { pageModel } from '../system/common'

const { Option } = Select
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

const simplifyArray = (data) => {
  let tmpArr = []
  const reduceDimension = (arr) => {
    arr.forEach((i) => {
      tmpArr.push(i)
      if (i.children && i.children.length) {
        reduceDimension(i.children)
      }
    })
  }
  reduceDimension(data)
  return tmpArr.map(item => item.id)
}

export default modelExtend(pageModel, {
  namespace: 'menu',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    modalMenuLevel: 1,
    mpidOption: [],
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
      const data = yield call(query, { parentMenuId: 0, ...payload })
      if (data.code === 200 && data.obj) {
        let list = []
        if (data.obj.length > 0) {
          list = data.obj.map((item) => {
            return reloadItem(item)
          })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 100,
              total: data.total,
            },
          },
        })
      }
    },

    *create({ payload }, { call, put }) {
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
      const data = yield call(update, { ...payload, id })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(remove, [payload])
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.mess === 'id或手机号已存在' ? '您输入的idUser不存在或者输入的手机号已存在' : data.mess || data
      }
    },

    *queryMPidOption({ payload }, { call, put }) {
      const data = yield call(getMenuByParentId, { page: 1, pageSize: 10000, menuLevel: payload.menuLevel })
      if (data.code === 200) {
        const option = data.obj.map((item) => {
          return <Option key={item.id}>{item.menuName}</Option>
        })
        yield put({
          type: 'updateState',
          payload: {
            mpidOption: option,
          },
        })
      }
    },

    *updateAdminOrangeize(_, { call }) {
      const data = yield call(query, { page: 1, pageSize: 10000 })
      if (data.code !== 200) {
        throw data.mess || '更新失败'
      }
      const menus = simplifyArray(data.obj)
      const res = yield call(updateAdminMenus, {
        menuGroup: menus,
        menus: menus.map(i => String(i)),
        id: 1,
      })
      if (res.code === 200) {
        message.success('更新成功')
      } else {
        throw res.mess || '更新失败'
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
