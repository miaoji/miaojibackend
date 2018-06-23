import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Table, Spin } from 'antd'
import styles from './List.less'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'

const List = ({ filter, location, onEditItem, onDeleteItem, ...tableProps }) => {
  const columns = [
    {
      title: '站点编号',
      dataIndex: 'idUser',
      key: 'idUser',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '站点名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text || '暂无'}</span>
      },
    }, {
      title: '问题件数量',
      dataIndex: 'count',
      key: 'count',
      render: (text) => {
        return <span>{text || '暂无'}</span>
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
        expandedRowRender={(record) => {
          if (record.brandList) {
            return (<div>
              <p style={{ margin: 0 }}>{record.brandList.map((item) => {
                return (
                  <div>
                    {`${item.name}---${item.sjtotal}`}
                  </div>
                )
              })}</p>
            </div>)
          }
          return (
            <div>
              <Spin />
            </div>
          )
        }}
        rowKey={record => record.idUser}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  filter: PropTypes.object,
}

export default List
