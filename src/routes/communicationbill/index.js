import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { defaultTime } from '../../utils'

const IndexPage = ({ location, dispatch, communicationbill, app, loading }) => {
  const { list, pagination } = communicationbill
  const { pageSize } = pagination
  const { query, pathname } = location
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/communicationbill'] || {}
  const filter = defaultTime({ ...location.query })

  const listProps = {
    dataSource: list,
    filter,
    loading: loading.effects['communicationbill/query'],
    pagination,
    location,
    onChange(page) {
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
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
    auth,
    storeuserList,
    filter,
    downloadLoading: loading.effects['communicationbill/download'],
    onDownLoad() {
      dispatch({
        type: 'communicationbill/download',
        payload: { ...location.query },
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
  communicationbill: PropTypes.object.isRequired,
  app: PropTypes.object,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ communicationbill, loading, app }) => ({ communicationbill, loading, app }))(IndexPage)
