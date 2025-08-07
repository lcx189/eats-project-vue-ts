<template>
  <div class="container">
    <h2 class="homeTitle">売上統計</h2>
    <div class="charBox">
      <div id="main" style="width: 100%; height: 320px"></div>
      <ul class="orderListLine turnover">
        <li>売上(円)</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
@Component({
  name: 'TurnoverStatistics',
})
export default class extends Vue {
  @Prop() private turnoverdata!: any
  @Watch('turnoverdata')
  getData() {
    this.$nextTick(() => {
      this.initChart()
    })
  }
  initChart() {
    type EChartsOption = echarts.EChartsOption
    const chartDom = document.getElementById('main') as any
    const myChart = echarts.init(chartDom)

    var option: any
    option = {
      // title: {
      //   text: '売上(円)',
      //   top: 'bottom',
      //   left: 'center',
      //   textAlign: 'center',
      //   textStyle: {
      //     fontSize: 12,
      //     fontWeight: 'normal',
      //   },
      // },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '5%',
        left: '10',
        right: '50',
        bottom: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          //X軸のフォント色
          textStyle: {
            color: '#666',
            fontSize: '12px',
          },
        },
        axisLine: {
          //X軸線の色
          lineStyle: {
            color: '#E5E4E4',
            width: 1, //x軸線の幅
          },
        },
        data: this.turnoverdata.dateList, //バックエンドから渡される動的データ
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          //max: 50000,
          //interval: 1000,
          axisLabel: {
            textStyle: {
              color: '#666',
              fontSize: '12px',
            }
            // formatter: "{value} ml",//単位
          }
        }
      ],
      series: [
        {
          name: '売上',
          type: 'line',
          // stack: 'Total',
          smooth: false, //平滑曲線にするかどうか
          showSymbol: false, //マウスオーバー時の点を非表示
          symbolSize: 10,
          // symbol:"circle", //折れ線グラフの点を実心点に設定
          itemStyle: {
            normal: {
              color: '#409EFF',
              lineStyle: {
                color: '#409EFF',
              },
            },
            emphasis: {
              color: '#fff',
              borderWidth: 5,
              borderColor: '#66b1ff',
            },
          },

          data: this.turnoverdata.turnoverList,
        },
      ],
    }
    option && myChart.setOption(option)
  }
}
</script>
