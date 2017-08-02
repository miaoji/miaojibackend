import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { Link } from 'dva/router'

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
      title: '帐号',
      dataIndex: 'accounts',
      key: 'accounts',
      render: (text, record) => {
        const str = text.toString()
        let encryptNum = str.substr(0, 5) + '****' + str.substr(9, 10)
        return <Link to={`storeuser/${record.id}`}>{encryptNum}</Link>
      }
    }, {
      title: '经营者姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '店铺名称',
      dataIndex: 'storename',
      key: 'storename',
    }, {
      title: '店铺级别',
      dataIndex: 'level',
      key: 'level',
      render: (text) => <span>{text === 0
            ? '主张号'
            : '子帐号'}</span>,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{text === 0
            ? '禁用'
            : '启用'}</span>,
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '是否黑名单',
      dataIndex: 'blacklist',
      key: 'blacklist',
      filters: [
        { text: '否', value: '0' },
        { text: '是', value: '1' }
      ],
      onFilter: (value, record) => Number(record.blacklist) === Number(value),
      render: (text) => {
        const realtext = {
          '0': '否',
          '1': '是',
        }
        return <span>{realtext[text]}</span>
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]} />
      },
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
