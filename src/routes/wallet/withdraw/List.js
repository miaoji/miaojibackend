import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ isMotion, location, ...tableProps }) => {
  
  const columns = [
    {
      title: '提现人',
      dataIndex: 'withdrawPerson',
      key: 'withdrawPerson',
    }, {
      title: '提现金额',
      dataIndex: 'money',
      key: 'money',
      render: (text) => <span>￥{text}</span>,
    }, {
      title: '帐号类型',
      dataIndex: 'accountType',
      key: 'accountType',
      render: (text) => <span>{text === 0
            ? '门店主账号'
            : '门店子帐号'}</span>,
    }, {
      title: '帐号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '提现时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '提现状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '失败', value: '0' },
        { text: '成功', value: '1' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => <span>{text === 0
            ? '失败'
            : '成功'}</span>,
    }, 
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
