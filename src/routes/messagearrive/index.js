import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const IndexPage = ({ location, dispatch, messagearrive, app, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, sonlist, expandedRowKeys, rowExpandList } = messagearrive
  const { pageSize } = pagination
  const { query, pathname } = location
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/messagearrive'] || {}

  const modalProps = {
    modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['messagearrive/update'],
    title: `${modalType === 'create' ? '新建' : '修改门店用户的通讯费'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `messagearrive/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'messagearrive/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['messagearrive/query'],
    pagination,
    location,
    sonlist,
    rowExpandList,
    expandedLoading: loading.effects['messagearrive/querybrandlist'],
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
        type: 'messagearrive/delete',
        payload: { id, query },
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'messagearrive/showModal',
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
          type: 'messagearrive/updateState',
          payload: {
            expandedRowKeys: [],
            sonlist: {},
          },
        })
        return
      }
      dispatch({
        type: 'messagearrive/updateState',
        payload: {
          expandedRowKeys: [record.id],
        },
      })
      dispatch({
        type: 'messagearrive/querybrandlist',
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
    downloadLoading: loading.effects['messagearrive/download'],
    onDownLoad() {
      dispatch({
        type: 'messagearrive/download',
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
    onAdd() {
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

IndexPage.propTypes = {
  messagearrive: PropTypes.object.isRequired,
  app: PropTypes.object,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ messagearrive, loading, app }) => ({ messagearrive, loading, app }))(IndexPage)
