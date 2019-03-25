import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const Text = ({ children }) => {
  const text = {
    0: '未对接',
    1: '对接成功',
    2: '对接失败',
    3: '对接中',
  }
  const color = {
    0: '#DB9019',
    1: '#62bd00',
    2: '#FF534D',
    3: '#25C6FC',
  }
  return <span style={{ color: color[children] }}>{text[children]}</span>
}

Text.propTypes = {
  children: PropTypes.string,
}

const List = ({ location, ...tableProps }) => {
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
      title: '圆通',
      dataIndex: 'mobile',
      key: 'mobile1',
      render: () => {
        return <Text>{Math.floor(Math.random() * 4)}</Text>
      },
    }, {
      title: '中通',
      dataIndex: 'mobile',
      key: 'mobile2',
      render: () => {
        return <Text>{Math.floor(Math.random() * 4)}</Text>
      },
    }, {
      title: '申通',
      dataIndex: 'mobile',
      key: 'mobile3',
      render: () => {
        return <Text>{Math.floor(Math.random() * 4)}</Text>
      },
    }, {
      title: '百世汇通',
      dataIndex: 'mobile',
      key: 'mobile4',
      render: () => {
        return <Text>{Math.floor(Math.random() * 4)}</Text>
      },
    }, {
      title: '韵达',
      dataIndex: 'mobile',
      key: 'mobile5',
      render: () => {
        return <Text>{Math.floor(Math.random() * 4)}</Text>
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
