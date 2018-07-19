import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

/* 用于调整权限管理>角色管理的添加和修改获取菜单列表的数据结构与项目所需字段不匹配的问题 */
export const reloadItem = (item) => {
  if (item.children && item.children.length === 0) {
    delete item.children
  }
  if (item.children && item.children.length > 0) {
    item.children = item.children.map((items) => {
      return reloadItem(items)
    })
  }
  return {
    title: item.menuName,
    key: item.id,
    children: item.children,
  }
}

/* 用于调整权限管理>角色管理的添加和修改中tree无法识别节点树父级ID的问题 */
export const handleArrData = ({ list, arr }) => {
  const tmp = []
  list.forEach((item) => {
    const key = item.key
    if (item.children && item.children.length > 0) {
      item.children.forEach((j) => {
        const aa = j.key
        if (arr.includes(String(j.key))) {
          tmp.push(key.toString())
        }
        if (j.children && j.children.length > 0) {
          j.children.forEach((i) => {
            if (arr.includes(String(i.key))) {
              tmp.push(key.toString())
              tmp.push(aa.toString())
            }
          })
        }
      })
    }
  })
  const tmpArr = Array.from(new Set([...tmp, ...arr]))
  return tmpArr.map((item) => {
    return Number(item)
  })
}

/* 用户管理遍历Tree菜单选择组件 */
export const renderTreeNodes = (data) => {
  if (data.length) {
    return data.map((items) => {
      if (items.children) {
        return (
          <TreeNode
            title={items.title}
            key={items.key}
            dataRef={items}
          >
            {renderTreeNodes(items.children)}
          </TreeNode>
        )
      }
      return (<TreeNode
        {...items}
      />)
    })
  }
  return <TreeNode title="parent 1-0" key="0-0-0" disabled />
}

/* 角色 管理页面遍历地址信息 */
export const editLocation = (data) => {
  if (data.children && data.children.length === 0) {
    delete data.children
  }
  if (data.children && data.children.length > 0) {
    data.children = data.children.map((items) => {
      return editLocation(items)
    })
  }
  return {
    value: data.name || data.province || data.city || `${data.district}///${data.id}`,
    label: data.name || data.province || data.city || data.district,
    children: data.children,
  }
}

/* 角色管理页面筛选当前角色能使用的菜单列表 */
export const filterRoleList = (data, list) => {
  console.log('data', data)
  data = data.map((item) => {
    if (list.some(_ => _ === item.id)) {
      if (item.children && item.children.length > 0) {
        item = filterRoleList(item.children, list)
      }
      return item
    }
    return undefined
  })
  return data
}
