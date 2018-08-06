import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ isMotion, location, ...tableProps }) => {
  const columns = [
    {
      title: '提现人',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '空'}</span>
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
      dataIndex: 'accountType',
      key: 'accountType',
      render: (text) => {
        return (<span>{text === 0
          ? '门店主账号'
          : '门店子帐号'}</span>)
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
      // filters: [
      //   { text: '失败', value: '0' },
      //   { text: '成功', value: '1' },
      // ],
      // onFilter: (value, record) => record.status === value,
      render: (text) => {
        const replTexy = {
          success: '成功',
          wait: '等待',
          cancel: '交易取消',
          close: '交易关闭',
        }
        return (<span>{replTexy[text]}</span>)
      },
    }, {
      title: '提现时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        return <span>{text ? moment.unix(text / 1000).format('YYYY-MM-DD HH:mm:ss') : '未知时间'}</span>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 767 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
