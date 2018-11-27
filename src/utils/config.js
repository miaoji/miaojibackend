const APIV1 = 'http://127.0.0.1:8000/api/v1'
// const APIV2 = '/api/v2'

let APIV3

// 线上
// 旧版
// APIV3 = 'http://app.quandikeji.com:8288'
// 新版
APIV3 = 'http://106.14.212.146:8288/quandiExpressSiteManager'

// 山东服务器
// APIV3 = 'http://117.50.23.22:8080'

// 吴聪
// APIV3 = 'http://47.101.42.216:8088'

// 刘思远
// APIV3 = 'http://192.168.126.1:8081'

// 张涛
// APIV3 = 'http://192.168.231.239:8077'

// 石金磊
APIV3 = 'http://192.168.231.125:80'


// 生产环境时api固定为线上url
// if (process.env.NODE_ENV !== 'development') {
//   APIV3 = 'http://106.14.212.146:8288'
// }

let APIV4 = 'http://app.quandikeji.com/WeChatService'

module.exports = {
  APIV3,
  name: '妙寄后台管理系统',
  prefix: 'antdAdmin',
  localPrefix: 'miaojipc_',
  footerText: '妙寄后台 © 2018 妙寄科技',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: {
      // login: `${APIV3}/signIn`,
      login: `${APIV3}/selectRoleByUserId`,
      getMenus: `${APIV3}/selectRoleByUserId`,
    },
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    dashboard: {
      // 获取折线图数据
      echart: `${APIV3}/lineChart`,
      // 获取微信用户数据
      weChatUser: `${APIV3}/homePageWechatUserTotal`,
      // 获取门店总数
      storeTotal: `${APIV3}/selectHomeSiteTotal`,
      // 昨日收入
      income: `${APIV3}/homePageYesterdayInCome`,
      // 获取设备数量
      terminalTotal: `${APIV3}/homePageStoreTotal`,
    },
    menus: `${APIV1}/menus`,
    wxuser: {
      list: `${APIV3}/wechatuser`, // 微信用户分页
      getById: `${APIV3}/received`, // 微信用户详细信息(没有的接口)
    },
    storeuser: {
      list: `${APIV3}/store`, // 门店用户
      updateFee: `${APIV3}/updateFee`, // 修改门店用户通讯费
      versionswitch: `${APIV3}/updateVersion`, // app版本切换
    },
    articles: {
      list: `${APIV3}/selectCollection`, // 文章分页数据
      publish: {
        upload: `${APIV3}/upload`, // 图片上传接口
        send: `${APIV3}/insertreleaseArticle`, // 文章发布接口
      },
    },
    storedata: { // 收支数据
      income: {
        list: `${APIV3}/income`, // 收入数据
      },
      expend: {
        list: `${APIV3}/expenditure`, // 支出数据
      },
    },
    wallet: {
      topup: {
        list: `${APIV3}/rechargeRecord`, // 充值记录
      },
      withdraw: {
        list: `${APIV3}/extractionamount`, // 提现记录
      },
    },
    order: {
      list: `${APIV3}/waybillStatus`, // 运单管理
    },
    qr: { // 二维码推广接口
      create: `${APIV4}/api/qr/createQr`,
      all: `${APIV4}/api/qr/getQrAll`,
      show: `${APIV4}/api/selectQrById`,
      update: `${APIV4}/api/qr/modWxQrById`,
      del: `${APIV4}/api/delQrById`,
    },
    consume: {
      list: `${APIV3}/paymentOrder`, // 充值消费
    },
    blacklist: {
      all: `${APIV3}/blackList`, // 黑名单
      add: `${APIV3}/insertBlackList`,
      update: `${APIV3}/updateBlackList`,
    },
    // 单号规则配置
    ordernumber: {
      index: `${APIV3}/selectorderNumber`,
      create: `${APIV3}/insertOrderNumber`,
      update: `${APIV3}/updateOrderNumber`,
      showBrandName: `${APIV3}/selectBrandId`,
    },
    // 京东配置 接口
    jd: {
      // 查询单号池剩余单量
      findOrderSheetCount: `${APIV3}/order/findOrderSheetCount`,
      // 批量填充单号池
      orderSheet: `${APIV3}/order/orderSheet`,
      // 设置京东分成比例
      setJDConfig: `${APIV3}/order/setJDConfig`,
      // 获取京东分成比例
      getJDConfig: `${APIV3}/order/getJDConfig`,
    },
    // 黑名单详情
    backlistdetail: {
      all: `${APIV3}/blackListdetails`,
    },
    // 门店支付寄件汇总
    sendtotal: {
      all: `${APIV3}/orderState`,
    },
    // 查询寄件及金额
    mailprice: {
      all: `${APIV3}/mailprice`,
    },
    // 门店寄件金额
    expressfee: {
      all: `${APIV3}/selectStorePrice`,
    },
    // 门店单号汇总
    expressfeedetail: {
      all: `${APIV3}/selectPayType`,
      download: `${APIV3}/selectMailddownload`,
    },
    // 操作人寄件总金额
    storeUserDetail: {
      all: `${APIV3}/selectrealName`,
    },
    // 门店点单上架分派签收
    business: {
      all: `${APIV3}/selectdsfq`,
    },
    // 根据站点名查询站点下操作人寄件汇总
    operatorbyname: {
      all: `${APIV3}/selectRealNamedsfq`,
    },
    // 根据操作人姓名查询门店单号汇总
    orderbyuser: {
      all: `${APIV3}/selectRealNamedsfqDetails`,
    },
    // 门店派件金额
    assignFee: {
      all: `${APIV3}/selectpjjetotal`,
    },
    // 操作人派件金额
    operatorAssignFee: {
      all: `${APIV3}/selectpjjeDetails`,
    },
    // 门店签收信息汇总
    storeSign: {
      all: `${APIV3}/SignRate`,
    },
    // 门店分派
    selectfenpai: {
      all: `${APIV3}/selectfenpai`,
    },
    // 门店分派-操作人详情
    selectpjjeDetails: {
      all: `${APIV3}/selectfenpaipDetails`,
    },
    // 异常件页面
    problem: {
      all: `${APIV3}/selectProblemPartsCount`,
      gitBrandByIdUser: `${APIV3}/selectProblemPartsByBrand`,
    },
    // 异常件明细
    problemdetail: {
      all: `${APIV3}/selectproblemParts`,
    },
    // 权限管理
    auth: {
      // 用户管理
      adminuser: {
        list: `${APIV3}/operatorList`,
        update: `${APIV3}/operatorEdit`,
        delete: `${APIV3}/operatorDel`,
        create: `${APIV3}/operatorAdd`,
        // list: `${APIV1}/operatorList`,
        // update: `${APIV1}/operatorEdit`,
        // delete: `${APIV1}/operatorDel`,
        // create: `${APIV1}/operatorAdd`,
      },
      // 菜单管理
      menu: {
        list: `${APIV3}/menuList`,
        update: `${APIV3}/menuEdit`,
        delete: `${APIV3}/menuDel`,
        create: `${APIV3}/menuAdd`,
        getMenuByParentId: `${APIV3}/getMenuByParentId`,
      },
      // 角色管理
      role: {
        list: `${APIV3}/roleList`,
        update: `${APIV3}/roleEdit`,
        delete: `${APIV3}/roleDel`,
        create: `${APIV3}/roleAdd`,
        queryMenu: `${APIV3}/menuList`,
        // list: `${APIV1}/roleList`,
        // update: `${APIV1}/roleEdit`,
        // delete: `${APIV1}/roleDel`,
        // create: `${APIV1}/roleAdd`,
        // queryMenu: `${APIV1}/menuList`,
        // getLocation: `${APIV1}/quandiExpressSiteManager/getLocation`,
      },
      // 机构管理
      org: {
        getLocation: `${APIV3}/getLocation`,
        list: `${APIV3}/orgList`,
        update: `${APIV3}/orgEdit`,
        delete: `${APIV3}/orgDel`,
        create: `${APIV3}/orgAdd`,
        /**
         * 根据地址查询门店
         */
        getIdUsers: `${APIV3}/selectIdUsers`,
      },

    },
    // 业务量
    businessvolume: {
      list: `${APIV3}/getPortfolio`,
      detail: `${APIV3}/getOrderByBrand`,
      count: `${APIV3}/getPortfolioByBrand`,
      downloadExcel: `${APIV3}/downloadPortfolio`,
    },
  },
  brand: {
    2: '优速',
    3: '龙邦',
    4: '速尔',
    5: '快捷',
    6: '全峰',
    7: '百世',
    8: '天天',
    9: '中通',
    11: '申通',
    12: '圆通',
    14: 'EMS',
    15: '国通',
    16: '蚂蚁帮',
    17: '邮政小包',
    18: '宅急送',
    19: '跨越',
    20: '京东',
    21: '达达',
    22: '万象',
    23: '妙寄',
    24: '中铁',
    27: '品骏',
    26: '安能',
    28: '日日顺',
    29: '如风达',
    10: '韵达',
    13: '顺丰',
    71: '高铁快运',
  },
  brandReverse: {
    优速: 2,
    龙邦: 3,
    速尔: 4,
    快捷: 5,
    全峰: 6,
    百世快递: 7,
    百世: 7,
    天天: 8,
    中通: 9,
    申通: 11,
    圆通: 12,
    EMS: 14,
    国通: 15,
    蚂蚁帮: 16,
    邮政小包: 17,
    宅急送: 18,
    跨越: 19,
    京东: 20,
    达达: 21,
    万象: 22,
    妙寄: 23,
    中铁: 24,
    品骏: 27,
    安能: 26,
    日日顺: 28,
    如风达: 29,
    韵达: 10,
    顺丰: 13,
    高铁快运: 71,
  },
  orderType: {
    101: '到件',
    102: '上架',
    103: '分派',
    301: '签收',
    302: '退回',
    201: '问题件',
    202: '修改',
  },
  orderTypeForBusiness: {
    1: '点货',
    101: '入库',
    305: '签收',
    303: '退回',
  },
}
