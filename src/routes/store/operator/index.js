import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Operator = ({ location, dispatch, operator, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = operator

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk(data) {
      dispatch({
        type: `operator/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'operator/hideModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['operator/query'],
    pagination,
    location,
    onChange(page, filter) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...filter,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'operator/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'operator/showModal',
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
    handleDownLoad() {
      dispatch({
        type: 'operator/download',
        payload: {
          ...location.query,
        },
      })
    },
    onFilterChange(value) {
      const { idUser, realName } = location.query
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          idUser,
          realName,
          page: 1,
          pageSize: 10,
        },
      }))
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

Operator.propTypes = {
  operator: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ operator, loading }) => ({ operator, loading }))(Operator)
