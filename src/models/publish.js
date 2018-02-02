import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create } from '../services/publish'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'publish',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    // setup ({ dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/publish') {
    //       dispatch({
    //         type: 'query',
    //         payload: location.query,
    //       })
    //     }
    //   })
    // },
  },

  effects: {

    *create() {
      location.reload()
    }

  },

  reducers: {

    setStates(state, { payload }) {
      return { ...state, ...payload }
    }

  }
})
