import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

/**
 * [用于调整权限管理>角色管理的添加和修改获取菜单列表的数据结构与项目所需字段不匹配的问题]
 */
export const reloadItem = (item) => {
  if (item.children && item.children.length === 0) {
    item.children = undefined
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

/**
 *  [用于调整权限管理>角色管理的添加和修改中tree无法识别节点树父级ID的问题]
 */
export const handleArrData = ({ list, arr }) => {
  const tmp = []
  list.forEach((item) => {
    const key = item.id
    if (item.children && item.children.length > 0) {
      item.children.forEach((j) => {
        const tmpId = j.id
        if (arr.includes(String(j.id))) {
          tmp.push(key.toString())
        }
        if (j.children && j.children.length > 0) {
          j.children.forEach((i) => {
            if (arr.includes(String(i.id))) {
              tmp.push(key.toString())
              tmp.push(tmpId.toString())
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

/**
 * [用户管理遍历Tree菜单选择组件]
 */
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

/**
 * [角色管理页面遍历地址信息]
 */
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

/**
 * [角色管理页面筛选当前角色能使用的菜单列表]
 */
export const filterRoleList = (data, list) => {
  data = data.filter((item) => {
    if (item.children && item.children.length > 0) {
      item.children = filterRoleList(item.children, list)
    }
    return list.some(_ => String(_) === String(item.id))
  })
  return data
}

/**
 * [对菜单数据进行整理]
 */
export const rebuildMenuData = (data) => {
  const tmp = data.map((item) => {
    const tmpItem = {
      id: String(item.id),
      icon: item.icon,
      mpid: Number(item.parentMenuId) > 0 ? item.parentMenuId : undefined,
      name: item.menuName,
      route: item.target,
    }
    for (const key in tmpItem) {
      if (!tmpItem[key]) {
        delete tmpItem[key]
      }
    }
    return tmpItem
  })

  return tmp
}

const onlyMenus = (list) => {
  let menuList = []
  const tmpList = list.map((item) => {
    try {
      return item.children[0].children
    } catch (e) {
      return null
    }
  })
  tmpList.forEach((item) => {
    if (item && item.length > 0) {
      menuList = [...menuList, ...item]
    }
  })

  const ids = menuList.map(item => item.id)
  const onlyIds = Array.from(new Set(ids))
  const onlyArr = onlyIds.map(id => menuList.find(item => item.id === id))
  return onlyArr
}

/**
 * [对菜单数据进行转换,转换成适合页面获取按钮权限的数据]
 */
const filterButtonInfo = (arr) => {
  const tmp = arr.filter(i => i.menuType === 2).map((i) => {
    const tmpI = arr.filter(j => String(j.parentMenuId) === String(i.id))
    const val = {}
    tmpI.forEach((k) => { val[k.buttonType] = true })
    return {
      name: i.target,
      val,
    }
  })

  const R = {}
  tmp.forEach((i) => { R[i.name] = i.val })
  return R
}

/**
 * [对登录获取的用户信息处理,得到用户的一些角色信息]
 */
export const initUserInfo = (userInfo) => {
  // 菜单列表信息
  const source = onlyMenus(userInfo.menuList)
  const menuList = source.filter(i => i.menuType !== 3)
  const sourceMenuList = filterButtonInfo(source)

  // 角色ID
  const roleIds = userInfo.menuList.map((item) => {
    return item.id
  })
  // 菜单id集合(页面用)
  const menuIds = userInfo.menuList.map((item) => {
    return item.children[0].menuId
  })
  // 菜单id集合(后台用)
  const menuGroupIds = userInfo.menuList.map((item) => {
    return item.children[0].menuGroupId
  })
  return {
    ...userInfo,
    userMenus: menuList,
    roleIds,
    menuIds,
    sourceMenuList,
    menuGroupIds,
  }
}

/**
 * [从menusList从取出menuId]
 */

export const getMenuIds = (menuList) => {
  const tmpArr = []
  menuList.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const test = getMenuIds(item.children)
      tmpArr.push(...test, item.id)
    } else {
      tmpArr.push(item.id)
    }
  })
  return tmpArr
}

/**
 * [门店用户页面,遍历地址信息]
 */
export const storeuserEditLocation = (data) => {
  if (data.children && data.children.length === 0) {
    delete data.children
  }
  if (data.children && data.children.length > 0) {
    data.children = data.children.map((items) => {
      return storeuserEditLocation(items)
    })
  }
  return {
    value: data.name || data.province || data.city || data.district,
    label: data.name || data.province || data.city || data.district,
    children: data.children,
  }
}
