import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popover } from 'antd'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const Text = ({ text, title = '信息' }) => {
  const content = <div style={{ maxWidth: '450px', wordBreak: 'break-word' }}>{text}</div>
  return (
    <Popover placement="bottom" content={content} title={title} trigger="hover">
      <span style={{ color: '#108ee9', cursor: 'pointer' }}>查看</span>
    </Popover>
  )
}

Text.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
}

const List = ({ location, ...tableProps }) => {
  const columns = [
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '行为',
      dataIndex: 'peration',
      key: 'peration',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '状态',
      dataIndex: 'operate_result',
      key: 'operate_result',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '方法名称',
      dataIndex: 'method',
      key: 'method',
      render: (text) => {
        return <Text title="方法名称信息" text={text} />
      },
    }, {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      render: (text) => {
        return <span>{text}</span>
      },
    }, {
      title: '请求参数',
      dataIndex: 'params',
      key: 'params',
      render: (text) => {
        return <Text title="请求参数信息" text={text} />
      },
    }, {
      title: '访问时间',
      dataIndex: 'create_date',
      key: 'create_date',
      render: (text) => {
        return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
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
