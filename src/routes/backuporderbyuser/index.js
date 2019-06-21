import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Tabs } from 'antd'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { Page } from '../../components'

const { TabPane } = Tabs

const IndexPage = ({ location, dispatch, backuporderbyuser, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = backuporderbyuser
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
        type: `backuporderbyuser/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'backuporderbyuser/hideModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['backuporderbyuser/query'],
    pagination,
    location,
    // onLink(iduser, query){
    // },
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
        type: 'backuporderbyuser/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'backuporderbyuser/showModal',
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
          realName: query.realName,
          idUser: query.idUser,
          mailtype: query.mailtype,
          page: 1,
          pageSize: 10,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/backuporderbyuser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/backuporderbyuser',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'backuporderbyuser/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'backuporderbyuser/showModal',
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
      },
    }))
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <Tabs activeKey={query.mailtype || '0'} onTabClick={handleTabClick}>
        <TabPane tab="普通件" key={0}>
          <List {...listProps} mailtype={0} />
        </TabPane>
        <TabPane tab="到付件" key={1}>
          <List {...listProps} mailtype={1} />
        </TabPane>
        <TabPane tab="代收货款" key={2}>
          <List {...listProps} mailtype={2} />
        </TabPane>
      </Tabs>
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

IndexPage.propTypes = {
  backuporderbyuser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ backuporderbyuser, loading }) => ({ backuporderbyuser, loading }))(IndexPage)