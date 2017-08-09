import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定要删除这一条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '主体',
      dataIndex: 'subject',
      key: 'subject'
    },{
        title: '通讯费',
        dataIndex: 'communicateCharges',
        key: 'communicateCharges',
        render: (text) => <span>{'￥' + text}</span>,
      }, {
        title: '提现费用',
        dataIndex: 'withdrawCharges',
        key: 'withdrawCharges',
        render: (text) => <span>{'￥' + text}</span>,
      }, {
        title: '其他',
        dataIndex: 'others',
        key: 'expendothers',
        render: (text) => <span>{'￥' + text}</span>,
      }, {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render: (text) => <span>{'￥' + text}</span>,
    }
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
