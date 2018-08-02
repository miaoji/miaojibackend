import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { isSuperAdmin } from '../../../utils'

const Modular = ({ location, dispatch, role, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, menuList, roleList } = role
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['role/update'],
    title: `${modalType === 'create' ? '新增角色信息' : '修改角色信息'}`,
    wrapClassName: 'vertical-center-modal',
    menuList,
    roleList,
    onRoldSelect(payload) {
      dispatch({
        type: 'role/filterRoleList',
        payload,
      })
    },
    onOk(data) {
      if (data.roleId === currentItem.PARENT_ROLE_NAME) {
        data.parentRoleId = undefined
      } else {
        data.parentRoleId = data.roleId ? JSON.parse(data.roleId).ID : ''
      }
      delete data.roleId
      dispatch({
        type: `role/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'role/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['role/query'],
    pagination,
    location,
    onChange(page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'role/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      if (menuList.length === 0) {
        dispatch({
          type: 'role/queryMenuList',
        })
      }
      if (isSuperAdmin()) {
        dispatch({
          type: 'role/queryRoleList',
          payload: {
            id: item.PARENT_ROLE_ID,
          },
        })
      }
      dispatch({
        type: 'role/filterRoleList',
      })
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onAdd() {
      if (menuList.length === 0) {
        dispatch({
          type: 'role/queryMenuList',
        })
      }
      if (!isSuperAdmin()) {
        dispatch({
          type: 'role/filterRoleList',
        })
      }
      if (isSuperAdmin()) {
        dispatch({
          type: 'role/queryRoleList',
        })
      }
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Modular.propTypes = {
  role: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ role, loading }) => ({ role, loading }))(Modular)
