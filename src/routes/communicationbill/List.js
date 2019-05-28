import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'

const Text = ({ children, color }) => {
  return <span style={{ color: color || '#333' }}>{children}</span>
}

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
}

const List = ({ location, filter, ...tableProps }) => {
  const timeParams = filter.createTime && filter.createTime.length > 0 ? `&createTime=${filter.createTime[0].format('YYYY-MM-DD')}&createTime=${filter.createTime[1].format('YYYY-MM-DD')}` : ''
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => {
        return <Text>{text}</Text>
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
      render: (_, record) => {
        return <Text>{record.province ? `${record.province}/${record.city}/${record.district}` : '暂无'}</Text>
      },
    }, {
      title: '发送短信条数',
      dataIndex: 'communicateNum',
      key: 'communicateNum',
      render: (text) => {
        return <Text color="#67C23A">{text}</Text>
      },
    }, {
      title: '总计消费通讯费',
      dataIndex: 'money',
      key: 'money',
      render: (_, record) => {
        return <Text color="#67C23A">{record.communicateNum ? (record.communicateNum * 0.035).toFixed(3) : '0'}</Text>
      },
    }, {
      title: '查看明细',
      dataIndex: 'option',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => {
        return <Link to={`/communicationbilldetail?name=${record.id}///${record.name}${timeParams}`}>查看</Link>
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object.isRequired,
  filter: PropTypes.object,
}

export default List
