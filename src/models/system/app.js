import React from 'react'
import { routerRedux } from 'dva/router'
// import { parse } from 'qs'
import config from 'config'
// import { EnumRoleType } from 'enums'
import menus from 'utils/menus'
import hideMenus from 'utils/hideMenus'
import { storage } from 'utils'
import { Select } from 'antd'
// import { query, logout } from '../services/system/app'
import { query as queryStoreUser } from 'src/services/storeuser'
import { rebuildMenuData } from 'src/utils/processing'

const { prefix } = config
const { Option } = Select

export default {
  namespace: 'app',
  state: {
    storeuserList: [],
    user: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    *query(_, { put }) {
      const loginTime = new Date().getTime() - storage({ key: 'loginTime' })
      const userInfo = storage({ key: 'user' })
      if (userInfo && loginTime <= 21600000) {
        yield put({
          type: 'queryStoreUser',
        })
        const user = JSON.parse(userInfo)
        const menuList = user.menuList
        let list = menus
        if (process.env.NODE_ENV === 'development1') {
          list = [...rebuildMenuData(menuList), ...hideMenus]
        }
        // const { permissions } = user
        let permissions = {}
        permissions.role = 'admin'
        let menu = list
        // if (permissions.role === EnumRoleType.ADMIN || permissions.role === EnumRoleType.DEVELOPER) {
        if (permissions) {
          permissions.visit = list.map(item => item.id)
        } else {
          menu = list.filter((item) => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(e => e)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        /* eslint no-lonely-if: "off" */
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    * logout(_, { put }) {
      window.localStorage.clear()
      yield put({ type: 'query' })
    },

    * changeNavbar(_, { put, select }) {
      const { app } = yield select(e => e)
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

    * queryStoreUser(_, { call, put }) {
      const data = yield call(queryStoreUser, {
        current: 1,
        pageSize: 10000,
      })
      if (data.code === 200 && data.obj) {
        const option = data.obj.map((item) => {
          if (!item.name) {
            return false
          }
          const val = `${item.id}///${item.name}`
          return <Option key={val}>{`${item.id}-${item.name}`}</Option>
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

  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
