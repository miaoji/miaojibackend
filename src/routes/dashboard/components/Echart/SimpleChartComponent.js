import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'
import { time } from '../../../../utils'

const SimpleChartComponent = ({receviceData, sendData}) => {
  console.log('receviceData123123', receviceData)
  console.log('sendData121312', sendData)
  const dataname = time.getLineTime()
  let labelShow = true
  const option = {
    backgroundColor: '#fff',
    color: ['#f0f','#90f', '#09f', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    title: {
      text: '堆叠区域图',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['揽件', '派件'],
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},// 平铺于堆叠的切换
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
          interval: 0
        },
        type: 'category',
        boundaryGap: false,
        data: dataname
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '派件',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
              show: true,
              rotate: '36'
          }
        },
        data: receviceData
      },
      {
        name: '揽件',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
              show: true,
              rotate: '36'
          }
        },
        data: sendData
      }
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


export default SimpleChartComponent