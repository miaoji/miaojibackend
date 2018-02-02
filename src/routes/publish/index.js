import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import List from './List'

const Publish = ({ location, dispatch, publish, loading }) => {
  const { list, pagination } = publish


  const listProps = {
    dataSource: list,
    loading: loading.effects['publish/query'],
    pagination,
    location,
    onpublish(data) {
      dispatch({
        type: 'publish/create',
        payload: data
      })
    }
  }

  return (
    <div className="content-inner">
      {/* <Input /> */}
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
