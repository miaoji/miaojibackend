import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { isSuperAdmin } from '../../utils'

const confirm = Modal.confirm

const List = ({ location, onEditItem, onDeleteItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除门店绑定信息吗?',
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
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '账号',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '站点名称',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '站点地址',
      dataIndex: 'note',
      key: 'note6',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '银行卡',
      dataIndex: 'note',
      key: 'note5',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '登录密码',
      dataIndex: 'note',
      key: 'note4',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '登录账号',
      dataIndex: 'note',
      key: 'note3',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '邮箱',
      dataIndex: 'note',
      key: 'note1',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '真实姓名',
      dataIndex: 'note',
      key: 'note2',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        const createTime = text ? moment(text / 1).format('YYYY-MM-DD HH:mm:ss') : '未知时间'
        return <span>{createTime}</span>
      },
    },
  ]
  if (isSuperAdmin()) {
    columns.push({
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    })
  }

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
