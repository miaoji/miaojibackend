import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'

const PieChart = () => {
  const option = {
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}, // 下载按钮
      },
    },
    title: {
      text: '业务统计汇总',
      subtext: '统计截至世界为前一天23:59:59',
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
      data: ['点货数', '入库数', '签收数', '退回数'],
    },
    color: ['#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 324455, name: '点货数' },
          { value: 456887, name: '入库数' },
          { value: 456885, name: '签收数' },
          { value: 1222, name: '退回数' },
        ],
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
}

export default PieChart
