import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Expressfee = ({ location, dispatch, expressfee, app, loading }) => {
  const { list, pagination } = expressfee
  const { storeuserList } = app

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['expressfee/query'],
    pagination,
    location,
    onLink({ path, payload }) {
      dispatch(routerRedux.push({
        pathname: path,
        query: {
          ...payload,
        },
      }))
    },
    onChange(page, filter) {
      const { query, pathname } = location
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...filter,
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
          pageSize: 10,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/expressfee',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/expressfee',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'expressfee/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'expressfee/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

Expressfee.propTypes = {
  expressfee: PropTypes.object,
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ expressfee, loading, app }) => ({ expressfee, loading, app }))(Expressfee)
