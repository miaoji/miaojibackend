import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const PageIndex = ({ location, dispatch, bankcard, loading, app }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = bankcard
  const { pageSize } = pagination
  const { storeuserList, user: { sourceMenuList } } = app
  const auth = sourceMenuList['/bankcard'] || {}

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['bankcard/update'] || loading.effects['bankcard/create'],
    title: `${modalType === 'create' ? '新增环迅账号记录' : '修改环迅账号记录'}`,
    wrapClassName: 'vertical-center-modal',
    storeuserList,
    width: '700px',
    onOk(data) {
      dispatch({
        type: `bankcard/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'bankcard/hideModal',
      })
    },
  }

  const listProps = {
    auth,
    dataSource: list,
    loading: loading.effects['bankcard/query'],
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
        type: 'bankcard/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'bankcard/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    auth,
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/bankcard',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/bankcard',
      }))
    },
    onAdd() {
      dispatch({
        type: 'bankcard/showModal',
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

PageIndex.propTypes = {
  bankcard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ bankcard, loading, app }) => ({ bankcard, loading, app }))(PageIndex)
