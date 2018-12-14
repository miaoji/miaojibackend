import React from 'react'
import { DatePicker, Form, Row, Col } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import PropTypes from 'prop-types'
import moment from 'moment'

class DateRange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: props.value[0],
      endValue: props.value[1],
      endOpen: false,
      endSelect: false,
      size: props.size,
    }
  }
  componentWillReceiveProps(props) {
    if (props.value.length !== 2) {
      this.setState({
        startValue: null,
        endValue: null,
      })
    }
  }

  onStartChange = (value) => {
    this.setState({
      startValue: value,
    })
  }

  onEndChange = (value) => {
    this.setState({
      endValue: value,
      endSelect: true,
    })
    this.props.onChange([this.state.startValue, value], 'createTime')
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
    const _this = this
    setTimeout(() => {
      if (!open && _this.state.endValue && !_this.state.endSelect) {
        _this.props.onChange([_this.state.startValue, _this.state.endValue], 'createTime')
      }
      _this.setState({
        endSelect: false,
      })
    }, 100)
  }

  disabledStartDate = (current) => {
    return current && current > moment(new Date().getTime())
  }

  disabledEndDate = (current) => {
    return current && current > moment(new Date().getTime())
  }

  render() {
    const { startValue, endValue, endOpen } = this.state
    return (
      <div>
        <Row>
          <Col style={{ marginBottom: '14px' }} xl={{ span: 11 }} md={{ span: 11 }} sm={{ span: 11 }}>
            <DatePicker
              locale={locale}
              format="YYYY-MM-DD"
              value={startValue}
              allowClear={false}
              placeholder="开始时间"
              showToday={false}
              style={{ width: '100%' }}
              size={this.state.size}
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
              disabledDate={this.disabledStartDate}
            />
          </Col>
          <Col style={{ marginBottom: '14px' }} xl={{ span: 11, push: 1 }} md={{ span: 11, push: 2 }} sm={{ span: 11, push: 2 }}>
            <DatePicker
              locale={locale}
              showToday={false}
              style={{ width: '100%' }}
              allowClear={false}
              format="YYYY-MM-DD"
              value={endValue}
              placeholder="结束时间"
              size={this.state.size}
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
              disabledDate={this.disabledEndDate}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

DateRange.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.array,
}

export default Form.create()(DateRange)
