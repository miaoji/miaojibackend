import { querydetail } from '../qr/service'
import { queryURL } from '../../utils'

export default {

  namespace: 'qrDetail',

  state: {
    name: '',
    ticket: '',
    parameter: '',
    remark: '',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/qrdetail') {
          const name = queryURL('name')
          const ticket = queryURL('ticket')
          const parameter = queryURL('parameter')
          const remark = queryURL('remark')
          dispatch({ type: 'querySuccess',
            payload: {
              name,
              ticket,
              parameter,
              remark,
            },
          })
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(querydetail, payload)
      const { code, obj, mess } = data
      if (code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: obj,
          },
        })
      } else {
        throw mess
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
