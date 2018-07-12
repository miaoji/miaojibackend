import React from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import {
  Form, Button, Row, Col,
} from 'antd'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  onRefresh,
  onSetJdConfig,
}) => {
  return (
    <Row gutter={24}>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button size="large" type="primary" onClick={onAdd}>填充单号池</Button>
          </div>
          <div>
            <Button size="large" type="primary" onClick={onSetJdConfig}>设置京东分配比例</Button>
          </div>
          <div>
            <Button size="large" type="primary" onClick={onRefresh}>刷新</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  onRefresh: PropTypes.func,
  onSetJdConfig: PropTypes.func,
}

export default Form.create()(Filter)
