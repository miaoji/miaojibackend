import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Blacklist = ({ location, dispatch, blacklist, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = blacklist
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk (data) {
      dispatch({
        type: `blacklist/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'blacklist/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['blacklist/query'],
    pagination,
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'blacklist/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'blacklist/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type: 'blacklist/getSiteName',
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/blacklist',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/blacklist',
      }))
    },
    onAdd () {
      dispatch({
        type: 'blacklist/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'blacklist/getSiteName',
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Blacklist.propTypes = {
  blacklist: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ blacklist, loading }) => ({ blacklist, loading }))(Blacklist)
