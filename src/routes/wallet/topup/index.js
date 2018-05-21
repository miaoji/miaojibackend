import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'

const TopUp = ({ location, dispatch, topup, loading }) => {
  const { list, pagination, isMotion, selectedRowKeys } = topup
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['topup/query'],
    pagination,
    location,
    isMotion,
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
    onMarkItem(id) {
      dispatch({
        type: 'topup/markBlackList',
        payload: id,
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'topup/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'topup/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
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
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/topup',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/topup',
      }))
    },
    onAdd() {
      dispatch({
        type: 'topup/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'topup/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'topup/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${selectedRowKeys.length} 个微信用户 `}
            <Popconfirm title={'确定将这些用户打入黑名单吗?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>标记黑名单</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
    </div>
  )
}

TopUp.propTypes = {
  topup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ topup, loading }) => ({ topup, loading }))(TopUp)
