import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import { DropOption } from '../../components'

const List = ({ auth, onWithdrawalClick, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onWithdrawalClick(record)
        break
      default:
        break
    }
  }
  const columns = [
    {
      title: '提现人',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '提现金额',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return <span>￥{text}</span>
      },
    }, {
      title: '帐号类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        const replText = {
          0: '主账号',
          1: '子账号',
        }
        return (<span>{(text || text === 0) ? replText[text] : '暂无'}</span>)
      },
    }, {
      title: '帐号',
      dataIndex: 'alipayaccount',
      key: 'alipayaccount',
      render: (text) => {
        return <span>{text || '空'}</span>
      },
    }, {
      title: '提现状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const replText = {
          success: '成功',
          wait: '等待',
          cancel: '交易取消',
          close: '交易关闭',
          false: '交易失败',
          refuse: '审核被拒绝',
        }
        return (<span>{text ? replText[text] : '暂无'}</span>)
      },
    }, {
      title: '原因',
      dataIndex: 'transferDetails',
      key: 'transferDetails',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '提现时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        return <span>{text ? moment.unix(text / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>
      },
    }, {
      title: '操作',
      key: 'option',
      width: 100,
      render: (_, record) => {
        if (auth.examine) {
          if (record.status === 'wait') {
            return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '提现审核' }]} />
          }
          return <span>已操作</span>
        }
        return <span>暂无法操作</span>
      },
    },
  ]


  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={{ x: 767 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onWithdrawalClick: PropTypes.func,
  auth: PropTypes.object,
}

export default List
