import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

class List extends React.Component {

  state = {
    htmlContent: ''
  }

  handleHTMLChange = (htmlContent) => {
    this.setState({ htmlContent })
  }

  render() {
    const editorProps = {
      placeholder: '你好!',
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
          component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>
        }, {
          type: 'button',
          text: '提交',
          className: 'preview-button',
          onClick: () => {
            console.log('this.state.htmlContent', this.state.htmlContent)
          }
        }
      ],
      media: {
        // 图片上传功能
        uploadFn: (param) => {
          const api = 'http://php.winnerwly.top'
          // const api = 'http://127.0.0.1'
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
              url: `${api}${xhr.responseText}`
              // url: 'http://pic4.nipic.com/20091217/3885730_124701000519_2.jpg'
            })
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

    return (
      <div className="list">
        <BraftEditor {...editorProps} />
      </div>
    )
  }

}

// List.propTypes = {
//   onDeleteItem: PropTypes.func,
//   onEditItem: PropTypes.func,
//   location: PropTypes.object,
// }

export default List
