import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Wxuser = ({ location, dispatch, wxuser, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = wxuser
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['wxuser/update'],
    title: `${modalType === 'create' ? 'Create wxuser' : 'Update wxuser'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `wxuser/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'wxuser/hideModal',
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['wxuser/query'],
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
        type: 'wxuser/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'wxuser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'wxuser/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
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
        pathname: '/wxuser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/wxuser',
      }))
    },
    onAdd() {
      dispatch({
        type: 'wxuser/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'wxuser/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'wxuser/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Wxuser.propTypes = {
  wxuser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ wxuser, loading }) => ({ wxuser, loading }))(Wxuser)
