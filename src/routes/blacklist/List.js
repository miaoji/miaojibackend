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
// { key: '1', name: '修改' }, { key: '2', name: '删除' }
const initMenuOption = (auth) => {
  const menuOptions = []
  Object.keys(auth).forEach((i) => {
    let tmp = null
    switch (i) {
      case 'mod':
        tmp = { key: '1', name: '修改' }
        break
      case 'del':
        tmp = { key: '2', name: '删除' }
        break
      default:
        break
    }
    if (tmp) {
      menuOptions.push(tmp)
    }
  })
  return menuOptions
}

const List = ({ auth, location, onEditItem, onDeleteItem, ...tableProps }) => {
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
      title: '站点ID',
      dataIndex: 'idUser',
      key: 'idUser',
    }, {
      title: '站点名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '站点地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '黑名单手机号/单号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '理由',
      dataIndex: 'note',
      key: 'note',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '时间',
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
        const menuOptions = initMenuOption(auth)
        if (menuOptions.length) {
          return (<DropOption onMenuClick={e => handleMenuClick(record, e)}
            menuOptions={menuOptions}
          />)
        }
        return <span>/</span>
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
  auth: PropTypes.object,
}

export default List
