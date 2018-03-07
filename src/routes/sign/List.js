import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Table, Modal, Icon, message, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { time } from '../../utils'

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
          onOk () {
            onDeleteItem(record.id)
          },
        })
        break
      default:
        break
    }
  }

  const copyUrl = (record, e) => {
    const href = `http://miaoji.didalive.net/qrdetail?ticket=${record.ticket}&name=${record.name}&parameter=${record.parameter}`
    window.prompt('请使用Ctrl+C复制到剪切板', href)
  }

  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'idUser',
      key: 'idUser',
    }, {
      title: '店铺名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '第一天签收数',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '第一天签收率',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: '第二天签收数',
      dataIndex: 'mobile',
      key: 'mobile1',
    }, {
      title: '第二天签收率',
      dataIndex: 'note',
      key: 'note1',
    }, {
      title: '超过两天未签收数',
      dataIndex: 'mobile',
      key: 'mobile2',
    }, {
      title: '超过两天未签收率',
      dataIndex: 'note',
      key: 'note3',
    }, {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const createTime = time.formatTime(text.toString())
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

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

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
