import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, messagearrivedetail, loading, app }) => {
  const { list, pagination } = messagearrivedetail
  const { pageSize } = pagination
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/messagearrive'] || {}

  const listProps = {
    dataSource: list,
    loading: loading.effects['messagearrivedetail/query'],
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
    downloadLoading: loading.effects['messagearrivedetail/download'],
    onDownLoad() {
      dispatch({
        type: 'messagearrivedetail/download',
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
  messagearrivedetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ messagearrivedetail, loading, app }) => ({ messagearrivedetail, loading, app }))(IndexPage)
