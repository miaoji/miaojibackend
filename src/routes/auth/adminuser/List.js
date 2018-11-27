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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '登陆账户',
      dataIndex: 'accounts',
      key: 'accounts',
    }, {
      title: '所属机构',
      dataIndex: 'orgName',
      key: 'orgName',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '所在地区',
      dataIndex: 'location',
      key: 'location',
      render: (text) => {
        const newText = text ? text.replace(/(,)|(\/\/\/)|([0-9])/g, '') : '暂无'
        return <span>{newText}</span>
      },
    }, {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text) => {
        return <span>{text || '暂无'}</span>
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
      dataIndex: 'createtime',
      key: 'createtime',
      render: (text) => {
        const createTime = text ? moment(text / 1).format('YYYY-MM-DD HH:mm:ss') : '暂无'
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
        rowKey={record => record.userId}
        getBodyWrapper={getBodyWrapper}
        expandedRowRender={(record) => {
          console.log('record', record)
          if (!record.role) return <div>暂无相关信息</div>
          const texts = record.role.map((item) => {
            return <p>{item.roleName}</p>
          })
          return <div>{texts}</div>
        }}
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
