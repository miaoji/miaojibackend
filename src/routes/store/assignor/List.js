import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin } from 'antd'
import { Link } from 'dva/router'
import styles from './styles.less'

let colorPalette = [
  '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
]

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render(text) {
      return <span>{text || '/'}</span>
    },
  },
  {
    title: '分派人姓名',
    dataIndex: 'name',
    key: 'name',
    render(text) {
      return <span>{text || '/'}</span>
    },
  },
  {
    title: '分派数据',
    dataIndex: 'count',
    key: 'count',
    render(text) {
      return <span>{text || '/'}</span>
    },
  },
  {
    title: '查看详情',
    dataIndex: 'option',
    key: 'option',
    render: () => {
      return <Link>明细</Link>
    },
  },
]
console.log('.................')
const List = ({ filter, rowLoading, ...tableProps }) => {
  console.log('-----------------------')
  return (
    <div>
      <Table
        {...tableProps}
        className={styles.table}
        columns={columns}
        bordered
        rowKey={record => record.ddtotal}
        expandedRowRender={() => (
          rowLoading ? <Spin /> : (
            <div className={styles.row}>
              {
                [1231231, 212312, 31233, 2223233, 31132311].map((item, index) => {
                  return (<p>
                    <span className="title" style={{ backgroundColor: colorPalette[index] }}>
                      <Link to="/selectpjjeDetails">圆通</Link>
                    </span>
                    <span className="count">{item}</span>
                  </p>)
                })
              }
            </div>
          )
        )}
      />
    </div>
  )
}

List.propTypes = {
  filter: PropTypes.object,
  rowLoading: PropTypes.bool,
}

export default List
