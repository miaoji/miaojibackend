import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popover } from 'antd'
import moment from 'moment'
import styles from './List.less'

const Text = ({ text, title = '信息' }) => {
  const content = <div style={{ maxWidth: '450px', wordBreak: 'break-word' }}>{text}</div>
  return (
    <Popover placement="bottom" content={content} title={title} trigger="hover">
      <span style={{ color: '#108ee9', cursor: 'pointer' }}>查看</span>
    </Popover>
  )
}

Text.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
}
const List = ({ auth, location, ...tableProps }) => {
  const name = location.query.name ? location.query.name.split('///')[1] : '/'
  const columns = [
    {
      title: '门店ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    },
    {
      title: '门店名称',
      dataIndex: 'userName',
      key: 'userName',
      render: () => {
        return <span>{name}</span>
      },
    }, {
      title: '订单编号',
      dataIndex: 'communicatea',
      key: 'communicatea',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '接收手机号',
      dataIndex: 'communicateb',
      key: 'communicateb',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '发送状态',
      dataIndex: 'communicate',
      key: 'communicate',
      render: (text) => {
        return <span>{text || '成功'}</span>
      },
    }, {
      title: '通道',
      dataIndex: 'mesCount',
      key: 'mesCount',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '操作人',
      dataIndex: 'communicatec',
      key: 'communicatec',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '发送时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return <span>{text ? moment(text / 1).format('YYYY-MM-DD HH:mm:ss') : '暂无'}</span>
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={styles.table}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        expandedRowRender={() => {
          return <p className={styles.expanded}>失败原因: 暂无</p>
        }}
      />
    </div>
  )
}

List.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.object,
}

export default List
