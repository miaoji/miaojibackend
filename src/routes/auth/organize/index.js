import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Modular = ({ location, dispatch, organize, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, storeuserList } = organize
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['organize/update'],
    title: `${modalType === 'create' ? '新增菜单信息' : '修改菜单信息'}`,
    wrapClassName: 'vertical-center-modal',
    storeuserList,
    onOk(data) {
      dispatch({
        type: `organize/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'organize/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['organize/query'],
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
        type: 'organize/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'organize/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
          modalorganizeLevel: item.organizeLevel || 1,
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
          page: 1,
          pageSize,
        },
      }))
    },
    onAdd() {
      dispatch({
        type: 'organize/showModal',
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

Modular.propTypes = {
  organize: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ organize, loading, app }) => ({ organize, loading, app }))(Modular)
