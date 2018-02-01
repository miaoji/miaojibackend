import React from 'react'
import BraftEditor from 'braft-editor'
import PropTypes from 'prop-types'
import 'braft-editor/dist/braft.css'
import { Form, Input, Modal } from 'antd'

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
    title: ''
  }


  handleHTMLChange = (htmlContent) => {
    this.setState({ htmlContent })
  }

  handleTieleChange = (title) => {
    this.setState({ title: title.target.value })
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
            window.open().document.write(this.state.htmlContent)
          }
        }, {
          type: 'dropdown',
          text: <span>下拉菜单</span>,
          component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>,
          // component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>,
          // component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>,
          // component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>,
        }, {
          type: 'button',
          text: '提交',
          className: 'preview-button',
          onClick: () => {
            console.log('this.state.htmlContent', this.state.htmlContent)
            console.log('this.state.title', this.state.title)
            const _this = this
            confirm({
              title: '确定要发表吗?',
              onOk() {
                _this.props.onpublish({ htmlContent: _this.state.htmlContent, title: _this.state.title })
              }
            })
          }
        }
      ],
      media: {
        // 图片上传功能
        uploadFn: (param) => {
          const api = 'http://php.winnerwly.top'
          const serverURL = `${api}/index.php`
          const xhr = new XMLHttpRequest
          const fd = new FormData()

          // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
          console.log(param.libraryId)
          console.log('param', param)

          const successFn = (response) => {
            console.log('response-success', response)
            if (xhr.responseText === 'error') {
              return '上传失败'
            }
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
              url: JSON.parse(xhr.responseText).obj
            })
            return false
          }

          const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
          }

          const errorFn = (response) => {
            console.log('response-error', response)
            // 上传发生错误时调用param.error
            param.error({
              msg: 'unable to upload.'
            })
          }

          xhr.upload.addEventListener('progress', progressFn, false)
          xhr.addEventListener('load', successFn, false)
          xhr.addEventListener('error', errorFn, false)
          xhr.addEventListener('abort', errorFn, false)

          fd.append('file', param.file)
          console.log('fd', fd)
          xhr.open('POST', serverURL, true)
          xhr.send(fd)
        }
      }
    }
    // const { getFieldDecorator } = this.props.form
    return (
      <div className="list">
        <Form>
          <FormItem label="标题" hasFeedback {...formItemLayout}>
            <Input onChange={this.handleTieleChange} placeholder="请输入单号前缀!" />
          </FormItem>
          <FormItem label="正文" hasFeedback {...formItemLayout}>
            <BraftEditor {...editorProps} />
            {/* <BraftEditor {...editorProps} /> */}
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
