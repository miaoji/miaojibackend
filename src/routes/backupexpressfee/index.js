import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, backupexpressfee, app, loading }) => {
  const { list, pagination } = backupexpressfee
  const { storeuserList, user: { sourceMenuList } } = app
  const auth = sourceMenuList['/backupexpressfee'] || { seeDetail: true, seeOperatorDetail: true }

  const listProps = {
    filter: {
      ...location.query,
    },
    auth,
    dataSource: list,
    loading: loading.effects['backupexpressfee/query'],
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
    auth,
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
        pathname: '/backupexpressfee',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/backupexpressfee',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'backupexpressfee/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'backupexpressfee/showModal',
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

IndexPage.propTypes = {
  backupexpressfee: PropTypes.object,
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ backupexpressfee, loading, app }) => ({ backupexpressfee, loading, app }))(IndexPage)
