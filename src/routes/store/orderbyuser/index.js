import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { Tabs } from 'antd'
import { Page } from '../../../components'

const { TabPane } = Tabs

const Orderbyuser = ({ location, dispatch, orderbyuser, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = orderbyuser
  const { pageSize } = pagination
  const { query, pathname } = location

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk(data) {
      dispatch({
        type: `orderbyuser/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'orderbyuser/hideModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['orderbyuser/query'],
    pagination,
    location,
    // onLink(iduser, query){
    // },
    onChange(page, filter) {
      console.log(11)
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
        type: 'orderbyuser/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'orderbyuser/showModal',
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
      console.log('1231', value)
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
        pathname: '/orderbyuser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/orderbyuser',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'orderbyuser/download',
        payload: location.query
      })
    },
    onAdd() {
      dispatch({
        type: 'orderbyuser/showModal',
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
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Orderbyuser.propTypes = {
  orderbyuser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ orderbyuser, loading }) => ({ orderbyuser, loading }))(Orderbyuser)
