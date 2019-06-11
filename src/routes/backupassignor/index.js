import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, backupassignor, loading }) => {
  const { list, expandedRowKeys, pagination, expandedList } = backupassignor
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
    rowLoading: loading.effects['backupassignor/queryBrandDetail'],
    loading: loading.effects['backupassignor/query'],
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
          type: 'backupassignor/updateState',
          payload: {
            expandedRowKeys: [],
          },
        })
        return
      }
      dispatch({
        type: 'backupassignor/updateState',
        payload: {
          expandedRowKeys: [record.id],
        },
      })
      dispatch({
        type: 'backupassignor/queryBrandDetail',
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

IndexPage.propTypes = {
  backupassignor: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ backupassignor, loading }) => ({ backupassignor, loading }))(IndexPage)
