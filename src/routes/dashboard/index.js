import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { NumberCard, Quote, User } from './components'
import styles from './index.less'
import { color } from '../../utils'
import SimpleChartComponent from './components/Echart/SimpleChartComponent'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard(data) {
  const { receviceData, sendData, quote, user, income, storeTotal, weChatUser, terminalTotal } = data.dashboard
  const munArr = [income, storeTotal, weChatUser, terminalTotal]
  const numberCards = munArr.map((item, key) => {
    return (<Col key={key} lg={6} md={12}>
      <NumberCard {...item} data={munArr} />
    </Col>)
  })

  const lineProps = {
    receviceData,
    sendData,
  }

  return (
    <Row gutter={24}>
      {numberCards}
      <Col lg={24} md={24}>
        <Card>
          <SimpleChartComponent {...lineProps} />
        </Card>
      </Col>
      <Col lg={18} md={24}>
        <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
          <User {...user} />
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card
              bordered={false}
              className={styles.quote}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.peach,
              }}
            >
              <Quote {...quote} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
