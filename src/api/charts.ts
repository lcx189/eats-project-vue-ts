import request from '@/utils/request'
/**
 *
 * レポートデータ
 *
 **/

// 当日の売上データを取得 -> トップデータ
export const getDataes = (params: any) =>
  request({
    'url': `/report/amountCollect/${params.date}`,
    'method': 'get'
  })

// 当日の売上データを取得 -> トップデータ - 収益概要
export const getChartsDataes = (params: any) =>
  request({
    'url': `/report/dayCollect/${params.start}/${params.end}`,
    'method': 'get'
  })

// 当日の売上トレンドデータを取得（24時間）-> 売上トレンド
export const getDayDataes= (params: any) =>
  request({
    'url': `/report/hourCollect/${params.type}/${params.date}`,
    'method': 'get'
  })

// 支払タイプデータ集計 -> 店内入金構成 - 当日
export const getDayPayType = (params: any) =>
  request({
    'url': `/report/payTypeCollect/${params.date}`,
    'method': 'get'
  })
// 当日の各種割引タイプデータ集計 -> 割引指標
export const getprivilege = (params: any) =>
  request({
    'url': `/report/privilegeCollect/${params.date}`,
    'method': 'get'
  })

// 料理カテゴリ売上ランキングを取得 - 料理カテゴリ比率 - 当日
export const getSalesRanking = (params: any) =>
  request({
    'url': `/report/categoryCollect/${params.type}/${params.date}`,
    'method': 'get'
  })

// 当日の料理売上ランキングを取得
export const getDayRanking = (params: any) =>
  request({
    'url': `/report/currentDishRank/${params.date}`,
    'method': 'get'
  })

// 指定期間内の売上トレンドを取得 - 売上トレンドグラフ
export const getTimeQuantumDataes = (params: any) =>
  request({
    'url': `/report/dayAmountCollect/${params.type}/${params.start}/${params.end}`,
    'method': 'get'
  })

// 時間範囲内の各種支払タイプデータ集計 -> 店内入金構成 - 時間帯
export const getTimeQuantumReceivables = (params: any) =>
  request({
    'url': `/report/datePayTypeCollect/${params.start}/${params.end}`,
    'method': 'get'
  })

// 時間範囲内の料理カテゴリ売上集計 -> 料理カテゴリ比率 - 時間帯
export const getTimeQuantumType = (params: any) =>
  request({
    'url': `/report/dateCategoryCollect/${params.type}/${params.start}/${params.end}`,
    'method': 'get'
  })

// 時間範囲内の料理売上ランキング -> 料理売上ランキング
export const getTimeQuantumDishes = (params: any) =>
  request({
    'url': `/report/dishRankForDate/${params.start}/${params.end}`,
    'method': 'get'
  })

// 時間範囲内の割引指標集計データ -> トップ情報
export const getTimeQuantumDiscount = (params: any) =>
  request({
    'url': `/report/privilegeByDate/${params.start}/${params.end}`,
    'method': 'get'
  })
