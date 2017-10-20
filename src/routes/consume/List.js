import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'
import { time } from '../../utils'

const confirm = Modal.confirm

const realStatus = {
  success: '成功',
  wait: '等待',
  cancel: '交易取消',
  close: '交易关闭'
}
const realTransactionType = {
  '1': '活动奖励',
  '2': '红包',
  '3': '快递费',
  '4': '购买通讯费',
  '5': '提现',
  '6': '赠送通讯费',
  '7': '寄件费',
  '8': '代收货费',
  '9': '到付费',
  '10': '派件费',
  '11': '保价费',
  '12': '购买余额',
  '13': '寄件付款'
}
const realPaymentMethod = {
  '1': '支付宝支付',
  '2': '微信支付',
  '3': '余额支付',
  '4': '线下现金支付'
}

const List = ({ filter, onFilterStatus, onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
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

  const handleTableChange = (pagination, filters, sorter) => {
    let newfilter = { ...filter,...filters }
    console.log('newfilter',newfilter)
    onFilterStatus(newfilter)
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text)=>{
        return <span>{ text?text:'暂无' }</span>
      }
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text)=>{
        return <span>{ text?text:'暂无' }</span>
      }
    }, {
      title: '交易号',
      dataIndex: 'transactionNumber',
      key: 'transactionNumber',
    }, {
      title: '交易类型',
      dataIndex: 'transactionType',
      key: 'transactionType',
      filters: [
        { text: '购买通讯费', value: '4' },
        { text: '提现', value: '5' },
        { text: '寄件费', value: '7' },
        { text: '代收货款费', value: '8' },
        { text: '到付费', value: '9' },
        { text: '派件费', value: '10' },
        { text: '保价费', value: '11' },
        { text: '寄件付款', value: '13' },
      ],
      // filterMultiple: false,
      render: (text) => {
        return <span>{ realTransactionType[text] }</span>
      }
    }, {
      title: '交易金额',
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '成功', value: 'success' },
        { text: '等待', value: 'wait' },
        { text: '交易取消', value: 'cancel' },
        { text: '交易关闭', value: 'close' },
      ],
      // filterMultiple: false,
      render: (text)=>{
        return <span>{ realStatus[text] }</span>
      }
    },{
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filters: [
        { text: '支付宝支付', value: '1' },
        { text: '微信支付', value: '2' },
        { text: '余额支付', value: '3' },
        { text: '线下现金支付', value: '4' },
      ],
      // filterMultiple: false,
      render: (text) => {
        return <span>{ realPaymentMethod[text] }</span>
      }
    },{
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text)=>{
        const createTime = time.formatTime(text)
        return <span>{ createTime }</span>
      }
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
        scroll={{ x: 767 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
        onChange={handleTableChange}
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
