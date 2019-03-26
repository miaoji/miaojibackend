import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, branddocking, loading, app }) => {
  const { list, pagination } = branddocking
  const { pageSize } = pagination
  const { storeuserList } = app


  const listProps = {
    dataSource: list,
    loading: loading.effects['branddocking/query'],
    pagination,
    location,
    onChange(page, filters) {
      const filtersQuery = {}
      Object.keys(filters).forEach((i) => { filtersQuery[i] = filters[i][0] })
      console.log('filtersQuery', filtersQuery)
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
  branddocking: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ branddocking, loading, app }) => ({ branddocking, loading, app }))(IndexPage)
