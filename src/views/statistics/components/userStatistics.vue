<template>
  <div class="container">
    <h2 class="homeTitle">ユーザー統計</h2>
    <div class="charBox">
      <div id="usermain" style="width: 100%; height: 320px"></div>
      <ul class="orderListLine user">
        <li class="one"><span></span>ユーザー総数（人）</li>
        <li class="three"><span></span>新規ユーザー数（人）</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
@Component({
  name: 'UserStatistics',
})
export default class extends Vue {
  @Prop() private userdata!: any
  @Watch('userdata')
  getData() {
    this.$nextTick(() => {
      this.initChart()
    })
  }
  initChart() {
    type EChartsOption = echarts.EChartsOption
    const chartDom = document.getElementById('usermain') as any
    const myChart = echarts.init(chartDom)
    var option: any
    option = {
      // legend: {
      //   itemHeight: 3, //凡例の高さ
      //   itemWidth: 12, //凡例の幅
      //   icon: 'rect', //凡例
      //   show: true,
      //   top: 'bottom',
      //   data: ['ユーザー総数', '新規ユーザー'],
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
        data: this.userdata.dateList, //バックエンドから渡される動的データ
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          //max: 500,
          //interval: 100,
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
          name: 'ユーザー総数',
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

          data: this.userdata.totalUserList,
        },
        {
          name: '新規ユーザー',
          type: 'line',
          // stack: 'Total',
          smooth: false, //平滑曲線にするかどうか
          showSymbol: false, //マウスオーバー時の点を非表示
          symbolSize: 10, //点のサイズ
          // symbol:"circle", //折れ線グラフの点を実心点に設定
          itemStyle: {
            normal: {
              color: '#FD7F7F',
              fontWeigth: 300,
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

          data: this.userdata.newUserList,
        },
      ],
    }
    option && myChart.setOption(option)
  }
}
</script>
<style scoped>
</style>
