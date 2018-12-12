import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
import { getUserId, isSuperAdmin } from '../../../utils/getUserInfo'

const userId = getUserId()
const isSuperRole = isSuperAdmin()
const confirm = Modal.confirm

const List = ({ storeTotal, location, onEditItem, onDeleteItem, ...tableProps }) => {
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
      title: '机构名称',
      dataIndex: 'orgName',
      key: 'orgName',
      width: 200,
      render: (text) => {
        return <span style={{ width: '110px', display: 'inline-block' }}>{text}</span>
      },
    }, {
      title: '所在区域',
      dataIndex: 'location',
      key: 'location',
      render: (text) => {
        const newText = text ? text.replace(/(,)|(\/\/\/)|([0-9])/g, '') : '暂无'
        return <span>{newText}</span>
      },
    }, {
      title: '父级机构',
      dataIndex: 'parentName',
      key: 'parentName',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '创建人',
      dataIndex: 'createUserName',
      key: 'createUserName',
      render: (text) => {
        return <span>{text || '无记录'}</span>
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
        if (record.id === 1 || record.createUserId !== userId && !isSuperRole) {
          return <div>/</div>
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
  storeTotal: PropTypes.number,
}

export default List
