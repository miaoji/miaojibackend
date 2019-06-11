import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const IndexPage = ({ location, dispatch, backupstoreuserdetail, loading }) => {
  const { list, isMotion } = backupstoreuserdetail

  const listProps = {
    list,
    loading,
    filter: {
      ...location.query,
    },
    handleClick(item) {
      const { idUser } = location.query
      if (item.createTime && item.createTime.length > 0) {
        item.createTime = [item.createTime[0]._i, item.createTime[1]._i]
      }
      dispatch(routerRedux.push({
        pathname: '/backupexpressfeedetail',
        query: {
          idUser,
          createTime: item.createTime,
          realName: item.realName,
          showName: location.query.showName,
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

IndexPage.propTypes = {
  backupstoreuserdetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ backupstoreuserdetail, loading }) => ({ backupstoreuserdetail, loading }))(IndexPage)
