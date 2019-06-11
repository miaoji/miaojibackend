import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, backuporder, loading }) => {
  const { list, pagination, expandedRowKeys, rowData } = backuporder

  const listProps = {
    dataSource: list,
    loading: loading.effects['backuporder/query'],
    rowLoading: loading.effects['backuporder/getOrderInfo'],
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
          type: 'backuporder/getOrderInfo',
          payload: rowItem,
        })
        dispatch({
          type: 'backuporder/updateState',
          payload: {
            expandedRowKeys: [rowItem.key],
          },
        })
      } else {
        dispatch({
          type: 'backuporder/updateState',
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
    buttonLoading: loading.effects['backuporder/query'],
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

IndexPage.propTypes = {
  backuporder: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ backuporder, loading }) => ({ backuporder, loading }))(IndexPage)
