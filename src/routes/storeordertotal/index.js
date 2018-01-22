import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Storeordertotal = ({ location, dispatch, storeordertotal, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = storeordertotal
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk (data) {
      dispatch({
        type: `storeordertotal/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'storeordertotal/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['storeordertotal/query'],
    pagination,
    location,
    onChange (page) {
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
    onDeleteItem (id) {
      dispatch({
        type: 'storeordertotal/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'storeordertotal/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type: 'storeordertotal/getSiteName',
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/storeordertotal',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/storeordertotal',
      }))
    },
    onAdd () {
      dispatch({
        type: 'storeordertotal/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'storeordertotal/getSiteName',
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

Storeordertotal.propTypes = {
  storeordertotal: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ storeordertotal, loading }) => ({ storeordertotal, loading }))(Storeordertotal)
