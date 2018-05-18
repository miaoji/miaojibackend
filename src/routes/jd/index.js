import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import JdModal from './JdModal'

const Jd = ({ location, dispatch, jd, loading }) => {
  const { list, jdconfig, pagination, currentItem, modalVisible, jdModalVisible, modalType, selectSiteName } = jd
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '填充单号池' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk(data) {
      dispatch({
        type: `jd/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'jd/hideModal',
      })
    },
  }

  const jdModalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: jdModalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '设置京东分配比例' : '设置京东分配比例'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk(data) {
      dispatch({
        type: 'jd/setjdconfig',
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'jd/hideJdModal',
      })
    },
  }

  const listProps = {
    list,
    jdconfig,
    loading: loading.effects['jd/query']
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onRefresh() {
      dispatch(routerRedux.push({
        pathname: '/jd',
      }))
    },
    onSetJdConfig() {
      dispatch({
        type: 'jd/showJdModal'
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
        pathname: '/jd',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/jd',
      }))
    },
    onDownLoad(payload) {
      dispatch({
        type: 'jd/download',
        payload
      })
    },
    onAdd() {
      dispatch({
        type: 'jd/showModal',
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
      {jdModalVisible && <JdModal {...jdModalProps} />}
    </div>
  )
}

Jd.propTypes = {
  jd: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ jd, loading }) => ({ jd, loading }))(Jd)
