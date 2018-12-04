import React from 'react'
import propTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import '../../themes/js/macarons.js'

const PieChart = ({ dataSource }) => {
  console.log('dataSource', dataSource)
  const brands = dataSource.map(item => item.cName)
  const brandData = dataSource.map(item => ({
    value: item.count,
    name: item.cName,
  }))

  const option = {
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}, // 下载按钮
      },
    },
    title: {
      // text: '品牌统计',
      subtext: '统计截至到前一天23:59:59',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '名称: {b} <hr/> 数量: {c} <hr/>百分比: {d}%',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'middle',
      data: brands,
    },
    color: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e062ae', '#e690d1'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '70%',
        center: ['50%', '60%'],
        data: brandData,
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
    <ReactEcharts
      option={option}
      style={{ height: '600px', width: '80%', margin: 'auto' }}
      theme="default"
    />
  )
}

PieChart.propTypes = {
  dataSource: propTypes.array,
}

export default PieChart
