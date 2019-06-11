import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { Page } from '../../components'

const IndexPage = ({ app, location, dispatch, backupexpressfeedetail, loading }) => {
  const { list, pagination } = backupexpressfeedetail
  const { query, pathname } = location
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/expressfee'] || {}

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['backupexpressfeedetail/query'],
    pagination,
    location,
    onChange(page, filter) {
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
    onDeleteItem(id) {
      dispatch({
        type: 'backupexpressfeedetail/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'backupexpressfeedetail/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  const { idUser, showName } = location.query

  const filterProps = {
    filter: {
      ...location.query,
    },
    auth,
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          idUser,
          showName,
          page: 1,
          pageSize: 10,
          ...value,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/backupexpressfeedetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/backupexpressfeedetail',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'backupexpressfeedetail/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'backupexpressfeedetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
    </Page>
  )
}

IndexPage.propTypes = {
  backupexpressfeedetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ backupexpressfeedetail, loading, app }) => ({ app, backupexpressfeedetail, loading }))(IndexPage)
