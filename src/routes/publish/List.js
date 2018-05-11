import React from 'react'
import BraftEditor from 'braft-editor'
import PropTypes from 'prop-types'
import 'braft-editor/dist/braft.css'
import { Form, Input, Modal, notification, Select, Row, Col } from 'antd'
import { upload } from '../../services/publish'

const confirm = Modal.confirm
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

class List extends React.Component {

  state = {
    htmlContent: '',
    title: '',
    type: '0',
    notify: '0'
  }


  handleHTMLChange = (htmlContent) => {
    this.setState({ htmlContent })
  }

  handleTieleChange = (title) => {
    this.setState({ title: title.target.value })
  }

  handleTypeChange = (type) => {
    this.setState({ type })
  }

  handleNotifyChange = (notify) => {
    this.setState({ notify })
  }

  render() {
    const editorProps = {
      placeholder: '请输入文章的正文!',
      initialContent: '',
      onHTMLChange: this.handleHTMLChange,
      viewWrapper: '.list',
      // 增加自定义预览按钮
      extendControls: [
        {
          type: 'split',
        },
        {
          type: 'button',
          text: '预览',
          className: 'preview-button',
          onClick: () => {
            const htmlContent = this.state.htmlContent
            const title = this.state.title
            const contant = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;"/><title>${title}</title></head><body>${htmlContent}</body></html>`
            window.open().document.write(contant)
          }
        },
        // /*{
        //   type: 'dropdown',
        //   text: 'Foo',
        //   showDropDownArrow: true,
        //   component: <div><h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1><h1>123456</h1></div>
        // }, */
        {
          type: 'button',
          text: '提交',
          className: 'preview-button',
          onClick: () => {
            const _this = this
            confirm({
              title: '确定要发表吗?',
              onOk() {
                const htmlContent = _this.state.htmlContent
                const title = _this.state.title
                const contant = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;"/><title>${title}</title></head><body>${htmlContent}</body></html>`
                _this.props.onpublish({
                  contant,
                  title,
                  type: Number(_this.state.type),
                  receiveId: Number(_this.state.notify)
                })
              }
            })
          }
        }
      ],
      media: {
        // 图片上传功能
        async uploadFn (param) {
          if (typeof (FileReader) === 'undefined') {
            param.error({
              msg: '上传失败'
            })
            notification.warning({
              message: '图片上传失败',
              description: '抱歉,你的浏览器暂不支持图片上传功能,请使用谷歌浏览器,或者切换到浏览器的极速模式'
            })
            return false
          }
          let fileReader = new FileReader()
          fileReader.readAsDataURL(param.file)
          // 将转成base64的图片上传至服务器
          fileReader.onload = async function (e) {
            let base64Code = e.currentTarget.result
            base64Code = base64Code.split('base64,')[1]
            const data = await upload({ filee: base64Code })
            if (data.obj) {
              param.progress(100)
              param.success({
                url: data.obj
              })
            } else {
              param.error({
                msg: 'unable to upload.'
              })
            }
          }
          return false
        }
      }
    }
    return (
      <div className="list">
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="标题" hasFeedback {...formItemLayout}>
                <Input style={{ width: 390 }} onChange={this.handleTieleChange} placeholder="请输入文章的标题!" />
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label="消息类型" hasFeedback {...formItemLayout}>
                <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleTypeChange}>
                  <Option value="0">通知提醒</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label="通知人" hasFeedback {...formItemLayout}>
                <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleNotifyChange}>
                  <Option value="0">所有人</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="正文" hasFeedback {...formItemLayout}>
            <BraftEditor {...editorProps} />
          </FormItem>
        </Form>
      </div>
    )
  }

}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
  form: PropTypes.object,
  onpublish: PropTypes.func
}

export default Form.create()(List)
