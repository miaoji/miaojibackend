import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Qr = ({ app, location, dispatch, qr, loading }) => {
  const { list, parameterOption, pagination, currentItem, modalVisible, modalType } = qr
  const { pageSize } = pagination
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/qr'] || {}

  const modalProps = {
    type: modalType,
    parameterOption,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增二维码' : '修改二维码'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `qr/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'qr/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['qr/query'],
    pagination,
    location,
    auth,
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
        type: 'qr/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'qr/showModal',
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
        pathname: '/qr',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/qr',
      }))
    },
    onAdd() {
      dispatch({
        type: 'qr/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'qr/getParameterOption',
      })
    },
    switchIsMotion() {
      dispatch({ type: 'qr/switchIsMotion' })
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

Qr.propTypes = {
  qr: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ app, qr, loading }) => ({ app, qr, loading }))(Qr)
