import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '分派人ID',
      dataIndex: 'idBinding',
      key: 'idBinding',
      render(text) {
        return <span>{text || '/'}</span>
      },
    },
    {
      title: '分派人',
      dataIndex: 'cName',
      key: 'cName',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '品牌名称',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return <span>{text || '/'}</span>
      },
    }, {
      title: '订单数量',
      dataIndex: 'count',
      key: 'count',
      render: (text) => {
        return <span>{text}</span>
      },
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={styles.table}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.idBrand}
      />
    </div>
  )
}

List.propTypes = {
}

export default List
