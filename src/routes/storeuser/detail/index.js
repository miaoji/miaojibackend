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
    filter: {
      ...location.query,
    },
    handleClick(item) {
      const { idUser } = location.query
      dispatch(routerRedux.push({
        pathname: '/operator',
        query: {
          endTime: item.endTime,
          startTime: item.startTime,
          idUser,
          realName: item.realName,
        },
      }))
    },
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
          idUser: location.query.idUser,
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

StoreUserDetail.propTypes = {
  storeUserDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ storeUserDetail, loading }) => ({ storeUserDetail, loading }))(StoreUserDetail)
