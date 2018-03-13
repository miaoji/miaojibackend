import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'
import { time } from '../../utils'

const SimpleChartComponent = () => {
  const dataname = time.getLineTime()
  let labelShow = true
  const option = {
    backgroundColor: '#fff',
    color: ['#f00','#90f', '#09f', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    title: {
      text: '堆叠区域图',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['门店', '个人', '商场'],
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
      left: '2%',
      right: '2%',
      bottom: '2%',
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
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日','周一', '周二', '周三', '周四', '周五', '周六', '周日','周一', '周二', '周三', '周四', '周五', '周六', '周日','周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        name: '门店',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
              show: true,
              rotate: '36'
          }
        },
        data: [['2018-02-11', 100],['2018-02-12', 123],['2018-02-14', 100],['2018-02-15', 123],['2018-02-16', 343],['2018-02-17', 435]],
      },
      {
        name: '个人',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
              show: true,
              rotate: '36'
          }
        },
        data: [150, 20,30, 232, 201, 154, 565, 330, 410,150, 232, 201, 154, 565, 330, 410,150, 232, 201, 154, 565, 330, 410,150, 232, 201, 154, 565, 330, 410],
      },
      {
        name: '商场',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
              show: true,
              rotate: '36'
          }
        },
        data: [120, 1000,10,30, 101, 134, 90, 230, 210,120, 1000, 101, 134, 90, 230, 210,120, 1000, 101, 134, 90, 230, 210,120, 1000, 101, 134, 90, 230, 210],
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


export default SimpleChartComponent
