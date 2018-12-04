import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Echart from './Echart'

const Assignment = ({ location, dispatch, assignment, loading }) => {
  const { list, pagination, echartShow } = assignment
  const { pageSize } = pagination
  console.log('pagination', pagination)
  const listProps = {
    dataSource: list,
    loading: loading.effects['assignment/query'],
    pagination,
    location,
    onChange(page) {
      const { query, pathname } = location
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
    filter: {
      ...location.query,
    },
    echartShow,
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
    onEchartShowChange(value) {
      dispatch({
        type: 'assignment/updateState',
        payload: {
          echartShow: value,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {echartShow && <Echart {...listProps} />}
      {!echartShow && <List {...listProps} />}
    </div>
  )
}

Assignment.propTypes = {
  assignment: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ assignment, loading }) => ({ assignment, loading }))(Assignment)
