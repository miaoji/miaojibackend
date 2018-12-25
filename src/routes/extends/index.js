import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const PageIndex = ({ location, dispatch, extendsss, loading, app }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = extendsss
  const { pageSize } = pagination
  const { storeuserList } = app

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['extendsss/update'] || loading.effects['extendsss/create'],
    title: `${modalType === 'create' ? '新增黑名单信息' : '修改黑名单信息'}`,
    wrapClassName: 'vertical-center-modal',
    storeuserList,
    onOk(data) {
      dispatch({
        type: `extendsss/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'extendsss/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['extendsss/query'],
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
        type: 'extendsss/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'extendsss/showModal',
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
        pathname: '/extendsss',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/extendsss',
      }))
    },
    onAdd() {
      dispatch({
        type: 'extendsss/showModal',
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
  extendsss: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ extendsss, loading, app }) => ({ extendsss, loading, app }))(PageIndex)
