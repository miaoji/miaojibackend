import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Assignor = ({ location, dispatch, assignor, loading }) => {
  const { list, expandedRowKeys, pagination, expandedList } = assignor
  const { query, pathname } = location

  const listProps = {
    filter: {
      ...query,
    },
    expandedList,
    pagination,
    location,
    expandedRowKeys,
    dataSource: list,
    rowLoading: loading.effects['assignor/queryBrandDetail'],
    loading: loading.effects['assignor/query'],
    onChange(page) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onExpand(expanded, record) {
      if (!expanded) {
        dispatch({
          type: 'assignor/updateState',
          payload: {
            expandedRowKeys: [],
          },
        })
        return
      }
      dispatch({
        type: 'assignor/updateState',
        payload: {
          expandedRowKeys: [record.id],
        },
      })
      dispatch({
        type: 'assignor/queryBrandDetail',
        payload: {
          item: record,
          filter: {
            ...query,
          },
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...value,
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
    </div>
  )
}

Assignor.propTypes = {
  assignor: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ assignor, loading }) => ({ assignor, loading }))(Assignor)
