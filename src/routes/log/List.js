import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const replText = {
  0: '成功',
  1: '失败',
  2: '未知',
  3: '嘻嘻',
}
const color = {
  0: '#DB9019',
  1: '#62bd00',
  2: '#FF534D',
  3: '#25C6FC',
}

const Text = ({ state }) => {
  return <span style={{ color: color[state] }}>{replText[state]}</span>
}

Text.propTypes = {
  state: PropTypes.number,
}

const List = ({ location, ...tableProps }) => {
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'idUser',
      key: 'idUser',
    }, {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      render: () => {
        return <span>张三</span>
      },
    }, {
      title: '行为',
      dataIndex: 'address',
      key: 'address',
      render: () => {
        return <span>请求了首页</span>
      },
    }, {
      title: '操作状态',
      dataIndex: 'state',
      key: 'state',
      render: () => {
        const state = Math.floor(Math.random() * 4)
        return <Text state={state} />
      },
    }, {
      title: '操作时间',
      dataIndex: 'ydDatastatus',
      key: 'ydDatastatus',
      render: () => {
        return <span>2019-08-27 11:11:11</span>
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
        className={styles.table}
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
