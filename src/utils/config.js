const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = 'http://192.168.0.180:8080/quandiExpressSiteManager'

module.exports = {
  name: '妙寄后台管理系统',
  prefix: '妙寄后台',
  footerText: '妙寄 后台 © 2017 圈嘀科技',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    wxuser: `${APIV1}/wxuser/:id`,
    wxusers: `${APIV1}/wxusers`,
    storeuser: `${APIV1}/storeuser/:id`,
    
//  storeusers: `${APIV1}/storeusers`,
    storeusers: `${APIV3}/storebean`,
    
    message: `${APIV1}/message/:id`,
    messages: `${APIV1}/messages`,
    communications: `${APIV1}/communications`,
    
    checkbooks: `${APIV1}/checkbooks`,
    income: `${APIV1}/income`,
    expend: `${APIV1}/expend`,
    
    expressitems: `${APIV1}/expressitems`,
    normal: `${APIV1}/normal`,
    collect: `${APIV1}/collect`,
    collection: `${APIV1}/collection`,
    
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    
//  topups: `${APIV1}/topups`,
    topups: `${APIV3}/rechargeRecord`,
    
//  withdraws: `${APIV1}/withdraws`,
    withdraws: `${APIV3}/extractionamount`,
    
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
