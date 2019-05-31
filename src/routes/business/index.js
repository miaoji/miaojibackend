import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import { Page } from '../../components'

const { TabPane } = Tabs

const Business = ({ location, dispatch, business, app, loading }) => {
  const { list, sonlist, pagination, expandedRowKeys } = business
  const { query, pathname } = location
  const { storeuserList } = app

  const listProps = {
    filter: {
      ...location.query,
    },
    sonlist,
    expandedRowKeys,
    onExpandedRowsChange(value) {
      const key = value.pop()
      dispatch({
        type: 'business/setSiteName',
        payload: {
          expandedRowKeys: [key],
        },
      })
      dispatch({
        type: 'business/getOperator',
        payload: {
          idUser: key,
          mailtype: location.query.mailtype || 0,
          createTime: query.createTime || [],
        },
      })
    },
    dataSource: list,
    loading: loading.effects['business/query'],
    rowLoading: loading.effects['business/getOperator'],
    pagination,
    location,
    onChange(page, filter) {
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
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
    storeuserList,
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
        payload: { ...location.query },
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
    if (location.query.createTime && location.query.createTime.length > 0) {
      location.query.createTime[0] = location.query.createTime[0].format('YYYY-MM-DD')
      location.query.createTime[1] = location.query.createTime[1].format('YYYY-MM-DD')
    }
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...location.query,
        mailtype: key,
        page: 1,
        pageSize: 10,
      },
    }))
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Tabs activeKey={query.mailtype || '0'} onTabClick={handleTabClick}>
        {/* <TabPane tab="全部" key={9}>
          <List {...listProps} />
        </TabPane> */}
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
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ business, loading, app }) => ({ business, loading, app }))(Business)
