import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'

const Publish = ({ location, dispatch, publish, loading }) => {
  const { list, pagination } = publish


  const listProps = {
    dataSource: list,
    loading: loading.effects['publish/query'],
    pagination,
    location,
    onChange (page) {
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
    onDeleteItem (id) {
      dispatch({
        type: 'publish/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'publish/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type: 'publish/getSiteName',
      })
    },
  }

  return (
    <div className="content-inner">
      <List {...listProps} />
    </div>
  )
}

Publish.propTypes = {
  publish: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ publish, loading }) => ({ publish, loading }))(Publish)
