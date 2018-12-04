import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import './theme/macarons.js'

const PieChart = ({ data }) => {
  console.log('data', data)
  const optionData = [
    { value: data.someCargo, name: '点货数' },
    { value: data.scheduledReceipt, name: '入库数' },
    { value: data.signingVolume, name: '签收数' },
  ]
  const option = {
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}, // 下载按钮
      },
    },
    title: {
      text: '业务量统计汇总',
      subtext: '统计截至到前一天23:59:59',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} | {d}%',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'middle',
      data: ['点货数', '入库数', '签收数'],
    },
    color: ['#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: optionData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return (
    <div className="examples">
      <div className="parent">
        <ReactEcharts
          option={option}
          style={{ height: '350px', width: '100%' }}
          className="react_for_echarts"
          theme="default"
        />
      </div>
    </div>
  )
}

PieChart.propTypes = {
  data: PropTypes.object,
}

export default PieChart
