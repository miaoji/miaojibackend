import React, { Component } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

const errorTime = 600000

class LoginButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      num: 3000,
    }
  }
  componentWillMount() {
    if ((new Date().getTime() - this.props.prohibitloginStart < errorTime)) {
      this.setState({
        disabled: true,
      })
    }
  }
  componentDidMount() {
    window.loginInterVal = setInterval(() => {
      const time = new Date().getTime() - this.props.prohibitloginStart
      if (time > errorTime) {
        this.setState({
          disabled: false,
          num: time,
        })
      } else {
        this.setState({
          num: time,
        })
      }
    }, 1000)
  }
  componentWillReceiveProps(nextProps) {
    const time = new Date().getTime() - nextProps.prohibitloginStart
    if (time < errorTime) {
      this.setState({
        disabled: true,
        num: time,
      })
    }
  }
  componentWillUnmount() {
    clearInterval(window.loginInterVal)
  }
  render() {
    const { loginLoading, handleOk } = this.props
    const { disabled, num } = this.state
    return (
      <Button disabled={disabled} type="primary" onClick={handleOk} loading={loginLoading}>
        {disabled ? `登录锁定,${((errorTime - num) / 1000).toFixed(0)}秒后解锁` : '登录'}
      </Button>
    )
  }
}

LoginButton.propTypes = {
  loginLoading: PropTypes.bool,
  handleOk: PropTypes.func,
  // loginErrorCount: PropTypes.number,
  prohibitloginStart: PropTypes.number,
}

export default LoginButton
