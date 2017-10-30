import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Consume = ({ location, dispatch, consume, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = consume
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['storeUser/update'],
    title: `${modalType === 'create' ? '创建门店' : '更新门店'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `storeUser/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'storeUser/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    filter: {
      ...location.query,
    },
    loading: loading.effects['storeUser/query'],
    pagination,
    location,
    isMotion,
    onChange (page,filter) {
      const { query, pathname } = location
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
    onMarkItem (id) {
      dispatch({
        type: 'storeUser/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'storeUser/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'storeUser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onFilterStatus (value) {
      console.log('index接收的---',value)
      console.log('...value转换的数据---', {...value})
      console.log('location',location.pathname)
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
      // dispatch({
      //   type: 'consume/query',
      //   payload:value
      // })
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      console.log(23234)
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    },
    // onSearch (fieldsValue) {
    //   fieldsValue.keyword.length ? dispatch(routerRedux.push({
    //     pathname: '/storeUser',
    //     query: {
    //       field: fieldsValue.field,
    //       keyword: fieldsValue.keyword,
    //     },
    //   })) : dispatch(routerRedux.push({
    //     pathname: '/storeUser',
    //   }))
    // },
    onAdd () {
      dispatch({
        type: 'storeUser/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'storeUser/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'storeUser/multiDelete',
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
               {`选中 ${selectedRowKeys.length} 个微信用户 `}
               <Popconfirm title={'确定将这些用户打入黑名单吗?'} placement="left" onConfirm={handleDeleteItems}>
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>标记黑名单</Button>
               </Popconfirm>
             </Col>
           </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Consume.propTypes = {
  consume: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ consume, loading }) => ({ consume, loading }))(Consume)
