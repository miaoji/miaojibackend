import React from 'react'
import modelExtend from 'dva-model-extend'
import { initialCreateTime } from 'utils'
import { message, Select } from 'antd'
import { query as queryStoreUser } from '../../services/storeuser'
import { query, create, update, remove, getLocation, getIdUsers } from '../../services/auth/org'
import { query as queryRoleList } from '../../services/auth/role'
import { pageModel } from '../system/common'
import { editLocation } from '../../utils/processing'

const { Option } = Select

export default modelExtend(pageModel, {
  namespace: 'org',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    storeuserList: [],
    roleList: [],
    orgIdusers: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/org') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put, select }) {
      const locationList = yield select(({ org }) => org.locationList)
      if (!locationList) {
        yield put({
          type: 'filterLocationList',
          payload: {
            locationType: payload.locationType || 1,
          },
        })
      }
      payload = initialCreateTime(payload)
      const data = yield call(query, { ...payload })
      if (data.code === 200 && data.obj) {
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
      payload.idUsers = payload.idUsers.toString()
      payload.location = payload.location.toString()
      payload.roleId = Number(payload.roleId)
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
      const currentItem = yield select(({ org }) => org.currentItem)
      payload.idUsers = payload.idUsers.toString()
      payload.location = payload.location.toString()
      if (payload.roleId === currentItem.roleName) {
        delete payload.roleId
      } else {
        payload.roleId = Number(payload.roleId)
      }
      const data = yield call(update, { ...payload, id: currentItem.id })
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

    *queryStoreUser(_, { call, put }) {
      const data = yield call(queryStoreUser, {
        current: 1,
        pageSize: 10000,
      })
      if (data.code === 200 && data.obj) {
        const option = []
        data.obj.forEach((item) => {
          if (!item.name) {
            return false
          }
          option.push(<Option key={item.id} value={item.id}>{item.name}</Option>)
          return false
        })
        yield put({
          type: 'updateState',
          payload: {
            storeuserList: option,
          },
        })
      } else {
        throw '网络故障，请稍后重试' || data.mess
      }
    },

    *queryRoleList(_, { call, put }) {
      const data = yield call(queryRoleList, { page: 1, pageSize: 1000000 })
      if (data.code === 200 && data.obj) {
        const option = data.obj.map((item) => {
          return <Option key={item.ID}>{item.ROLE_NAME}</Option>
        })
        yield put({
          type: 'updateState',
          payload: {
            roleList: option,
          },
        })
      }
    },

    *queryLocation(_, { call, put }) {
      const data = yield call(getLocation)
      let option = []
      if (data.code === 200 && data.obj) {
        option = data.obj.map((item) => {
          return editLocation(item)
        })
        yield put({
          type: 'updateState',
          payload: {
            locationList: option,
          },
        })
      }
    },

    *getIdUsers({ payload }, { call, put, select }) {
      let data = {}
      console.log('payload111', payload)
      switch (payload.location.length) {
        case 1:
          console.log(1)
          data = yield call(getIdUsers, { province: payload.location[0] })
          break
        case 2:
          console.log(2)
          data = yield call(getIdUsers, { city: payload.location[1] })
          break
        case 3:
          console.log(3)
          data = yield call(getIdUsers, { idLocation: payload.location[2].split('///')[1] })
          break
        default:
          console.log(4)
          break
      }
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            orgIdusers: data.obj,
          },
        })
      } else if (data.code === 500 && data.mess === '未查询到信息') {
        const currentItem = yield select(({ org }) => org.currentItem)
        yield put({
          type: 'updateState',
          payload: {
            currentItem: { ...currentItem, idUsers: '' },
            orgIdusers: [],
          },
        })
      } else {
        throw data.mess || '当前网络异常'
      }
    },

    *filterLocationList({ payload }, { call, put }) {
      const data = yield call(getLocation)
      let option = []
      if (data.code === 200 && data.obj) {
        option = data.obj.map((item) => {
          // 第一层
          if (item.children && item.children.length === 0) {
            delete item.children
          }
          if (item.children && item.children.length > 0 && payload.locationType >= 2) {
            item.children = item.children.map((i) => {
              // 第二层
              if (i.children && i.children.length === 0) {
                delete i.children
              }
              if (i.children && i.children.length > 0 && payload.locationType === 3) {
                i.children = i.children.map((j) => {
                  // 第三层
                  if (j.children && j.children.length === 0) {
                    delete j.children
                  }
                  return {
                    value: j.name || j.province || j.city || `${j.district}///${j.id}`,
                    label: j.name || j.province || j.city || j.district,
                    children: j.children,
                  }
                })
              } else {
                delete i.children
              }
              return {
                value: i.name || i.province || i.city || `${i.district}///${i.id}`,
                label: i.name || i.province || i.city || i.district,
                children: i.children,
              }
            })
          } else {
            delete item.children
          }
          return {
            value: item.name || item.province || item.city || `${item.district}///${item.id}`,
            label: item.name || item.province || item.city || item.district,
            children: item.children,
          }
        })
        yield put({
          type: 'updateState',
          payload: {
            locationList: option,
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
