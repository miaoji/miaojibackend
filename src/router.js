import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/detail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        }, {
          path: 'wxuser',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser'))
              cb(null, require('./routes/wxuser/'))
            }, 'wxuser')
          },
        }, {
          path: 'wxuserdetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser/detail'))
              cb(null, require('./routes/wxuser/detail/'))
            }, 'wxuser-detail')
          },
        }, {
          path: 'storeuser',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeuser'))
              cb(null, require('./routes/storeuser/'))
            }, 'storeuser')
          },
        }, {
          path: 'storeuser/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeuser/detail'))
              cb(null, require('./routes/storeuser/detail/'))
            }, 'storeuser-detail')
          },
        }, {
          path: 'message',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/message'))
              cb(null, require('./routes/message/'))
            }, 'message')
          },
        }, {
          path: 'message/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/message/detail'))
              cb(null, require('./routes/message/detail/'))
            }, 'message-detail')
          },
        }, {
          path: 'communication',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/communication'))
              cb(null, require('./routes/communication/'))
            }, 'communication')
          },
        },
        {
          path: 'income',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/income'))
              cb(null, require('./routes/income'))
            }, 'income')
          },
        },
        {
          path: 'expend',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/expend'))
              cb(null, require('./routes/expend'))
            }, 'expend')
          },
        },
        {
          path: 'normal',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/normal'))
              cb(null, require('./routes/normal'))
            }, 'normal')
          },
        },
        {
          path: 'collect',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/collect'))
              cb(null, require('./routes/collect'))
            }, 'collect')
          },
        },
        {
          path: 'collection',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/collection'))
              cb(null, require('./routes/collection'))
            }, 'collection')
          },
        },
        {
          path: 'topups',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/topup'))
              cb(null, require('./routes/wallet/topup'))
            }, 'topups')
          },
        }, {
          path: 'withdraws',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/withdraw'))
              cb(null, require('./routes/wallet/withdraw'))
            }, 'withdraws')
          },
        }, {
          path: 'order',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order/'))
            }, 'order')
          },
        }, {
          path: 'consume',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/consume'))
              cb(null, require('./routes/consume/'))
            }, 'consume')
          },
        }, {
          path: 'qr',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/qr'))
              cb(null, require('./routes/qr/'))
            }, 'qr')
          },
        }, {
          path: 'qrdetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/qr/detail'))
              cb(null, require('./routes/qr/detail'))
            }, 'qr-detail')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'blacklist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/blacklist'))
              cb(null, require('./routes/blacklist/'))
            }, 'blacklist')
          },
        }, {
          path: 'mailprice',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/mailprice'))
              cb(null, require('./routes/mailprice/'))
            }, 'mailprice')
          },
        }, {
          path: 'storeordertotal',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeordertotal'))
              cb(null, require('./routes/storeordertotal/'))
            }, 'storeordertotal')
          },
        }, {
          path: 'storeorderinfo',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeorderinfo'))
              cb(null, require('./routes/storeorderinfo/'))
            }, 'storeorderinfo')
          },
        }, {
          path: 'storeallot',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/storeallot'))
              cb(null, require('./routes/storeallot/'))
            }, 'storeallot')
          },
        }, {
          path: 'ordernumber',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/ordernumber'))
              cb(null, require('./routes/ordernumber/'))
            }, 'ordernumber')
          },
        }, {
          path: 'publish',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/publish'))
              cb(null, require('./routes/publish/'))
            }, 'publish')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
