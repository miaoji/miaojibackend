import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'

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
            onDeleteItem(record.ID)
          },
        })
        break
      default:
        break
    }
  }

  const columns = [
    {
      title: '昵称',
      dataIndex: 'idUser',
      key: 'idUser',
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => {
        const realText = {
          0: '保密',
          1: '男',
          2: '女',
        }
        return <span>{realText[text]}</span>
      },
    }, {
      title: '所在地区',
      dataIndex: 'note',
      key: 'note',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
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
