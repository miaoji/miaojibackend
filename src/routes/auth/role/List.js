import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import moment from 'moment'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
import { getUserId, isSuperAdmin } from '../../../utils/getUserInfo'

const userId = getUserId()
const isSuperRole = isSuperAdmin()
const confirm = Modal.confirm

const List = ({ location, onEditItem, onDeleteItem, onReadAuth, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    switch (e.key) {
      case '1':
        onEditItem(record)
        break
      case '2':
        confirm({
          title: '确定要删除吗?',
          onOk() {
            onDeleteItem(record.ID)
          },
        })
        break
      default:
        break
    }
  }

  const handleRaadAuth = (record) => {
    onReadAuth(record)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    }, {
      title: '角色名称',
      dataIndex: 'ROLE_NAME',
      key: 'ROLE_NAME',
    }, {
      title: '创建人',
      dataIndex: 'createUserName',
      key: 'createUserName',
      render: (text) => {
        return <span>{text || '无记录'}</span>
      },
    }, {
      title: '备注信息',
      dataIndex: 'DESCRIPTION',
      key: 'DESCRIPTION',
      width: 300,
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'ROLE_CREATE_TIME',
      key: 'ROLE_CREATE_TIME',
      width: 200,
      render: (text) => {
        const createTime = text ? moment(text / 1).format('YYYY-MM-DD HH:mm:ss') : '未知时间'
        return <span>{createTime}</span>
      },
    }, {
      title: '权限',
      key: 'auth',
      width: 100,
      render(record) {
        return <Button onClick={() => { handleRaadAuth(record) }} ghost style={{ color: '#0e77ca' }}>查看</Button>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        if (record.ID === 1 || record.CREATE_USER_ID !== userId && !isSuperRole) {
          return <span>/</span>
        }
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
        rowKey={record => record.ROLE_ID}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  onReadAuth: PropTypes.func,
}

export default List
