import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Storeuser = ({ location, dispatch, storeuser, loading }) => {
  const { list, sonlist, columnslist, pagination, currentItem, modalVisible, modalType, isMotion, expandedRowKeys } = storeuser
  const { pageSize } = pagination
  const { query, pathname } = location

  const modalProps = {
    modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['storeuser/update'],
    title: `${modalType === 'create' ? '新建' : '修改门店用户的通讯费'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `storeuser/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'storeuser/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    columnslist,
    sonlist,
    filter: { ...location.query },
    loading: loading.effects['storeuser/query'],
    rowLoading: loading.effects['storeuser/unfold'],
    pagination,
    location,
    expandedRowKeys,
    isMotion,
    onChange(page) {
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
        type: 'storeuser/delete',
        payload: { id, query },
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'storeuser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onVersionSwitching(item) {
      dispatch({
        type: 'storeuser/showModal',
        payload: {
          modalType: 'versionswitch',
          currentItem: item,
        },
      })
    },
    // 控制可展开的行-执行展开操作但是不执行 原先的效果
    onExpand(onOff, record) {
      if (onOff === false) {
        dispatch({
          type: 'storeuser/updateState',
          payload: {
            expandedRowKeys: [],
          },
        })
        return
      }
      dispatch({
        type: 'storeuser/unfold',
        payload: {
          superId: record.id,
        },
      })
      // dispatch({
      //   type: 'storeuser/updateState',
      //   payload: {
      //     expandedRowKeys: [],
      //   },
      // })
    },
  }

  const filterProps = {
    isMotion,
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

Storeuser.propTypes = {
  storeuser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ storeuser, loading }) => ({ storeuser, loading }))(Storeuser)
