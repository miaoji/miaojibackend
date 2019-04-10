import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Row, Form, Input, Icon,
  //  Col,
  // Tooltip, Spin
} from 'antd'
import { config } from 'utils'
import styles from './index.less'
import LoginButton from './loginButton'

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  // loading,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading,
    //  imgCode,
    loginErrorCount, prohibitloginStart } = login
  console.log('loginErrorCount1', loginErrorCount)

  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  // const onUpdateImgCode = () => {
  //   dispatch({ type: 'login/initImgCode' })
  // }

  const LoginButtonProps = {
    loginLoading,
    handleOk,
    loginErrorCount,
    prohibitloginStart,
  }

  return (

    <div>
      <div className={styles.background}>
        <div>
          <div>
            <div className={styles.form}>
              <div className={styles.logo}>
                <img alt={'logo'} src={config.logo} />
                <span>{config.name}</span>
              </div>
              <form>
                <FormItem hasFeedback>
                  {getFieldDecorator('accounts', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名',
                      },
                    ],
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} size="large" onPressEnter={handleOk} placeholder="用户名" />)}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                    size="large"
                    type="password"
                    onPressEnter={handleOk}
                    placeholder="密码"
                  />)}
                </FormItem>
                <Row>
                  {/* <Col span={16}>
                    <FormItem hasFeedback>
                      {getFieldDecorator('verification', {
                        rules: [
                          {
                            required: true,
                            message: '请输入验证码',
                          },
                        ],
                      })(<Input
                        prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.5)' }} />}
                        size="large"
                        onPressEnter={handleOk}
                        placeholder="验证码"
                      />)}
                    </FormItem>
                  </Col> */}
                  {/* <Col span={8}>
                    <Tooltip placement="right" title="看不清,点击换一张">
                      <div onClick={onUpdateImgCode} style={{ height: '32px', width: '75px', marginLeft: '7px', overflow: 'hidden' }}>
                        {loading.effects['login/initImgCode']
                          ? <Spin />
                          : <img src={imgCode} alt="验证码" style={{ height: '32px', cursor: 'pointer' }} />
                        }
                      </div>
                    </Tooltip>
                  </Col> */}
                </Row>
                <Row>
                  {/* <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                    登录
                  </Button> */}
                  <LoginButton {...LoginButtonProps} />
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login))
