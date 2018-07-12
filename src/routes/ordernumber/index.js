import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const OrderNumber = ({ location, dispatch, ordernumber, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, brandName } = ordernumber
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['ordernumber/update'],
    title: `${modalType === 'create' ? '新增单号规则' : '修改单号规则'}`,
    wrapClassName: 'vertical-center-modal',
    brandName,
    onOk (data) {
      dispatch({
        type: `ordernumber/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'ordernumber/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['ordernumber/query'],
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
        type: 'ordernumber/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'ordernumber/showModal',
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
        pathname: '/ordernumber',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/ordernumber',
      }))
    },
    onAdd () {
      dispatch({
        type: 'ordernumber/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'ordernumber/getBrandName',
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

OrderNumber.propTypes = {
  ordernumber: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ ordernumber, loading }) => ({ ordernumber, loading }))(OrderNumber)
