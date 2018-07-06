import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Modular = ({ location, dispatch, role, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = role
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['role/update'],
    title: `${modalType === 'create' ? '新增角色信息' : '修改角色信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
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
  console.log('loading.effects[role/query],', loading.effects['role/query'])
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
