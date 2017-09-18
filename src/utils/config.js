const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
// const APIV3 = 'http://192.168.1.106:8080/quandiExpressSiteManager'
//线上
const APIV3 = 'http://app.quandikeji.com:8288/quandiExpressSiteManager'

module.exports = {
  name: '妙寄后台管理系统',
  prefix: '妙寄后台',
  footerText: '妙寄 后台 © 2017 圈嘀科技',
  localPrefix: 'miaojipc_',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV3}/signIn`,//登陆
    userLogout: `${APIV1}/user/logout`,//登出
    
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,

    wxuser: `${APIV3}/received`,//微信用户明细
    wxusers: `${APIV3}/wechatuser`,//微信用户
    
    storeuser: `${APIV1}/storeuser/:id`,//门店用户明细
    storeusers: `${APIV3}/storebean`,//门店用户
    
    message: `${APIV1}/message/:id`,
    messages: `${APIV1}/messages`,
    communications: `${APIV3}/communicationdata`,//通信数据
    
    checkbooks: `${APIV1}/checkbooks`,

    income: `${APIV3}/income`,//收入
    expend: `${APIV3}/expenditure`,//支出
    normal: `${APIV3}/regularMail?expresstype=0`,//普通件
    collect: `${APIV3}/regularMail?expresstype=1`,//到付件
    collection: `${APIV3}/regularMail?expresstype=2`,//代收件
    
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    
    topups: `${APIV3}/rechargeRecord`,//充值记录
    withdraws: `${APIV3}/extractionamount`,//提现记录
    
    orders: `${APIV3}/expressStatus`,//
    order: `${APIV3}/expressStatus`,

    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
