import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'

const Consume = ({ location, dispatch, consume, loading }) => {
  const { list, pagination, isMotion, selectedRowKeys } = consume

  const listProps = {
    dataSource: list,
    filter: {
      ...location.query,
    },
    loading: loading.effects['consume/query'],
    pagination,
    location,
    isMotion,
    onChange(page, filter) {
      const { query, pathname } = location
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
    onMarkItem(id) {
      dispatch({
        type: 'consume/markBlackList',
        payload: id,
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'consume/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'consume/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onFilterStatus(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
      // dispatch({
      //   type: 'consume/query',
      //   payload:value
      // })
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
        },
      }))
    },
    onAdd() {
      dispatch({
        type: 'consume/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'consume/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'consume/multiDelete',
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

Consume.propTypes = {
  consume: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ consume, loading }) => ({ consume, loading }))(Consume)
