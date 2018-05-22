import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import { Page } from '../../../components'

const { TabPane } = Tabs

const Business = ({ location, dispatch, business, loading }) => {
  const { list, sonlist, pagination, expandedRowKeys } = business
  const { query, pathname } = location

  const listProps = {
    filter: {
      ...location.query,
    },
    sonlist,
    expandedRowKeys,
    onExpandedRowsChange(value) {
      dispatch({
        type: 'business/getOperator',
        payload: {
          idUser: value.pop(),
          mailtype: location.query.mailtype || 0,
        },
      })
    },
    dataSource: list,
    loading: loading.effects['business/query'],
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
        type: 'business/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'business/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          mailtype: query.mailtype,
          page: 1,
          pageSize: 10,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/business',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/business',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'business/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'business/showModal',
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
        mailtype: key,
      },
    }))
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Tabs activeKey={query.mailtype || '0'} onTabClick={handleTabClick}>
        <TabPane tab="普通件" key={0}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="到付件" key={1}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="代收货款" key={2}>
          <List {...listProps} />
        </TabPane>
      </Tabs>
    </Page>
  )
}

Business.propTypes = {
  business: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ business, loading }) => ({ business, loading }))(Business)
