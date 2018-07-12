import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tooltip } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'idUser',
      key: 'idUser',
      render: (text) => {
        return <span>{(text || text === 0) ? text : '暂无'}</span>
      },
    }, {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{(text || text === 0) ? text : '暂无'}</span>
      },
    }, {
      title: '第一天签收量',
      dataIndex: 'todayqs',
      key: 'todayqs',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return (
            <Tooltip placement="top" title="查看订单详情">
              <Link to={`/storeSignDetail?tr=1&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{(text || text === 0) ? text : '暂无'}</Link>
            </Tooltip>
          )
        }
        return (
          <Tooltip placement="top" title="查看订单详情">
            <Link to={`/storeSignDetail?tr=1&idUser=${record.idUser}`}>{(text || text === 0) ? text : '暂无'}</Link>
          </Tooltip>
        )
      },
    }, {
      title: '第一天签收率',
      dataIndex: 'qsPercentage',
      key: 'qsPercentage',
      render: (text, record) => {
        return <span>{(Number(record.todayqs) !== 0 && Number(record.todaysf) !== 0) ? `${((record.todayqs / record.todaysf) * 100).toFixed(2)}%` : '0%'}</span>
      },
    }, {
      title: '第二天签收量',
      dataIndex: 'tomorrowqs',
      key: 'tomorrowqs',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return (
            <Tooltip placement="top" title="查看订单详情">
              <Link to={`/storeSignDetail?tr=2&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{(text || text === 0) ? text : '暂无'}</Link>
            </Tooltip>
          )
        }
        return (
          <Tooltip placement="top" title="查看订单详情">
            <Link to={`/storeSignDetail?tr=2&idUser=${record.idUser}`}>{(text || text === 0) ? text : '暂无'}</Link>
          </Tooltip>
        )
      },
    }, {
      title: '第二天签收率',
      dataIndex: 'tomorrowqsPercentage',
      key: 'tomorrowqsPercentage',
      render: (text, record) => {
        return <span>{(Number(record.tomorrowqs) !== 0 && Number(record.todaysf) !== 0) ? `${((record.tomorrowqs / record.todaysf) * 100).toFixed(2)}%` : '0%'}</span>
      },
    }, {
      title: '第三天天签收量',
      dataIndex: 'aftertomorrowqs',
      key: 'aftertomorrowqs',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return (
            <Tooltip placement="top" title="查看订单详情">
              <Link to={`/storeSignDetail?tr=3&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{(text || text === 0) ? text : '暂无'}</Link>
            </Tooltip>
          )
        }
        return (
          <Tooltip placement="top" title="查看订单详情">
            <Link to={`/storeSignDetail?tr=3&idUser=${record.idUser}`}>{(text || text === 0) ? text : '暂无'}</Link>
          </Tooltip>
        )
      },
    }, {
      title: '第三天天签收率',
      dataIndex: 'afternoqsPercentage',
      key: 'afternoqsPercentage',
      render: (text, record) => {
        return <span>{(Number(record.aftertomorrowqs) !== 0 && Number(record.todaysf) !== 0) ? `${((record.aftertomorrowqs / record.todaysf) * 100).toFixed(2)}%` : '0%'}</span>
      },
    }, {
      title: '前三天未签收数',
      dataIndex: 'noSignTotal',
      key: 'noSignTotal',
      render: (text, record) => {
        if (filter.createTime && filter.createTime.length > 0) {
          return (
            <Tooltip placement="top" title="查看订单详情">
              <Link to={`/storeSignDetail?tr=4&idUser=${record.idUser}&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}`}>{(text || text === 0) ? text : '暂无'}</Link>
            </Tooltip>
          )
        }
        return (
          <Tooltip placement="top" title="查看订单详情">
            <Link to={`/storeSignDetail?tr=4&idUser=${record.idUser}`}>{(text || text === 0) ? text : '暂无'}</Link>
          </Tooltip>
        )
      },
    }, {
      title: '前三未签收率',
      dataIndex: 'noqsPercentage',
      key: 'noqsPercentage',
      render: (text, record) => {
        return <span>{(Number(record.noSignTotal) !== 0 && Number(record.todaysf) !== 0) ? `${((record.noSignTotal / record.todaysf) * 100).toFixed(2)}%` : '0%'}</span>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }
  const getBodyWrapper = (body) => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  filter: PropTypes.object,
}

export default List
