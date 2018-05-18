module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '主页',
    router: '/dashboard',
  },
  {
    id: 2,
    bpid: 1,
    name: '微信用户',
    icon: 'message',
    router: '/wxuser',
  },
  // -- //
  {
    id: 11,
    bpid: 1,
    name: '门店管理',
    icon: 'shop',
  },
  {
    id: 3,
    bpid: 1,
    mpid: 11,
    name: '门店用户',
    router: '/storeuser',
  },
  {
    id: 28,
    bpid: 3,
    mpid: -1,
    name: '门店操作人详情',
    router: '/storeuserDetail',
  },
  {
    id: 25,
    bpid: 28,
    mpid: -1,
    name: '操作人寄件汇总',
    router: '/operator',
  },
  {
    id: 23,
    bpid: 1,
    mpid: 11,
    name: '门店寄件',
    router: '/expressfee',
  },
  {
    id: 24,
    bpid: 23,
    mpid: -1,
    name: '门店单号汇总',
    router: '/expressfeedetail',
  },
  {
    id: 32,
    bpid: 1,
    mpid: 11,
    name: '门店操作',
    router: '/business',
  }, {
    id: 26,
    bpid: 32,
    mpid: -1,
    name: '操作人',
    router: '/operatorbyname',
  }, {
    id: 27,
    bpid: 26,
    mpid: -1,
    name: '快件详情',
    router: '/orderbyuser',
  },
  {
    id: 29,
    bpid: 1,
    mpid: -1,
    name: '门店派件金额',
    router: '/assignFee'
  },
  {
    id: 30,
    bpid: 29,
    mpid: -1,
    name: '操作人派件金额',
    router: '/operatorAssignFee'
  },
  {
    id: 31,
    bpid: 1,
    mpid: 11,
    name: '门店签收',
    router: '/storeSign'
  },
  {
    id: 35,
    bpid: 31,
    mpid: -1,
    name: '签收订单详情',
    router: '/storeSignDetail'
  },
  {
    id: 33,
    bpid: 1,
    mpid: 11,
    name: '门店分派',
    router: '/selectfenpai'
  },
  {
    id: 34,
    bpid: 33,
    mpid: -1,
    name: '操作人分派详情',
    router: '/selectpjjeDetails'
  },
  {
    id: 37,
    bpid: 1,
    mpid: 11,
    name: '门店问题件',
    router: '/problem'
  },
  {
    id: 16,
    bpid: 1,
    mpid: -1,
    name: '门店寄件支付汇总',
    router: '/sendtotal'
  },
  {
    id: 19,
    bpid: 16,
    mpid: -1,
    name: '寄件及金额',
    router: '/mailprice',
  }, {
    id: 18,
    bpid: 1,
    mpid: -1,
    name: '门店派件信息',
    router: '/sentalong',
  },
  {
    id: 20,
    bpid: 1,
    mpid: -1,
    name: '门店订单汇总',
    router: '/storeordertotal',
  }, {
    id: 22,
    bpid: 1,
    mpid: -1,
    name: '门店分派及金额',
    router: '/storeorderinfo',
  }, {
    id: 17,
    bpid: 1,
    mpid: -1,
    name: '门店未签收',
    router: '/selectshelves',
  },
  // -- //
  {
    id: 21,
    bpid: 2,
    mpid: -1,
    name: '寄件收件信息',
    router: '/wxuserdetail',
  },
  {
    id: 4,
    bpid: 1,
    name: '收支数据',
    icon: 'eye-o',
  },
  {
    id: 47,
    bpid: 4,
    mpid: 4,
    name: '收入',
    router: '/income',
  }, {
    id: 48,
    bpid: 4,
    mpid: 4,
    name: '支出',
    router: '/expend',
  },
  {
    id: 51,
    mpid: -1,
    bpid: 5,
    name: '消息详细',
    router: '/message/:id',
  },
  {
    id: 6,
    bpid: 1,
    name: '钱包管理',
    icon: 'wallet',
  },
  {
    id: 61,
    bpid: 6,
    mpid: 6,
    name: '充值记录',
    router: '/topups',
  },
  {
    id: 62,
    bpid: 6,
    mpid: 6,
    name: '提现记录',
    router: '/withdraws',
  },
  {
    id: 7,
    bpid: 1,
    name: '运单管理',
    icon: 'export',
    router: '/order',
  },
  {
    id: 8,
    bpid: 1,
    name: '推广管理',
    icon: 'global',
    router: '/qr',
  }, {
    id: 81,
    bpid: 8,
    mpid: -1,
    name: '二维码图片',
    router: '/qrdetail',
  }, {
    id: 9,
    bpid: 1,
    name: '充值消费',
    icon: 'credit-card',
    router: '/consume',
  }, {
    id: 10,
    bpid: 1,
    name: '黑名单',
    icon: 'code',
    router: '/blacklist',
  }, {
    id: 36,
    bpid: 1,
    name: '黑名单订单详情',
    icon: 'code-o',
    router: '/blacklistdetail',
  },
  {
    id: 12,
    bpid: 1,
    name: '京东单号管理',
    icon: 'export',
    router: '/jd'
  },
  {
    id: 13,
    bpid: 1,
    name: '单号规则配置',
    icon: 'setting',
    router: '/ordernumber'
  },
  {
    id: 14,
    bpid: 1,
    name: '发表文章',
    icon: 'edit',
    router: '/publish'
  },
  /* {
    id: 121,
    bpid: 1,
    mpid: 12,
    name: '单号管理',
    icon: 'user-delete',
  }, */
  /* {
    id: 63,
    bpid: 6,
    mpid: 6,
    icon: 'check-square-o',
    name: '提现审核',
    router: '/withdraws/check',
  }*/
  // {
  //   id: 15,
  //   bpid: 1,
  //   name: '签收',
  //   icon: 'edit',
  //   router: '/sign'
  // }
  // {
  //   id: 41,
  //   bpid: 4,
  //   mpid: 4,
  //   icon: 'export',
  //   name: '快件操作数据',
  //   router: '/expressitem',
  // },
  // {
  //   id: 42,
  //   bpid: 4,
  //   mpid: 4,
  //   name: '收支数据',
  //   //  router: '/checkbook',
  // },
  // {
  //   id: 43,
  //   bpid: 4,
  //   mpid: 4,
  //   icon: 'mobile',
  //   name: '通讯数据',
  //   router: '/communication',
  // },
  // {
  //   id: 44,
  //   bpid: 4,
  //   mpid: 41,
  //   icon: 'tag',
  //   name: '普通件',
  //   router: '/normal',
  // }, {
  //   id: 45,
  //   bpid: 4,
  //   mpid: 41,
  //   icon: 'tag-o',
  //   name: '到付件',
  //   router: '/collect',
  // }, {
  //   id: 46,
  //   bpid: 4,
  //   mpid: 41,
  //   icon: 'tags',
  //   name: '代收件',
  //   router: '/collection',
  // },
]
