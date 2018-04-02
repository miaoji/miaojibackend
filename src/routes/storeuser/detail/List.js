import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import { Card, Col, Row } from 'antd'

const List = ({ list, handleClick }) => {
  console.log('list', list)
  // const { data } = storeUserDetail
  const detail = (
    <Row gutter={16}>
      {[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map((item) => {
        return (
          <Col span={4}>
            <Card className={styles.card} onClick={() => { handleClick({ realName: item }) }}>
              <p>操作人: 张三</p>
              <p>寄件总金额: 326元</p>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
  return (<div className="content-inner">
    <div className={styles.content}>
      {detail}
    </div>
  </div>)
}

List.propTypes = {
  list: PropTypes.object,
  handleClick: PropTypes.func
}

export default List
