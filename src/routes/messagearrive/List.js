import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'

const channelContrast = [
  {
    name: '快宝',
    key: 1,
    successKey: 'KSucceeCount',
    errorKey: 'KErrorCount',
  }, {
    name: '富媒体',
    key: 2,
    successKey: 'FSucceeCount',
    errorKey: 'FErrorCount',
  }, {
    name: '欣易辰',
    key: 3,
    successKey: 'XSucceeCount',
    errorKey: 'XErrorCount',
  }, {
    name: '海雕',
    key: 4,
    successKey: 'HSucceeCount',
    errorKey: 'HErrorCount',
  },
]

const Text = ({ children, color }) => {
  return <span style={{ color: color || '#333' }}>{children}</span>
}

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
}

const List = ({ expandedLoading, expandedRowKeys, location, rowExpandList, ...tableProps }) => {
  const optionPosition = expandedRowKeys.length === 0
  const filter = location.query
  const timeParams = filter.createTime && filter.createTime.length > 0 ? `&createTime=${filter.createTime[0]._i}&createTime=${filter.createTime[1]._i}` : ''
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text, record) => {
        return <Link to={`/messagearrivedetail?name=${`${record.id}///${record.name}`}${timeParams}`}>{text}</Link>
      },
    }, {
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '站点地址',
      dataIndex: 'address',
      key: 'address',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '发送成功',
      dataIndex: 'a',
      key: 'a',
      render: (text) => {
        return <Text color="#67C23A">{text}</Text>
      },
    }, {
      title: '发送失败',
      dataIndex: 'b',
      key: 'b',
      render: (text) => {
        return <Text color="#F56C6C">{text}</Text>
      },
    }, {
      title: '发送总计',
      dataIndex: 'pourOut',
      key: 'pourOut',
      render: (_, record) => {
        const { a, b } = record
        return (<Text color="#409EFF">{a + b}</Text>)
      },
    }, {
      title: '查看明细',
      dataIndex: 'option',
      key: 'option',
      width: 120,
      fixed: optionPosition ? 'right' : undefined,
      render: (_, record) => {
        return <Link to={`/messagearrivedetail?name=${`${record.id}///${record.name}`}${timeParams}`}>查看</Link>
      },
    },
  ]

  return (
    <div>
      <Table
        {...{ ...tableProps, expandedRowKeys }}
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        expandedRowRender={(record) => {
          if (expandedLoading) {
            return <Spin />
          }
          if (Object.keys(rowExpandList).length === 0) {
            return <span>暂无数据</span>
          }
          return (
            <div className={styles.rowRender}>
              {channelContrast.map((i, key) => {
                return (
                  <div key={key}>
                    <p>
                      <span>{i.name}:</span>
                      <span>发送成功 : {rowExpandList[i.successKey]}</span>
                      <span>发送失败 : {rowExpandList[i.errorKey]}</span>
                      <span>发送共计 : {rowExpandList[i.successKey] + rowExpandList[i.errorKey]}</span>
                      <span><Link to={`/messagearrivedetail?key=${i.key}&name=${`${record.id}///${record.name}`}${timeParams}`}>查看明细</Link></span>
                    </p>
                  </div>
                )
              })}
            </div>
          )
        }}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object.isRequired,
  expandedLoading: PropTypes.bool,
  rowExpandList: PropTypes.object,
  expandedRowKeys: PropTypes.array,
}

export default List
