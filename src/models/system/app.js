import React from 'react'
import { routerRedux } from 'dva/router'
import config from 'config'
import menus from 'utils/menus'
import hideMenus from 'utils/hideMenus'
import { storage } from 'utils'
import { Select } from 'antd'
import { query as queryStoreUser } from 'src/services/storeuser'
import { rebuildMenuData } from 'src/utils/processing'

const { prefix } = config
const { Option } = Select

export default {
  namespace: 'app',
  state: {
    storeuserList: [],
    storeuserArr: [],
    storeTotal: 0,
    user: {},
    permissions: {
      visit: [],
    },
    message: [],
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
      let user = null
      try {
        user = JSON.parse(userInfo)
      } catch (e) {
        user = null
      }
      if (user && loginTime <= 21600000) {
        yield put({
          type: 'queryStoreUser',
        })

        if (process.env.NODE_ENV === 'development') {
          // console.log('App-userInfo', user)
        }
        let menuList = user.userMenus

        if (user.userId === 98) {
          // if (user.userId === 1) {
          hideMenus.push({
            id: '1111',
            mpid: 1,
            name: '环迅账号管理',
            icon: 'message',
            route: '/bankcard',
          })
        }
        let list = menus
        if (process.env.NODE_ENV !== 'text') {
          list = [...rebuildMenuData(menuList), ...hideMenus]
        }
        let permissions = {}
        permissions.role = 'admin'
        let menu = list
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
          storage({ type: 'clear' })
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    *logout(_, { put }) {
      storage({ type: 'clear' })
      yield put({ type: 'query' })
    },

    *changeNavbar(_, { put, select }) {
      const { app } = yield select(e => e)
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

    *queryStoreUser(_, { call, put }) {
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
        if (data.total > 336) {
          console.info('消息通知', `新增了${data.total - 336}个新用户,请进行机构的分配`)
        }
        const storeuserArr = data.obj.map(item => ({
          key: item.id,
          text: `${item.id}-${item.name}-${item.province || ''}${item.city || ''}${item.district || ''}`,
        }))
        yield put({
          type: 'updateState',
          payload: {
            storeuserList: option,
            storeTotal: data.total,
            storeuserArr,
          },
        })
        storage({
          type: 'set',
          key: 'storeuserArr',
          val: JSON.stringify(data.obj.map(item => ({ idUser: item.id, address: `${item.province}/${item.city}/${item.district}` }))),
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
