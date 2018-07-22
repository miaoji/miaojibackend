import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const BusinessvolumeDetail = ({ location, dispatch, businessvolumeDetail, loading }) => {
  const { list, pagination, isMotion } = businessvolumeDetail
  const { query, pathname } = location
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['businessvolumeDetail/query'],
    pagination,
    location,
    isMotion,
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
    onDeleteItem(id) {
      dispatch({
        type: 'businessvolume/delete',
        payload: { id, query },
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'businessvolume/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    onDownLoad() {
      dispatch({
        type: 'businessvolume/download',
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/storeuser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/storeuser',
      }))
    },
    onAdd() {
      dispatch({
        type: 'storeuser/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'storeuser/switchIsMotion' })
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
}

export default connect(({ businessvolumeDetail, loading }) => ({ businessvolumeDetail, loading }))(BusinessvolumeDetail)
