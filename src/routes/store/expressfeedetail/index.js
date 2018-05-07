import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import { Tabs } from 'antd'
import { Page } from '../../../components'

const { TabPane } = Tabs

const Expressfeedetail = ({ location, dispatch, expressfeedetail, loading }) => {
  const { list, pagination } = expressfeedetail
  const { query, pathname } = location

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['expressfeedetail/query'],
    pagination,
    location,
    onChange(page, filter) {
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
    onDeleteItem(id) {
      dispatch({
        type: 'expressfeedetail/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'expressfeedetail/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  const { payType, idUser } = location.query

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          payType,
          idUser,
          ...value
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/expressfeedetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/expressfeedetail',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'expressfeedetail/download',
        payload: location.query
      })
    },
    onAdd() {
      dispatch({
        type: 'expressfeedetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  const handleTabClick = (key) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...location.query,
        payType: key,
      },
    }))
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Tabs activeKey={query.payType || '1'} onTabClick={handleTabClick}>
        <TabPane tab="支付宝" key={1}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="微信" key={2}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="余额" key={3}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="现金" key={4}>
          <List {...listProps} />
        </TabPane>
      </Tabs>
    </Page>
  )
}

Expressfeedetail.propTypes = {
  expressfeedetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ expressfeedetail, loading }) => ({ expressfeedetail, loading }))(Expressfeedetail)
