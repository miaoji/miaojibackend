import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, log, loading, app }) => {
  const { list, pagination } = log
  const { pageSize } = pagination
  const { storeuserList } = app

  const listProps = {
    dataSource: list,
    loading: loading.effects['log/query'],
    pagination,
    location,
    onChange(page, filters) {
      const filtersQuery = {}
      Object.keys(filters).forEach((i) => { filtersQuery[i] = filters[i][0] })
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...filtersQuery,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    storeuserList,
    downloadLoading: loading.effects['log/download'],
    onDownLoad() {
      dispatch({
        type: 'log/download',
        payload: {
          ...location.query,
        },
      })
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
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

IndexPage.propTypes = {
  log: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ log, loading, app }) => ({ log, loading, app }))(IndexPage)
