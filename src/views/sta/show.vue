<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="用户登录数统计" value="login_num"/>
          <el-option label="用户注册数统计" value="register_num"/>
          <el-option label="课程播放数统计" value="video_view_num"/>
          <el-option label="每日课程数统计" value="course_num"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>
  <div class="chart-container">
      <div id="chart2" class="chart" style="height:500px;width:100%" />
    </div>
    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>
  
  </div>
</template>
<script>
import echarts from 'echarts'
import staApi from '@/api/sta'

export default {
    data() {
        return {
            searchObj:{},
            btnDisabled:false,
            xData:[],
            yData:[],
            
        }
    },
    methods:{
        showChart() {
            staApi.getDataSta(this.searchObj)
                .then(response => {
                    console.log('*******'+response+'*******')
                    this.yData = response.data.typeList
                    this.xData = response.data.dateList

                    //调用下面生成图表的方法，改变值
                    this.setChart()
                    this.setChart2()
                })
        },
        setChart() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(document.getElementById('chart'))
            // console.log(this.chart)

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '数据统计--折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [
                        0
                    ],
                    bottom: 30,
                    start: 10,
                    end: 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: '#d3dee5'

                    },
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: '#90979c'
                    },
                    {
                    type: 'inside',
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                 }],
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: this.xData
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value'
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    data: this.yData,
                    // 折线图
                    type: 'line'
                }]
            }

            this.chart.setOption(option)
        },
        setChart2(){
            this.chart = echarts.init(document.getElementById('chart2'))
            // var yMax = 500;
            var dataShadow = [];

            // for (var i = 0; i <  this.xData.length; i++) {
            //     dataShadow.push(yMax);
            // }
            var option = {
                title: {
                    text: '数据统计--柱形图',
                    //subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
                },
                xAxis: {
                    data: this.xData,
                    axisLabel: {
                        // inside: true,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: this.yData,
                    }
                ]
            };

            // Enable data zoom when user click bar.
            // var zoomSize = 6;
            // this.chart.on('click', function (params) {
            //     //console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            //     myChart.dispatchAction({
            //         type: 'dataZoom',
            //         startValue: this.xData[Math.max(params.dataIndex - zoomSize / 2, 0)],
            //         endValue: this.xData[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            //     });
            // });
            this.chart.setOption(option)
        }





    }
}
</script>
