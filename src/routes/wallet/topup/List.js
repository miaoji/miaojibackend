import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
import { Link } from 'dva/router'
import { time } from '../../../utils'

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
      title: '流水号',
      dataIndex: 'orderId',
      key: 'OrderId',
      render:(text)=><span>{text?text:"空"}</span>
    }, {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>￥{text}</span>,
    }, {
      title: '时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render:(text)=>{
        const createtime = time.formatTime(text)
        return <span>{createtime}</span>
      }
    }, {
      title: '充值人',
      dataIndex: 'name',
      key: 'name',
      render:(text)=><span>{text?text:"空"}</span>
    }, {
      title: '充值状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '失败', value: '0' },
        { text: '成功', value: '1' }
      ],
      onFilter: (value, record) => Number(record.status) === Number(value),
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
