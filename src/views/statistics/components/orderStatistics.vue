<template>
  <div class="container">
    <h2 class="homeTitle">注文統計</h2>
    <div class="charBox">
      <div class="orderProportion">
        <div>
          <p>注文完了率</p>
          <p>{{ (orderdata.orderCompletionRate * 100).toFixed(1) }}%</p>
        </div>
        <div class="symbol">=</div>
        <div>
          <p>有効注文</p>
          <p>{{ orderdata.validOrderCount }}</p>
        </div>
        <div class="symbol">/</div>
        <div>
          <p>注文総数</p>
          <p>{{ orderdata.totalOrderCount }}</p>
        </div>
      </div>
      <div id="ordermain" style="width: 100%; height: 300px"></div>
      <ul class="orderListLine">
        <li class="one"><span></span>注文総数（個）</li>
        <li class="three"><span></span>有効注文（個）</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
@Component({
  name: 'OrderStatistics',
})
export default class extends Vue {
  @Prop() private orderdata!: any
  @Prop() private overviewData!: any

  @Watch('orderdata')
  getData() {
    this.$nextTick(() => {
      this.initChart()
    })
  }
  initChart() {
    type EChartsOption = echarts.EChartsOption
    const chartDom = document.getElementById('ordermain') as any
    const myChart = echarts.init(chartDom)
    // // x軸のデータをループ処理
    // const baseDate = this.orderdata.list.map((item) => {
    //   return (item as any).date
    // })
    // const baseAmount = this.orderdata.list.map((item) => {
    //   return (item as any).amount
    // })
    // const baseValidNum = this.orderdata.list.map((item) => {
    //   return (item as any).accomplishNum
    // })
    // const baseAccomplishNum = this.orderdata.list.map((item) => {
    //   return (item as any).accomplishNum
    // })
    console.log(this.orderdata)
    var option: any
    option = {
      // legend: {
      //   itemHeight: 3, //凡例の高さ
      //   itemWidth: 12, //凡例の幅
      //   icon: 'rect', //凡例
      //   show: true,
      //   top: 'bottom',
      //   data: ['注文完了率', '有効注文', '注文総数'],
      // },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff', //背景色（デフォルト色）
        borderRadius: 2, //角丸
        textStyle: {
          color: '#333', //フォント色
          fontSize: 12, //フォントサイズ
          fontWeight: 300,
        },
      },
      grid: {
        top: '5%',
        left: '20',
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
        data: this.orderdata.data.dateList, //バックエンドから渡される動的データ
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          //max: 500,
          interval: 50,
          axisLabel: {
            textStyle: {
              color: '#666',
              fontSize: '12px',
            },
            // formatter: "{value} ml",//単位
          },
        }, //左側の値
      ],
      series: [
        {
          name: '注文総数',
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
              borderColor: '#409EFF',
            },
          },

          data: this.orderdata.data.orderCountList,
        },
        {
          name: '有効注文',
          type: 'line',
          // stack: 'Total',
          smooth: false, //平滑曲線にするかどうか
          showSymbol: false, //マウスオーバー時の点を非表示
          symbolSize: 10, //点のサイズ
          // symbol:"circle", //折れ線グラフの点を実心点に設定
          itemStyle: {
            normal: {
              color: '#FD7F7F',
              lineStyle: {
                color: '#FD7F7F',
              },
            },
            emphasis: {
              // 点の色
              color: '#fff',
              borderWidth: 5,
              borderColor: '#FD7F7F',
            },
          },

          data: this.orderdata.data.validOrderCountList,
        }
      ],
    }
    option && myChart.setOption(option)
  }
}
</script>
