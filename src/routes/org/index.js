import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Modular = ({ location, dispatch, org, loading, app }) => {
  const { list, pagination, currentItem, modalVisible, modalType, storeuserList, locationList, orgIdusers, parentOrgList } = org
  const { pageSize } = pagination
  const { storeTotal, storeuserArr } = app

  const modalProps = {
    type: modalType,
    storeuserArr,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['org/create'] || loading.effects['org/update'],
    title: `${modalType === 'create' ? '新增机构信息' : '修改机构信息'}`,
    wrapClassName: 'vertical-center-modal',
    width: '900px',
    maskClosable: false,
    storeuserList,
    locationList,
    orgIdusers,
    parentOrgList,
    onOk(data) {
      dispatch({
        type: `org/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'org/hideModal',
      })
    },
    onGetIdUsers(val) {
      dispatch({
        type: 'org/getIdUsers',
        payload: {
          location: val,
        },
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['org/query'],
    pagination,
    location,
    storeTotal,
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
        type: 'org/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      item.locationType = item.location ? item.location.split(',').length : 4
      dispatch({
        type: 'org/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
          modalorgLevel: item.orgLevel || 1,
        },
      })
      dispatch({ type: 'org/initParentOrgList' })
      // dispatch({
      //   type: 'org/queryRoleList',
      // })
      dispatch({
        type: 'org/orgQueryStoreUser',
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    locationList,
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
        type: 'org/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({ type: 'org/initParentOrgList' })
      dispatch({
        type: 'org/orgQueryStoreUser',
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
  org: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ org, loading, app }) => ({ org, loading, app }))(Modular)
