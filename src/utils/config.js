const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = 'http://192.168.0.111:8080/quandiExpressSiteManager'

module.exports = {
  name: '妙寄后台管理系统',
  prefix: '妙寄后台',
  footerText: '妙寄 后台 © 2017 圈嘀科技',
  localPrefix: 'maiojipc_',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    // userLogin: `${APIV1}/user/login`,
    userLogin: `${APIV3}/signIn`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    wxuser: `${APIV1}/wxuser/:id`,
    
    // wxusers: `${APIV1}/wxusers`,
    wxusers: `${APIV3}/wechatuser`,//微信用户
    
    storeuser: `${APIV1}/storeuser/:id`,
    
    // storeusers: `${APIV1}/storeusers`,
    storeusers: `${APIV3}/storebean`,//门店用户
    
    message: `${APIV1}/message/:id`,
    messages: `${APIV1}/messages`,

    //通信数据
    // communications: `${APIV1}/communications`,
    communications: `${APIV3}/communicationdata`,
    
    checkbooks: `${APIV1}/checkbooks`,

    //收入
    // income: `${APIV1}/income`,
    income: `${APIV3}/income`,

    //支出
    // expend: `${APIV1}/expend`,
    expend: `${APIV3}/expenditure`,
    
    // expressitems: `${APIV1}/expressitems`,
    //普通件
    // normal: `${APIV1}/normal`,
    normal: `${APIV3}/regularMail?expresstype=0`,
    //到付件
    // collect: `${APIV1}/collect`,
    collect: `${APIV3}/regularMail?expresstype=1`,
    //代收件
    // collection: `${APIV1}/collection`,
    collection: `${APIV3}/regularMail?expresstype=2`,
    
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    
//  topups: `${APIV1}/topups`,
    topups: `${APIV3}/rechargeRecord`,//充值记录
    
//  withdraws: `${APIV1}/withdraws`,
    withdraws: `${APIV3}/extractionamount`,//提现记录
    
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
