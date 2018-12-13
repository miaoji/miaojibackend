import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { config, initialCreateTime } from '../utils'
import { query, updateFee, versionswitch, createAccount } from '../services/storeuser'
import { pageModel } from './system/common'
import { locationData } from '../utils/locationData'
import { query as queryOrgList } from '../services/auth/org'
import orgToTree from '../utils/orgToTree'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'storeuser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    expandedRowKeys: [],
    columnslist: [],
    sonlist: [],
    orgTree: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    locationData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/storeuser') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    /**
     * [获取门店用户列表数据]
     */
    *query({ payload = {} }, { call, put }) {
      payload = initialCreateTime(payload)
      if (payload.name) {
        payload.name = payload.name.split('///')[1]
      }
      const data = yield call(query, { ...payload })
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
      }
    },
    /**
     * [修改通讯费]
     */
    *update({ payload }, { call, put, select }) {
      payload.id = yield select(({ storeuser }) => storeuser.currentItem.id)

      const data = yield call(updateFee, payload)
      if (data.code === 200) {
        message.success('更新成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        message.success(data.mess || '网络错误')
      }
    },
    /**
     * [版本切换]
     */
    *versionswitch({ payload }, { call, put, select }) {
      payload.id = yield select(({ storeuser }) => storeuser.currentItem.id)

      const data = yield call(versionswitch, payload)

      if (data.code === 200) {
        message.success('切换成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        message.success(data.mess || '网络错误')
      }
    },
    /**
     * [创建门店用户]
     */
    *create({ payload }, { call, put }) {
      const { location } = payload
      const locationId = location[2].split('-')[0]
      // 根据地址判断 dataSource
      const getdataSourceBylocation = (prov) => {
        let dataSource = '3'
        if (prov === '上海' || prov === '广东') {
          dataSource = '1'
        } else if (prov === '山西') {
          dataSource = '2'
        } else {
          dataSource = '3'
        }
        return dataSource
      }
      const province = location[0].split('-')[1]
      const dataSource = getdataSourceBylocation(province)

      // payload.org = payload.org.map(item => item.split('-')[0])

      let registData = {
        org: payload.org,
        mobile: payload.mobile,
        name: payload.name,
        password: payload.password,
        locationId,
        dataSource,
        street: payload.street,
        description: payload.description,
        isBeta: payload.isBeta,
      }
      const param = {
        param: JSON.stringify(registData),
      }
      const data = yield call(createAccount, param)
      if (data.code === 200) {
        message.success('创建成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        message.success(data.mess || '网络错误')
      }
    },
    /**
     * [处理location数据为antd级联控件格式]
     */
    *handleLocation(_, { put }) {
      const data = locationData
      let level1 = []
      let level2 = []
      let level3 = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        const level = element.level
        let item = {
          value: `${element.code}-${element.name}`,
          label: element.name,
          code: element.code,
          parentcode: element.parent_code,
          parentlevel: element.parent_level,
        }
        switch (level) {
          case '1':
            level1.push(item)
            break
          case '2':
            level2.push(item)
            break
          case '3':
            level3.push(item)
            break
          default:
            level3.push(item)
            break
        }
      }
      function handleLevel(elem1, elem2) {
        let newElem = []
        for (let i = 0; i < elem1.length; i++) {
          const item = elem1[i]
          const code = item.code
          let children = []
          for (let j = 0; j < elem2.length; j++) {
            const iitem = elem2[j]
            const parentCode = iitem.parentcode
            if (parentCode === code) {
              children.push(iitem)
            }
          }
          item.children = children
          newElem.push(item)
        }
        return newElem
      }
      let newLevel2 = handleLevel(level2, level3)
      let newLevel1 = handleLevel(level1, newLevel2)
      yield put({
        type: 'putLocation',
        payload: {
          locationData: newLevel1,
        },
      })
    },

    /**
     * [根据主账号查询子账号]
     */
    *unfold({ payload }, { call, put }) {
      const data = yield call(query, { ...payload, page: 1, pageSize: 10000 })
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            sonlist: data.obj || [],
            expandedRowKeys: [payload.superId],
          },
        })
      } else {
        message.success(data.mess || '网络错误')
      }
    },
    /**
     * [获取机构基础数据]
     */
    *getOrgList(_, { call, put }) {
      const data = yield call(queryOrgList, { page: 1, pageSize: 10000 })
      console.log('data', data)
      if (data.code === 200) {
        const orgTree = orgToTree(data.obj)
        console.log('orgTree', orgTree)
        yield put({
          type: 'updateState',
          payload: {
            orgTree,
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

    putLocation(state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
