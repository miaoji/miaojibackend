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
    name: '微信用户详细',
    router: '/wxuser/:id'
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
    icon: 'eye-o'
  },
  {
    id: 41,
    bpid: 4,
    mpid: 4,
    icon: 'export',
    name: '快件操作数据',
    router: '/expressitem',
  },
  {
    id: 42,
    bpid: 4,
    mpid: 4,
    icon: 'pay-circle',
    name: '收支数据',
    router: '/checkbook',
  },
  {
    id: 43,
    bpid: 4,
    mpid: 4,
    icon: 'mobile',
    name: '通讯数据',
    router: '/communication',
  },
  {
    id: 5,
    bpid: 1,
    name: '消息管理',
    icon: 'mail',
    router: '/message',
  },
  {
    id: 51,
    mpid: -1,
    bpid: 5,
    name: '消息详细',
    router: '/message/:id'
  },
  {
    id: 6,
    bpid: 1,
    name: '钱包管理',
    icon: 'wallet'
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
  {
    id: 63,
    bpid: 6,
    mpid: 6,
    icon: 'check-square-o',
    name: '提现审核',
    router: '/withdraws/check',
  }
]
