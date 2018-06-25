import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Articles = ({ location, dispatch, articles, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = articles
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['articles/update'],
    title: `${modalType === 'create' ? 'Create articles' : 'Update articles'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `articles/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'articles/hideModal',
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['articles/query'],
    pagination,
    location,
    isMotion,
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
        type: 'articles/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'articles/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  const filterProps = {
    isMotion,
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
        pathname: '/articles',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/articles',
      }))
    },
    onAdd() {
      dispatch(routerRedux.push({
        pathname: '/publish',
      }))
    },
    switchIsMotion() {
      dispatch({ type: 'articles/switchIsMotion' })
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

Articles.propTypes = {
  articles: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ articles, loading }) => ({ articles, loading }))(Articles)
