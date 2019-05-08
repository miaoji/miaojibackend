import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Blacklist = ({ location, dispatch, blacklist, loading, app }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = blacklist
  const { pageSize } = pagination
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/blacklist'] || {}

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['blacklist/update'] || loading.effects['blacklist/create'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    storeuserList,
    onOk(data) {
      dispatch({
        type: `blacklist/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'blacklist/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    auth,
    loading: loading.effects['blacklist/query'],
    pagination,
    location,
    onChange(page) {
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
    onDeleteItem(id) {
      dispatch({
        type: 'blacklist/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'blacklist/showModal',
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
    auth,
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
    onAdd() {
      dispatch({
        type: 'blacklist/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onExport() {
      dispatch({
        type: 'blacklist/export',
        payload: {
          ...location.query,
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

Blacklist.propTypes = {
  blacklist: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ blacklist, loading, app }) => ({ blacklist, loading, app }))(Blacklist)
