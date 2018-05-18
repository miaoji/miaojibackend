import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import { Page } from '../../components'

const { TabPane } = Tabs

const Storeordertotal = ({ location, dispatch, storeordertotal, loading }) => {
  const { list, pagination } = storeordertotal
  const { query, pathname } = location
  const { pageSize } = pagination
  const filterProps = {
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
        pathname: '/storeordertotal',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/storeordertotal',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'storeordertotal/download',
        payload: location.query
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['storeordertotal/query'],
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
    openSelectshelves(idUser) {
      dispatch(routerRedux.push({
        pathname: '/storeordertotal',
        query: {
          idUser,
          startTime: location.query.startTime,
          endTime: location.query.endTime
        },
      }))
    }
  }

  const handleTabClick = (key) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...location.query,
        state: key,
      },
    }))
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Tabs activeKey={query.state || '520'} onTabClick={handleTabClick}>
        <TabPane tab="全部" key={'520'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="上架" key={'101'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="分派" key={'103'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="签收" key={'301'}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="点单" key={'1'}>
          <List {...listProps} />
        </TabPane>
      </Tabs>
    </Page>
  )
}

Storeordertotal.propTypes = {
  storeordertotal: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ storeordertotal, loading }) => ({ storeordertotal, loading }))(Storeordertotal)
