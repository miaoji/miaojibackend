import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './Bread.less'
import pathToRegexp from 'path-to-regexp'
import { queryArray } from '../../utils'

const Bread = ({ menu }) => {
  // 匹配当前路由
  let pathArray = []
  // 启动browserHistory路由匹配模式
  // let pathname = location.pathname
  let pathname = location.hash!=='/'?location.hash.slice(1).split('?')[0]:'/'
  if (pathname === 'login') {
    pathname = '/'
  }
  let current
  for (let index in menu) {
    if (menu[index].router && pathToRegexp(menu[index].router).exec(pathname)) {
      current = menu[index]
      break
    }
  }

  if (!current && pathname == '/') {
    current = menu[0]
  }

  const getPathArray = (item) => {
    pathArray.unshift(item)
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'))
    }
  }

  if (!current && location.pathname !== '/') {
    pathArray.push(menu[0])
    pathArray.push({
      id: 404,
      name: 'Not Found',
    })
  } else {
    getPathArray(current)
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon
          ? <Icon type={item.icon} style={{ marginRight: 4 }} />
          : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={item.router}>
              {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array,
}

export default Bread
