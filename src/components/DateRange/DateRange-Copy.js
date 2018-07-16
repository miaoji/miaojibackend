// 这是一个早期版本的时间选择器, 再这里只做备份使用
import React from 'react'
import { DatePicker, Form, Row, Col } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import PropTypes from 'prop-types'

class DateRange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: props.value[0],
      endValue: props.value[1],
      endOpen: false,
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
    this.onChange('startValue', value)
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })

    // 当用户清空了单个时间控件的值的时候同时清空两个控件的值,并发起一次页面请求
    if (value === null) {
      this.setState({ startValue: null, endValue: null })
      this.props.onChange([null, null], 'createTime')
      return
    }

    // 当用户进行了结束时间的选择的时候,发起一次页面请求
    if (field === 'endValue') {
      this.props.onChange([this.state.startValue, value], 'createTime')
    }
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  handleStartOpenChange = (open) => {
    console.log('openStart', open)
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    console.log('openEnd', open)
    this.setState({ endOpen: open })
  }

  render() {
    const { startValue, endValue, endOpen } = this.state
    return (
      <div>
        <Row>
          <Col style={{ marginBottom: '14px' }} xl={{ span: 11 }} md={{ span: 11 }} sm={{ span: 11 }}>
            <DatePicker
              locale={locale}
              // disabledDate={this.disabledStartDate}
              format="YYYY-MM-DD"
              value={startValue}
              placeholder="开始时间"
              showToday={false}
              style={{ width: '100%' }}
              size={this.state.size}
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
          </Col>
          <Col style={{ marginBottom: '14px' }} xl={{ span: 11, push: 1 }} md={{ span: 11, push: 2 }} sm={{ span: 11, push: 2 }}>
            <DatePicker
              locale={locale}
              // disabledDate={this.disabledEndDate}
              showToday={false}
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              value={endValue}
              placeholder="结束时间"
              size={this.state.size}
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
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
