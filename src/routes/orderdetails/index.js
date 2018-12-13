import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const OrderDetails = ({ location, dispatch, orderdetails, loading }) => {
  const { list, pagination, expandedRowKeys, rowData } = orderdetails

  const listProps = {
    dataSource: list,
    loading: loading.effects['orderdetails/query'],
    rowLoading: loading.effects['orderdetails/getOrderInfo'],
    location,
    expandedRowKeys,
    pagination,
    rowData,
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
    onExpand(open, rowItem) {
      if (open) {
        dispatch({
          type: 'orderdetails/getOrderInfo',
          payload: rowItem,
        })
        dispatch({
          type: 'orderdetails/updateState',
          payload: {
            expandedRowKeys: [rowItem.key],
          },
        })
      } else {
        dispatch({
          type: 'orderdetails/updateState',
          payload: {
            expandedRowKeys: [],
          },
        })
      }
    },
  }
  const filterProps = {
    filter: {
      ...location.query,
    },
    buttonLoading: loading.effects['orderdetails/query'],
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

OrderDetails.propTypes = {
  orderdetails: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ orderdetails, loading }) => ({ orderdetails, loading }))(OrderDetails)
