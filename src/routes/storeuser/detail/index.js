import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const StoreUserDetail = ({ location, dispatch, storeUserDetail, loading }) => {
  const { list, isMotion } = storeUserDetail

  const listProps = {
    list,
    loading,
    handleClick(item) {
      const { name } = location.query
      console.log('name', name)
      dispatch(routerRedux.push({
        pathname: '/operator',
        query: {
          name: '四季绿城3号门',
          realName: item.realName
        },
      }))
      console.log('name', name)
      console.log(item)
    }
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/storeUserDetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/storeUserDetail',
      }))
    },
    onAdd() {
      dispatch({
        type: 'storeUserDetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'storeUserDetail/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

StoreUserDetail.propTypes = {
  storeUserDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ storeUserDetail, loading }) => ({ storeUserDetail, loading }))(StoreUserDetail)
