import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const IndexPage = ({ app, location, dispatch, backupselectpjjeDetails, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectSiteName } = backupselectpjjeDetails

  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/selectfenpai'] || {}

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['backupselectpjjeDetails/update'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectSiteName,
    onOk(data) {
      dispatch({
        type: `backupselectpjjeDetails/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'backupselectpjjeDetails/hideModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['backupselectpjjeDetails/query'],
    pagination,
    location,
    // onLink(iduser, query){
    // },
    onChange(page, filter) {
      const { query, pathname } = location
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...filter,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'backupselectpjjeDetails/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'backupselectpjjeDetails/showModal',
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
          idUser: location.query.idUser,
          page: 1,
          pageSize: 10,
        },
      }))
    },
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/backupselectpjjeDetails',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/backupselectpjjeDetails',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'backupselectpjjeDetails/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'backupselectpjjeDetails/showModal',
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
  backupselectpjjeDetails: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ app, backupselectpjjeDetails, loading }) => ({ app, backupselectpjjeDetails, loading }))(IndexPage)
