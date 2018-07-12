## General

创建一个新页面的流程： 

(假设创建 demo 页面)

  1. routes文件夹创建demo文件夹，（也可以直接创建demo.js，示页面的复杂度而定），页面每个模块都可以创建一个单独的js文件。最后在index.js中汇合

  2. models中创建对应的demo.js 并根据页面需求完成 state, subscriptions, effects, reducers的添加
  
  3. 如果有与服务端的交互，则视情况添加对应的service (要先在 mock中添加开发是的测试数据)
  
  4. router.js中添加 /demo 路径，并注册model

## AJAX 异步请求

使用axios库，基于async/await进行异步代码的同步编写

## Router 前端路由

## PropTypes 

PropTypes.array

PropTypes.bool

PropTypes.func

PropTypes.number

PropTypes.object

PropTypes.string

## mock

使用mockjs进行开发数据伪造, 并拦截本地ajax请求, mockjs很好用，以后要多用

## Spread Attr

```
const attrs = {
  href: 'http://example.org',
  target: '_blank',
};
<a {...attrs}>Hello</a>

```

等同于

```

const attrs = {
  href: 'http://example.org',
  target: '_blank',
};
<a href={attrs.href} target={attrs.target}>Hello</a>

```