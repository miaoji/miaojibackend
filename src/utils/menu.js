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
  {
    id: 21,
    bpid: 2,
    mpid: -1,
    name: '寄件收件信息',
    router: '/wxuserdetail',
  },
  {
    id: 3,
    bpid: 1,
    name: '门店用户',
    icon: 'shop',
    router: '/storeuser',
  },
  {
    id: 31,
    mpid: -1,
    bpid: 3,
    name: '门店用户详细',
    router: '/storeuser/:id',
  },
  {
    id: 4,
    bpid: 1,
    name: '数据统计',
    icon: 'eye-o',
  },
  // {
  //   id: 41,
  //   bpid: 4,
  //   mpid: 4,
  //   icon: 'export',
  //   name: '快件操作数据',
  //   router: '/expressitem',
  // },
  {
    id: 42,
    bpid: 4,
    mpid: 4,
    icon: 'pay-circle',
    name: '收支数据',
    //  router: '/checkbook',
  },
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
  {
    id: 47,
    bpid: 4,
    mpid: 42,
    icon: 'download',
    name: '收入',
    router: '/income',
  }, {
    id: 48,
    bpid: 4,
    mpid: 42,
    icon: 'upload',
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
    icon: 'plus',
    name: '充值记录',
    router: '/topups',
  },
  {
    id: 62,
    bpid: 6,
    mpid: 6,
    icon: 'minus',
    name: '提现记录',
    router: '/withdraws',
  },
  /* {
    id: 63,
    bpid: 6,
    mpid: 6,
    icon: 'check-square-o',
    name: '提现审核',
    router: '/withdraws/check',
  }*/
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
    icon: 'shop',
    router: '/consume',
  }, {
    id: 10,
    bpid: 1,
    name: '黑名单',
    icon: 'user-delete',
    router: '/blacklist',
  },
  // -- //
  {
    id: 11,
    bpid: 1,
    name: '门店管理',
    icon: 'user-delete'
  }, {
    id: 16,
    bpid: 1,
    mpid: 11,
    name: '门店寄件支付汇总',
    icon: 'shop',
    router: '/sendtotal'
  }, {
    id: 111,
    bpid: 16,
    mpid: -1,
    name: '寄件及金额',
    icon: 'user-delete',
    router: '/mailprice',
  }, {
    id: 18,
    bpid: 1,
    mpid: 11,
    name: '门店派件量',
    icon: 'user-delete',
    router: '/sentalong',
  }, {
    id: 112,
    bpid: 1,
    mpid: 11,
    name: '门店订单汇总',
    icon: 'user-delete',
    router: '/storeordertotal',
  }, {
    id: 17,
    bpid: 1,
    mpid: -1,
    name: '门店上架总量',
    icon: 'user-delete',
    router: '/selectshelves',
  }, {
    id: 19,
    bpid: 1,
    mpid: -1,
    name: '门店到件总量',
    icon: 'user-delete',
  }, {
    id: 113,
    bpid: 1,
    mpid: -1,
    name: '门店订单上架',
    icon: 'user-delete',
    router: '/storeorderinfo',
  }, {
    id: 114,
    bpid: 1,
    mpid: -1,
    name: '门店订单分派',
    icon: 'user-delete',
    router: '/storeallot',
  },
  // -- //
  {
    id: 12,
    bpid: 1,
    name: '京东单号管理',
    icon: 'export',
    router: '/jd'
  },
  /* {
    id: 121,
    bpid: 1,
    mpid: 12,
    name: '单号管理',
    icon: 'user-delete',
  }, */{
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
  // {
  //   id: 15,
  //   bpid: 1,
  //   name: '签收',
  //   icon: 'edit',
  //   router: '/sign'
  // }
]
