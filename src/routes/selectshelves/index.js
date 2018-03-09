import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Selectshelves = ({ location, dispatch, selectshelves, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = selectshelves
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
        type: `selectshelves/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'selectshelves/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['selectshelves/query'],
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
        type: 'selectshelves/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'selectshelves/showModal',
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
        pathname: '/selectshelves',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/selectshelves',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'selectshelves/download',
        payload: location.query
      })
    },
    onAdd() {
      dispatch({
        type: 'selectshelves/showModal',
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

Selectshelves.propTypes = {
  selectshelves: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ selectshelves, loading }) => ({ selectshelves, loading }))(Selectshelves)
