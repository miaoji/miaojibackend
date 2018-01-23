import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Storeallot = ({ location, dispatch, storeallot, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = storeallot
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
        type: `storeallot/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'storeallot/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['storeallot/query'],
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
        type: 'storeallot/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'storeallot/showModal',
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
        pathname: '/storeallot',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/storeallot',
      }))
    },
    onDownLoad(payload) {
      dispatch({
        type: 'storeallot/download',
        payload
      })
    },
    onAdd() {
      dispatch({
        type: 'storeallot/showModal',
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

Storeallot.propTypes = {
  storeallot: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ storeallot, loading }) => ({ storeallot, loading }))(Storeallot)
