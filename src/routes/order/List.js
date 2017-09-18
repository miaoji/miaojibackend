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
      title: '单号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text)=>{
        return <span>{ text?text:'单号暂无' }</span>
      }
    }, {
      title: '货架号',
      dataIndex: 'code',
      key: 'code',
      render: (text)=>{
        return <span>{ text?text:'暂无' }</span>
      }
    }, {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      render: (text)=>{
        const newtext={
          '0': '品牌未选择',
          '1': '品牌未选择',
          '2': '优速',
          '3': '龙邦',
          '4': '速尔',
          '5': '快捷',
          '6': '全峰',
          '7': '百世快递',
          '8': '天天',
          '9': '中通',
          '11': '申通',
          '12': '圆通',
          '14': 'EMS',
          '15': '国通',
          '16': '蚂蚁帮',
          '17': '邮政小包',
          '18': '宅急送',
          '19': '跨越',
          '20': '京东',
          '21': '达达',
          '22': '万象',
          '23': '妙寄',
          '24': '中铁',
          '27': '品骏',
          '26': '安能',
          '28': '日日顺',
          '29': '如风达',
          '10': '韵达',
          '13': '顺丰',
          '71': '高铁快运'
        }
        text = text?text:'0'
        return <span>{ newtext[text] }</span>
      }
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text)=>{
        return <span>{ text?text:'手机号暂无' }</span>
      }
    }, {
      title: '快递类型',
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
      title: '快递状态',
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
      title: '操作状态',
      dataIndex: 'state',
      key: 'state',
      render: (text)=>{
        const newtext={
          '101':'到件',
          '102':'上架',
          '103':'分派',
          '201':'问题件',
          '202':'移库',
          '301':'签收',
          '302':'退回',
        }
        return <span>{ newtext[text] }</span>
      }
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (text)=>{
        const createTime = time.formatTime(text)
        return <span>{createTime}</span>
      }
    }, {
      title: '原因',
      dataIndex: 'reason',
      key: 'reason',
      render: (text)=>{
        return <span>{ text?text:'暂无' }</span>
      }
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
