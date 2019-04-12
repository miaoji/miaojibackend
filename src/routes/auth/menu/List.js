import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
// import { getUserId } from '../../../utils/getUserInfo'

// const userId = getUserId()
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
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: 200,
      render: (text, record) => {
        const realText = {
          1: '|-',
          2: '|--',
          3: '|---',
        }
        return <span style={{ width: '110px', display: 'inline-block', textAlign: 'left' }}>{realText[record.menuLevel]} {text}</span>
      },
    }, {
      title: '菜单级别',
      dataIndex: 'menuLevel',
      key: 'menuLevel',
      width: 100,
      render: (text) => {
        const realText = {
          1: '一级菜单',
          2: '二级菜单',
          3: '三级菜单',
        }
        const color = {
          1: '#e53935',
          2: '#9c27b0',
          3: '#3f51b5',
        }
        return <p style={{ color: color[text] }}>{text ? realText[text] : '无'}</p>
      },
    }, {
      title: '菜单对应路由',
      dataIndex: 'target',
      key: 'target',
      render: (text) => {
        return <span>{text || '无'}</span>
      },
    }, {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      render: (text) => {
        return <span>{text || '无'}</span>
      },
    }, {
      title: '排序',
      dataIndex: 'menuDesc',
      key: 'menuDesc',
      render: (text) => {
        return <span>{text || '无'}</span>
      },
    }, {
      title: '备注信息',
      dataIndex: 'description',
      key: 'description',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '创建时间',
      dataIndex: 'menuCreateTime',
      key: 'menuCreateTime',
      render: (text) => {
        const createTime = text ? moment(text / 1).format('YYYY-MM-DD HH:mm:ss') : '未知时间'
        return <span>{createTime}</span>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        // if (userId !== 1) {
        //   return <span>/</span>
        // }
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
