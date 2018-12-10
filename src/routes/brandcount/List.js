import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'idBrand',
      key: 'idBrand',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '品牌名称',
      dataIndex: 'brand',
      key: 'brand',
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
        pagination={false}
        rowKey={record => record.idBrand}
      />
    </div>
  )
}

List.propTypes = {
}

export default List
