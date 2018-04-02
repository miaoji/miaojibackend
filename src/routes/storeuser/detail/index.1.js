import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Card, Col, Row } from 'antd'

const Detail = () => {
  // const { data } = storeUserDetail
  const detail = (
    <Row gutter={16}>
      {[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map(() => {
        return (
          <Col span={4}>
            <Card className={styles.card}>
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

Detail.propTypes = {
  storeUserDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ storeUserDetail, loading }) => ({ storeUserDetail, loading: loading.models.storeUserDetail }))(Detail)
