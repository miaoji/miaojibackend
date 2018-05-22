import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import { Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { Page } from '../../../components'

const { TabPane } = Tabs

const Operatorbyname = ({ location, dispatch, operatorbyname, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = operatorbyname
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
        type: `operatorbyname/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'operatorbyname/hideModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['operatorbyname/query'],
    pagination,
    location,
    // onLink(iduser, query){
    // },
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
        type: 'operatorbyname/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'operatorbyname/showModal',
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
          idUser: query.idUser,
          page: 1,
          pageSize: 10,
        },
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'operatorbyname/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'operatorbyname/showModal',
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


Operatorbyname.propTypes = {
  operatorbyname: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ operatorbyname, loading }) => ({ operatorbyname, loading }))(Operatorbyname)
