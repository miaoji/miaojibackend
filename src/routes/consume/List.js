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
      title: '站点',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text)=>{
        return <span>{ text?text:'单号暂无' }</span>
      }
    }, {
      title: '手机',
      dataIndex: 'code',
      key: 'code',
      render: (text)=>{
        return <span>{ text?text:'暂无' }</span>
      }
    }, {
      title: '交易号',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '交易类型',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '交易金额',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text)=>{
        return <span>{ text?text:'手机号暂无' }</span>
      }
    }, {
      title: '订单状态',
      dataIndex: 'iswrong',
      key: 'iswrong',
      render: (text)=>{
        const newtext={
          '0':'正常件',
          '1':'问题件'
        }
        return <span>{ newtext[text] }</span>
      }
    }, {
      title: '订单创建时间',
      dataIndex: 'expresStype',
      key: 'expresStype',
      render: (text)=>{
        const newtext={
          '0':'普通件',
          '1':'到付件',
          '2':'代收件',
        }
        return <span>{ newtext[text] }</span>
      }
    }, {
      title: '支付时间',
      dataIndex: 'time',
      key: 'time',
      render: (text)=>{
        const createTime = time.formatTime(text)
        return <span>{createTime}</span>
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
