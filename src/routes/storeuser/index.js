import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Storeuser = ({ location, dispatch, storeuser, loading, app }) => {
  const {
    orgTree,
    list,
    sonlist,
    columnslist,
    pagination,
    currentItem,
    modalVisible,
    modalType,
    isMotion,
    expandedRowKeys,
    locationData,
    monitorList,
  } = storeuser
  const { pageSize } = pagination
  const { query, pathname } = location
  const { storeuserList } = app

  const modalProps = {
    modalType,
    monitorList,
    item: modalType === 'create' ? {} : currentItem,
    contentLoading: loading.effects['storeuser/queryMonitor'],
    monitorAddLoading: loading.effects['storeuser/monitor'],
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['storeuser/update'],
    title: `${modalType === 'create' ? '新建' : '修改门店用户的通讯费'}`,
    wrapClassName: 'vertical-center-modal',
    locationData,
    orgTree,
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
    onMonitorClick(item) {
      dispatch({
        type: 'storeuser/showModal',
        payload: {
          modalType: 'monitor',
          currentItem: item,
        },
      })
      dispatch({
        type: 'storeuser/queryMonitor',
        payload: {
          idUser: item.id,
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
    filter: {
      ...location.query,
    },
    storeuserList,
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
    handleCreate() {
      dispatch({
        type: 'storeuser/getOrgList',
      })
      dispatch({
        type: 'storeuser/handleLocation',
      })
      dispatch({
        type: 'storeuser/showModal',
        payload: {
          modalType: 'create',
        },
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

Storeuser.propTypes = {
  storeuser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
  app: PropTypes.object,
}

export default connect(({ storeuser, loading, app }) => ({ storeuser, loading, app }))(Storeuser)
