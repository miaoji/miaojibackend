import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { NumberCard, User } from './components'
import SimpleChartComponent from './components/Echart/SimpleChartComponent'
import PieChart from './components/Echart/PieChart'

function Dashboard({ dashboard }) {
  const { receviceData, sendData, income, storeTotal, weChatUser, terminalTotal, user } = dashboard
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
      <Col lg={12} md={12} style={{ marginTop: '24px' }}>
        <Card>
          <PieChart />
        </Card>
      </Col>
      <Col lg={12} md={12} style={{ marginTop: '24px' }}>
        <User {...user} />
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
