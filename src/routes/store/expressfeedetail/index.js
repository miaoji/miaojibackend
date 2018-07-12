import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { Page } from '../../../components'

const Expressfeedetail = ({ location, dispatch, expressfeedetail, loading }) => {
  const { list, pagination } = expressfeedetail
  const { query, pathname } = location

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['expressfeedetail/query'],
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
        type: 'expressfeedetail/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'expressfeedetail/showModal',
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
        pathname: '/expressfeedetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/expressfeedetail',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'expressfeedetail/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'expressfeedetail/showModal',
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

Expressfeedetail.propTypes = {
  expressfeedetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ expressfeedetail, loading }) => ({ expressfeedetail, loading }))(Expressfeedetail)
