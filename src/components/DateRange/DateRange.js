import { DatePicker, Form } from 'antd'

class DateRange extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startValue: props.startValue,
      endValue: props.endValue,
      endOpen: false,
      size:props.size
    }
  }
  componentWillReceiveProps(props){
    if (props.value.length != 2) {
      this.setState({
        startValue:null,
        endValue:null
      })
    }
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
    
    if (field == 'endValue') {
      this.props.onChange([this.state.startValue,value],'createTime')
    }
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
    console.log('我修改了结束时间的值')
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="开始时间"
          showToday={false}
          size={this.state.size}
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        &nbsp;&nbsp;&nbsp;
          <DatePicker
          disabledDate={this.disabledEndDate}
          showToday={false}
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="结束时间"
          size={this.state.size}
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    )
  }
}

export default Form.create()(DateRange)