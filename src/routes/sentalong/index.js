import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Sentalong = ({ location, dispatch, sentalong, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = sentalong
  const { pageSize } = pagination

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
        type: `sentalong/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'sentalong/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    filter: {
      ...location.query,
    },
    loading: loading.effects['sentalong/query'],
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
        type: 'sentalong/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'sentalong/showModal',
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/sentalong',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/sentalong',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'sentalong/download',
        payload: location.query
      })
    },
    onAdd() {
      dispatch({
        type: 'sentalong/showModal',
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

Sentalong.propTypes = {
  sentalong: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sentalong, loading }) => ({ sentalong, loading }))(Sentalong)