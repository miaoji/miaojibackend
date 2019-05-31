import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Selectfenpai = ({ location, dispatch, app, selectfenpai, loading }) => {
  const { list, pagination } = selectfenpai
  const { pageSize } = pagination
  const { storeuserList } = app

  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/selectfenpai'] || {}

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['selectfenpai/query'],
    pagination,
    location,
    // onLink(iduser, query){
    // },
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
    onDeleteItem(id) {
      dispatch({
        type: 'selectfenpai/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'selectfenpai/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
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
          pageSize,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/selectfenpai',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/selectfenpai',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'selectfenpai/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'selectfenpai/showModal',
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

Selectfenpai.propTypes = {
  app: PropTypes.array,
  selectfenpai: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ selectfenpai, loading, app }) => ({ selectfenpai, loading, app }))(Selectfenpai)
