import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, communicationbilldetail, loading, app }) => {
  const { list, pagination } = communicationbilldetail
  const { pageSize } = pagination
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/log'] || {}

  const listProps = {
    dataSource: list,
    loading: loading.effects['communicationbilldetail/query'],
    pagination,
    location,
    auth,
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
    auth,
    storeuserList,
    downloadLoading: loading.effects['communicationbilldetail/download'],
    onDownLoad() {
      dispatch({
        type: 'communicationbilldetail/download',
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
  communicationbilldetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ communicationbilldetail, loading, app }) => ({ communicationbilldetail, loading, app }))(IndexPage)
