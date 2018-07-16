import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onResetPWD, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除吗?',
          onOk() {
            onDeleteItem(record.userId)
          },
        })
        break
      case '3':
        onResetPWD(record.userId)
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '登陆账户',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text) => {
        const realText = {
          admin: '超级管理员',
          user1: '市场部',
          user2: '门店',
        }
        return <span>{text ? realText[text] : '暂无'}</span>
      },
    }, {
      title: '所属门店',
      dataIndex: 'store',
      key: 'store',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '所在地区',
      dataIndex: 'note',
      key: 'note',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '备注信息',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '创建时间',
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
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '3', name: '重置密码' }, { key: '2', name: '删除' }]} />
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
  onResetPWD: PropTypes.func,
  location: PropTypes.object,
}

export default List
