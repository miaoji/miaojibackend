import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import './theme/macarons.js'

const operationChart = ({ operationData, operationDatetime, loading }) => {
  const { storageData, signData } = operationData
  const option = {
    backgroundColor: '#fff',
    color: ['#f0f', '#90f', '#09f', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    title: {
      text: '业务操作统计',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['入库', '签收'],
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] }, // 平铺于堆叠的切换
        restore: { show: true },
        saveAsImage: {}, // 下载按钮
      },
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      containLabel: true,
    },
    xAxis: [
      {
        axisLabel: {
          rotate: 30,
          interval: 0,
        },
        type: 'category',
        boundaryGap: false,
        data: [...operationDatetime, ''],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '入库',
        type: 'line',
        smooth: false,
        label: {
          normal: {
            show: true,
            rotate: '36',
          },
        },
        data: storageData,
      }, {
        name: '签收',
        type: 'line',
        smooth: false,
        label: {
          normal: {
            show: true,
            rotate: '36',
          },
        },
        data: signData,
      },
    ],
  }
  return (
    <div className="examples">
      <div className="parent" style={{ minWidth: '1200px' }}>
        <Spin spinning={loading} tip="数据加载中,请稍等...">
          <ReactEcharts
            option={option}
            style={{ height: '350px', width: '100%' }}
            className="react_for_echarts"
            theme="default"
          />
        </Spin>
      </div>
    </div>
  )
}

operationChart.propTypes = {
  operationData: PropTypes.array,
  operationDatetime: PropTypes.array,
  loading: PropTypes.bool,
}

export default operationChart