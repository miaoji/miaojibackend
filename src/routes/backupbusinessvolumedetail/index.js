import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ app, location, dispatch, backupbusinessvolumedetail, loading }) => {
  const { list, pagination } = backupbusinessvolumedetail
  const { query, pathname } = location
  const { pageSize } = pagination

  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/businessvolume'] || {}

  const listProps = {
    dataSource: list,
    loading: loading.effects['backupbusinessvolumedetail/query'],
    pagination,
    location,
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
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    auth,
    onDownLoad() {
      dispatch({
        type: 'backupbusinessvolumedetail/download',
        payload: { ...location.query },
      })
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...location.query,
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
  backupbusinessvolumedetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ backupbusinessvolumedetail, loading, app }) => ({ app, backupbusinessvolumedetail, loading }))(IndexPage)
