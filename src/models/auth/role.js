import React from 'react'
import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message, Select } from 'antd'
import { query, create, update, remove, queryMenu } from '../../services/auth/role'
import { pageModel } from '../system/common'
import {
  reloadItem, handleArrData, renderTreeNodes,
  filterRoleList, getMenuIds,
} from '../../utils/processing'
import { storage, getUserId } from '../../utils'

const { Option } = Select

export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    menuList: [],
    roleList: [],
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
      if (!storage({ key: 'menuListSpare' })) {
        yield put({
          type: 'queryMenuList',
        })
      }
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

    *create({ payload }, { call, put }) {
      if (!payload.menus || payload.menus === []) {
        message.warn('还没有选择菜单呢')
        return
      }
      // if (!isSuperAdmin()) {
      //   payload.parentRoleId = getRoleId()
      // }
      payload.createUserId = getUserId()
      const storageData = storage({ key: 'menuListSpare' })
      const menuList = JSON.parse(storageData)
      payload.menuGroup = handleArrData({
        list: menuList,
        arr: payload.menus,
      })
      const data = yield call(create, { ...payload, menuGroup: payload.menuGroup.toString() })
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || '当前网络无法使用'
      }
    },

    *update({ payload }, { select, call, put }) {
      const currentItem = yield select(({ role }) => role.currentItem)
      if (payload.menus) {
        const storageData = storage({ key: 'menuListSpare' })
        const menuList = JSON.parse(storageData)
        payload.menuGroup = handleArrData({
          list: menuList,
          arr: payload.menus,
        })
      }
      if (payload.roleId === currentItem.PARENT_ROLE_NAME) {
        delete payload.roleId
      }
      const data = yield call(update, { ...payload, id: currentItem.ID, menuGroup: payload.menuGroup ? payload.menuGroup.toString() : null })
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
        storage({
          type: 'set',
          key: 'menuListSpare',
          val: JSON.stringify([].concat(data.obj)),
        })
        if (process.env.NODE_ENV === 'test') {
          let option = []
          if (data.obj instanceof Array) {
            option = data.obj.map((item) => {
              return reloadItem(item)
            })
            option = renderTreeNodes(option)
          }
          yield put({
            type: 'updateState',
            payload: {
              menuList: option,
            },
          })
        }
      }
    },
    // 获取全部角色信息
    *queryRoleList({ payload = {} }, { call, put }) {
      const data = yield call(query, { page: 1, pageSize: 1000000 })
      let option = []
      if (data.code === 200 && data.obj) {
        const userId = getUserId()
        const list = data.obj.filter(i => (i.ID !== 1 || userId === 1))
        console.log('payload.id', payload.id)
        console.log('payload.parent_id', payload.parent_id)
        if (payload.id) {
          const menus = list.filter(item => item.ID === payload.parent_id)
          console.log('menus', menus)
          yield put({
            type: 'filterRoleList',
            payload: {
              MENU_GROUP_ID: menus[0] ? menus[0].MENU_GROUP_ID : undefined,
            },
          })
        }
        const newdata = list.filter(item => !payload.id || item.ID !== payload.id)
        option = newdata.map((item) => {
          return <Option key={JSON.stringify(item)}>{item.ROLE_NAME}</Option>
        })
        yield put({
          type: 'updateState',
          payload: {
            roleList: option,
          },
        })
      }
    },
    // 手动过滤能显示的菜单信息
    *filterRoleList({ payload = {} }, { put }) {
      console.log('payload', payload)
      const storageData = storage({ key: 'menuListSpare' })
      const menuListSpare = JSON.parse(storageData)
      let menuGroupID = []
      let datalist = []
      // if (!isSuperAdmin()) {
      //   const user = storage({ key: 'user' })
      //   menuGroupID = JSON.parse(user).menuGroupId
      //   if (menuGroupID) {
      //     datalist = filterRoleList([...menuListSpare], menuGroupID.split(','))
      //   }
      // } else {
      menuGroupID = payload.MENU_GROUP_ID
      if (payload && payload.MENU_GROUP_ID) {
        datalist = filterRoleList([...menuListSpare], menuGroupID.split(','))
      } else {
        datalist = [...menuListSpare]
      }
      // }
      const data = [].concat(datalist)
      let option = []
      if (data instanceof Array) {
        option = data.map((item) => {
          return reloadItem(item)
        })
        option = renderTreeNodes(option)
      }
      yield put({
        type: 'updateState',
        payload: {
          menuList: option,
        },
      })
    },

    *updateAdminRole(_, { call, put }) {
      const menusData = yield call(queryMenu, { parentMenuId: 0, page: 1, pageSize: 10000 })
      if (menusData.code === 200) {
        const menuListSpare = getMenuIds(menusData.obj)
        const menus = menuListSpare.map(item => item.toString())
        const menuGroup = menus.toString()
        const data = yield call(update, { id: 1, menuGroup, menus })
        if (data.code === 200) {
          message.success('超级管理员权限已更新')
          yield put({
            type: 'query',
          })
        } else {
          message.warning(`${data.mess} 超级管理员权限更新失败`)
        }
      } else {
        message.warning('菜单信息获取失败,超级管理员权限更新失败')
      }
    },

  },

  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, menuList: [] }
    },

  },
})
