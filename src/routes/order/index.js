import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'

const Order = ({ location, dispatch, order, loading, app }) => {
  const { list, pagination, isMotion, selectedRowKeys } = order
  const { pageSize } = pagination
  const { storeuserList } = app

  const listProps = {
    dataSource: list,
    loading: loading.effects['order/query'],
    pagination,
    location,
    isMotion,
    onChange(page) {
      const { query, pathname } = location
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
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
        type: 'order/markBlackList',
        payload: id,
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'order/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'order/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
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
        pathname: '/order',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/order',
      }))
    },
    onAdd() {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'order/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'order/multiDelete',
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

Order.propTypes = {
  order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ order, loading, app }) => ({ order, loading, app }))(Order)
