import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

const Modular = ({ location, dispatch, adminuser, loading }) => {
  const { orgTree, list, pagination, currentItem, modalVisible, modalType, confirmDirty, orangeizeList, roleList } = adminuser
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    orgTree,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['adminuser/update'],
    title: `${modalType === 'create' ? '注册用户信息' : '修改用户信息'}`,
    wrapClassName: 'vertical-center-modal',
    confirmDirty: confirmDirty || false,
    orangeizeList,
    roleList,
    onOk(data) {
      dispatch({
        type: `adminuser/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'adminuser/hideModal',
      })
    },
    onEditConfirmDirty(payload) {
      dispatch({
        type: 'adminuser/updateState',
        payload,
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['adminuser/query'],
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
        type: 'adminuser/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({ type: 'adminuser/queryOrangeizeList' })
      dispatch({ type: 'adminuser/queryRoleList' })
      dispatch({
        type: 'adminuser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onResetPWD(item) {
      dispatch({
        type: 'adminuser/showModal',
        payload: {
          modalType: 'resetPWD',
          currentItem: { id: item },
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
      dispatch({ type: 'adminuser/queryOrangeizeList' })
      dispatch({ type: 'adminuser/queryRoleList' })
      dispatch({
        type: 'adminuser/showModal',
        payload: {
          modalType: 'create',
          currentItem: {},
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
  adminuser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ adminuser, loading }) => ({ adminuser, loading }))(Modular)
