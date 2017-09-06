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
//      {
//        path: 'checkbook',
//        getComponent (nextState, cb) {
//          require.ensure([], require => {
//            registerModel(app, require('./models/checkbook'))
//            cb(null, require('./routes/checkbook'))
//          }, 'checkbook')
//        }
//      }, 
        {
          path: 'income',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/income'))
              cb(null, require('./routes/income'))
            }, 'income')
          }
        },
        {
          path: 'expend',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/expend'))
              cb(null, require('./routes/expend'))
            }, 'expend')
          }
        },
//      {
//        path: 'expressitem',
//        getComponent (nextState, cb) {
//          require.ensure([], require => {
//            registerModel(app, require('./models/expressitem'))
//            cb(null, require('./routes/expressitem'))
//          }, 'expressitem')
//        }
//      }, 
        {
          path: 'normal',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/normal'))
              cb(null, require('./routes/normal'))
            }, 'normal')
          }
        }, 
        {
          path: 'collect',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/collect'))
              cb(null, require('./routes/collect'))
            }, 'collect')
          }
        }, 
        {
          path: 'collection',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/collection'))
              cb(null, require('./routes/collection'))
            }, 'collection')
          }
        }, 
        
        
        
        {
          path: 'topups',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/topup'))
              cb(null, require('./routes/wallet/topup'))
            }, 'topups')
          }
        }, {
          path: 'withdraws',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/withdraw'))
              cb(null, require('./routes/wallet/withdraw'))
            }, 'withdraws')
          }
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
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
