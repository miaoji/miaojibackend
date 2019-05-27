import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const IndexPage = ({ location, dispatch, communicationbill, app, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, sonlist, expandedRowKeys, rowExpandList } = communicationbill
  const { pageSize } = pagination
  const { query, pathname } = location
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/communicationbill'] || {}

  const modalProps = {
    modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['communicationbill/update'],
    title: `${modalType === 'create' ? '新建' : '修改门店用户的通讯费'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `communicationbill/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'communicationbill/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['communicationbill/query'],
    pagination,
    location,
    sonlist,
    rowExpandList,
    expandedLoading: loading.effects['communicationbill/querybrandlist'],
    expandedRowKeys,
    onChange(page) {
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'communicationbill/delete',
        payload: { id, query },
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'communicationbill/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    // 控制可展开的行-执行展开操作但是不执行 原先的效果
    onExpand(onOff, record) {
      if (onOff === false) {
        dispatch({
          type: 'communicationbill/updateState',
          payload: {
            expandedRowKeys: [],
            sonlist: {},
          },
        })
        return
      }
      dispatch({
        type: 'communicationbill/updateState',
        payload: {
          expandedRowKeys: [record.id],
        },
      })
      dispatch({
        type: 'communicationbill/querybrandlist',
        payload: {
          ...location.query,
          userIds: record.id,
        },
      })
    },
  }

  const filterProps = {
    auth,
    storeuserList,
    filter: {
      ...location.query,
    },
    downloadLoading: loading.effects['communicationbill/download'],
    onDownLoad() {
      dispatch({
        type: 'communicationbill/download',
        payload: { ...location.query },
      })
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
        pathname: '/storeuser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/storeuser',
      }))
    },
    onAdd() {
      dispatch({
        type: 'storeuser/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'storeuser/switchIsMotion' })
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

IndexPage.propTypes = {
  communicationbill: PropTypes.object.isRequired,
  app: PropTypes.object,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ communicationbill, loading, app }) => ({ communicationbill, loading, app }))(IndexPage)
