import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Modular = ({ location, dispatch, menu, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, modalMenuLevel, mpidOption } = menu
  const { pageSize = 100 } = pagination
  const modalProps = {
    type: modalType,
    modalMenuLevel,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['menu/update'],
    title: `${modalType === 'create' ? '新增菜单信息' : '修改菜单信息'}`,
    wrapClassName: 'vertical-center-modal',
    mpidOption,
    onOk(data) {
      dispatch({
        type: `menu/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'menu/hideModal',
      })
    },
    onUpdateState(payload) {
      if (payload.modalMenuLevel === 2 || payload.modalMenuLevel === 3) {
        dispatch({
          type: 'menu/queryMPidOption',
          payload: {
            menuLevel: payload.modalMenuLevel - 1,
          },
        })
      }
      dispatch({
        type: 'menu/updateState',
        payload: {
          ...payload,
        },
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['menu/query'],
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
        type: 'menu/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      if (item.menuLevel === 2 || item.menuLevel === 3) {
        dispatch({
          type: 'menu/queryMPidOption',
          payload: {
            menuLevel: item.menuLevel - 1,
          },
        })
      }
      dispatch({
        type: 'menu/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
          modalMenuLevel: item.menuLevel || 1,
        },
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    updateLoading: loading.effects['menu/updateAdminOrangeize'],
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
        type: 'menu/showModal',
        payload: {
          modalType: 'create',
          modalMenuLevel: 1,
        },
      })
    },
    onUpdateAdminOrangeize() {
      dispatch({
        type: 'menu/updateAdminOrangeize',
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
  menu: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ menu, loading }) => ({ menu, loading }))(Modular)
