import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Icon } from 'antd'
import classnames from 'classnames'
import moment from 'moment'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { getUserId } from '../../utils/getUserInfo'

// const userId = getUserId()
const confirm = Modal.confirm

const List = ({ onModAbilityClick, onAddAbilityClick, onAddMenuClick, location, onEditItem, onDeleteItem, ...tableProps }) => {
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
      case '3':
        onAddMenuClick(record)
        break
      case '4':
        onAddAbilityClick(record)
        break
      case '5':
        onModAbilityClick(record)
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
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: (text) => {
        const realText = {
          1: '导航菜单',
          2: '视图菜单',
          3: '功能菜单',
        }
        const color = {
          1: '#ff000d',
          2: '#ff7c83',
          3: '#1890ff',
        }
        return <span style={{ color: color[text] }}>{realText[text || 0]}</span>
      },
    },
    // {
    //   title: '菜单级别',
    //   dataIndex: 'menuLevel',
    //   key: 'menuLevel',
    //   width: 100,
    //   render: (text) => {
    //     const realText = {
    //       1: '一级菜单',
    //       2: '二级菜单',
    //       3: '三级菜单',
    //     }
    //     const color = {
    //       1: '#e53935',
    //       2: '#9c27b0',
    //       3: '#3f51b5',
    //     }
    //     return <p style={{ color: color[text] }}>{text ? realText[text] : '无'}</p>
    //   },
    // },
    {
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
        return text ? <Icon type={text} /> : '无'
      },
    }, {
      title: '按钮类型',
      dataIndex: 'buttonType',
      key: 'buttonType',
      render: (text) => {
        return text || '/'
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
      render: (_, record) => {
        if (record.createUserId === getUserId() || getUserId() === 1) {
          const menuOptions = [
            // { key: '1', name: '修改' },
            { key: '2', name: '删除' },
            // { key: '3', name: '添加菜单' },
            // { key: '4', name: '添加功能' },
          ]

          if (record.menuType === 1) {
            menuOptions.push({ key: '3', name: '添加菜单' })
            menuOptions.push({ key: '1', name: '修改' })
          }

          if (record.menuType === 2) {
            menuOptions.push({ key: '4', name: '添加功能' })
            menuOptions.push({ key: '1', name: '修改' })
          }

          if (record.menuType === 3) {
            menuOptions.push({ key: '5', name: '修改' })
          }

          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptions} />
        }
        return <span>/</span>
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
  onAddAbilityClick: PropTypes.func,
  onAddMenuClick: PropTypes.func,
  onModAbilityClick: PropTypes.func,
}

export default List
