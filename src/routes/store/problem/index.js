import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'

const Problem = ({ location, dispatch, problem, app, loading }) => {
  const { list, pagination } = problem
  const { pageSize } = pagination
  const { storeuserList } = app

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['problem/query'],
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
        type: 'problem/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'problem/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    // 控制可展开的行-执行展开操作但是不执行 原先的效果
    onExpand(onOff, item) {
      if (onOff) {
        dispatch({
          type: 'problem/queryDetail',
          payload: {
            idUser: item.idUser,
            key: item.key,
            ...location.query,
          },
          rowItem: item,
        })
        dispatch({
          type: 'problem/updateState',
          payload: {
            expandedRowKeys: [item.key],
          },
        })
      } else {
        dispatch({
          type: 'problem/updateState',
          payload: {
            expandedRowKeys: [],
          },
        })
      }
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
        pathname: '/problem',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/problem',
      }))
    },
    onDownLoad() {
      dispatch({
        type: 'problem/download',
        payload: location.query,
      })
    },
    onAdd() {
      dispatch({
        type: 'problem/showModal',
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
    </div>
  )
}

Problem.propTypes = {
  app: PropTypes.object,
  problem: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ problem, loading, app }) => ({ problem, loading, app }))(Problem)
