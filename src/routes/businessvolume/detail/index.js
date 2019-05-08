import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const BusinessvolumeDetail = ({ app, location, dispatch, businessvolumeDetail, loading }) => {
  const { list, pagination } = businessvolumeDetail
  const { query, pathname } = location
  const { pageSize } = pagination

  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/businessvolume'] || {}

  const listProps = {
    dataSource: list,
    loading: loading.effects['businessvolumeDetail/query'],
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
        type: 'businessvolumeDetail/download',
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

BusinessvolumeDetail.propTypes = {
  businessvolumeDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ businessvolumeDetail, loading, app }) => ({ app, businessvolumeDetail, loading }))(BusinessvolumeDetail)
