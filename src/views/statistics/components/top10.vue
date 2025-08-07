<template>
  <div class="container top10">
    <h2 class="homeTitle">売上ランキングTOP10</h2>
    <div class="charBox">
      <div id="top" style="width: 100%; height: 380px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
@Component({
  name: 'Top',
})
export default class extends Vue {
  @Prop() private top10data!: any
  @Watch('top10data')
  getData() {
    this.$nextTick(() => {
      this.initChart()
    })
  }
  initChart() {
    type EChartsOption = echarts.EChartsOption
    const chartDom = document.getElementById('top') as any
    const myChart = echarts.init(chartDom)
    var option: any
    option = {
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
        top: '-10px',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        //   y軸の座標軸を非表示
        axisLine: {
          show: false,
        },
        // y軸の目盛り線を非表示
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        type: 'category',
        // interval: 100,
        axisLabel: {
          textStyle: {
            color: '#666',
            fontSize: '12px',
          },
          // formatter: "{value} ml",//単位
        },
        data: this.top10data.nameList,
      },
      series: [
        {
          data: this.top10data.numberList,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: '#F3F4F7',
          },
          barWidth: 20,
          barGap: '80%' /*複数の並列棒グラフの棒の間隔を設定*/,
          barCategoryGap: '80%' /*複数の並列棒グラフの棒の間隔を設定*/,

          itemStyle: {
            emphasis: {
              barBorderRadius: 30,
            },
            normal: {
              barBorderRadius: [0, 10, 10, 0], // 角丸
              color: new echarts.graphic.LinearGradient( // グラデーション
                1,
                0,
                0,
                0, // グラデーションの開始/終了位置、右/下/左/上
                [
                  // offset 位置
                  { offset: 0, color: '#409EFF' },
                  { offset: 1, color: '#66b1ff' },
                ]
              ),
              label: {
                //内容のスタイル
                show: true,
                formatter: '{@score}',
                color: '#fff',
                // position: "insideLeft", //内部左揃え
                position: ['8', '5'], //カスタム位置、最初のパラメータはx軸方向、2番目のパラメータはy軸方向、左上隅が原点、右下が正、左上が負
              },
            },
          },
          // label: {
          //   show: true,
          //   position: "left",
          //   valueAnimation: true,
          // },
        },
      ],
    }
    option && myChart.setOption(option)
  }
}
</script>
