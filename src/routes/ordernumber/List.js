import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除吗?',
          onOk() {
            onDeleteItem(record.id)
          },
        })
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '前缀',
      dataIndex: 'start',
      key: 'start',
    }, {
      title: '后缀',
      dataIndex: 'end',
      key: 'end',
      render: (text) => {
        return <span>{(text === '' || !text) ? '无' : text}</span>
      },
    }, {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
    }, {
      title: '快递品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '快递类型',
      dataIndex: 'mailType',
      key: 'mailType',
      render: (text) => {
        const replText = {
          0: '普通件',
          1: '到付件',
          2: '代收货款件',
          3: '通用',
        }
        return <span>{replText[text]}</span>
      },
    }, {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const createTime = text ? moment(text / 1).format('YYYY-MM-DD HH:mm:ss') : '未知时间'
        return <span>{createTime}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    rows: tableProps.pagination.rows,
  }

  const getBodyWrapper = (body) => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
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
  location: PropTypes.object,
}

export default List
