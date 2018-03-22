import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
import List from './List'
import { Page } from '../../components'
import queryString from 'query-string'

const { TabPane } = Tabs

const EnumPostStatus = {
  UNPUBLISH: 1,
  PUBLISHED: 2,
  SSS: 3,
  BBB: 4,
}

const Storeordertotal = ({ location, dispatch, storeordertotal, loading }) => {
  const { list, pagination } = storeordertotal
  const { query, pathname } = location

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
        pathname: '/storeorderinfo',
        query: {
          idUser,
          startTime: location.query.startTime,
          endTime: location.query.endTime
        },
      }))
    },
    openSentalong(idUser) {
      dispatch(routerRedux.push({
        pathname: '/storeallot',
        query: {
          idUser,
          startTime: location.query.startTime,
          endTime: location.query.endTime
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'storeordertotal/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'storeordertotal/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const handleTabClick = (key) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        status: key,
      }),
    }))
  }

  return (
    <Page inner>
      <Tabs activeKey={query.status === String(EnumPostStatus.UNPUBLISH) ? String(EnumPostStatus.UNPUBLISH) : String(EnumPostStatus.PUBLISHED)} onTabClick={handleTabClick}>
        <TabPane tab="上架" key={String(EnumPostStatus.PUBLISHED)}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="分派" key={String(EnumPostStatus.UNPUBLISH)}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="签收" key={String(EnumPostStatus.SSS)}>
          <List {...listProps} />
        </TabPane>
        <TabPane tab="点单" key={String(EnumPostStatus.BBB)}>
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
