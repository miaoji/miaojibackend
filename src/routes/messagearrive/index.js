import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import { defaultTime } from '../../utils'

const IndexPage = ({ location, dispatch, messagearrive, app, loading }) => {
  const { list, pagination, expandedRowKeys, rowExpandList } = messagearrive
  const { pageSize } = pagination
  const { query, pathname } = location
  const { storeuserList } = app
  const { user: { sourceMenuList } } = app
  const auth = sourceMenuList['/messagearrive'] || {}
  const filter = defaultTime({ ...location.query })

  const listProps = {
    dataSource: list,
    filter,
    loading: loading.effects['messagearrive/query'],
    pagination,
    location,
    rowExpandList,
    expandedLoading: loading.effects['messagearrive/expand'],
    expandedRowKeys,
    onChange(page) {
      if (query.createTime && query.createTime.length > 0) {
        query.createTime[0] = query.createTime[0].format('YYYY-MM-DD')
        query.createTime[1] = query.createTime[1].format('YYYY-MM-DD')
      }
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    // 控制可展开的行-执行展开操作但是不执行 原先的效果
    onExpand(onOff, record) {
      if (onOff === false) {
        dispatch({
          type: 'messagearrive/updateState',
          payload: {
            expandedRowKeys: [],
            sonlist: {},
          },
        })
        return
      }
      dispatch({
        type: 'messagearrive/updateState',
        payload: {
          expandedRowKeys: [record.id],
        },
      })
      dispatch({
        type: 'messagearrive/expand',
        payload: {
          ...location.query,
          idUser: record.id,
        },
      })
    },
  }

  const filterProps = {
    filter,
    auth,
    storeuserList,
    downloadLoading: loading.effects['messagearrive/download'],
    onDownLoad() {
      dispatch({
        type: 'messagearrive/download',
        payload: { ...location.query },
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
    onAdd() {
      dispatch({
        type: 'storeuser/showModal',
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

IndexPage.propTypes = {
  messagearrive: PropTypes.object.isRequired,
  app: PropTypes.object,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ messagearrive, loading, app }) => ({ messagearrive, loading, app }))(IndexPage)
