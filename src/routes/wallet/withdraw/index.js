import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const WithDraw = ({ location, dispatch, withdraw, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = withdraw
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '提现审核' : '提现审核'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `withdraw/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'withdraw/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['withdraw/query'],
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
    onWithdrawalClick(record) {
      dispatch({
        type: 'withdraw/showModal',
        payload: {
          modalType: 'cashWithdraw',
          currentItem: { ...record },
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/withdraw',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/withdraw',
      }))
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

WithDraw.propTypes = {
  withdraw: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ withdraw, loading }) => ({ withdraw, loading }))(WithDraw)
