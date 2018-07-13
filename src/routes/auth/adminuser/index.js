import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Modular = ({ location, dispatch, adminuser, loading, app }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = adminuser
  const { pageSize } = pagination
  const { storeuserList } = app

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['adminuser/update'],
    title: `${modalType === 'create' ? '注册用户信息' : '修改用户信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName: storeuserList,
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
      dispatch({
        type: 'adminuser/showModal',
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
  adminuser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ adminuser, loading, app }) => ({ adminuser, loading, app }))(Modular)
