import React from 'react'
import PropTypes from 'prop-types'
import { Table, Spin, Tooltip } from 'antd'
import { Link } from 'dva/router'
import styles from './styles.less'

let colorPalette = [
  '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
]

const List = ({ filter, rowLoading, expandedList, ...tableProps }) => {
  const createTime = filter.createTime ? `&createTime=${filter.createTime ? filter.createTime[0]._i : ''}&createTime=${filter.createTime ? filter.createTime[1]._i : ''}` : ''
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
      dataIndex: 'c_name',
      key: 'c_name',
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
      render: (_, record) => {
        return <Link to={`/backupselectpjjeDetails?idBinding=${record.id}&idUser=${filter.idUser}${createTime}`}>订单明细</Link>
      },
    },
  ]
  return (
    <div>
      <Table
        {...tableProps}
        className={styles.table}
        columns={columns}
        bordered
        rowKey={record => record.id}
        expandedRowRender={(row) => {
          return (
            rowLoading ? <Spin /> : (
              <div className={styles.row}>
                {
                  expandedList.map((item, index) => {
                    return (<p>
                      <Tooltip placement="top" title="点击查看明细">
                        <Link
                          style={{ backgroundColor: colorPalette[index] }}
                          className="title"
                          to={`/backupselectpjjeDetails?idBinding=${row.id}&idBrand=${item.idBrand}${createTime}`}
                        >
                          {item.brand}
                        </Link>
                      </Tooltip>
                      <span className="count">{item.count}</span>
                    </p>)
                  })
                }
              </div>
            )
          )
        }}
      />
    </div>
  )
}

List.propTypes = {
  filter: PropTypes.object,
  rowLoading: PropTypes.bool,
  expandedList: PropTypes.array,
}

export default List
