import request from '@/utils/request'
// 売上データ
// export const getTurnoverDataes = (data) =>
//   request({
//     'url': `/report/turnoverStatistics`,
//     'method': 'get',
//     data
//   })
// ホームページデータ
// // 今日のデータ
// export const getTodayDataes = () =>
//   request({
//     'url': `/workspace/todaydate`,
//     'method': 'get'
//   })
// 注文管理
  export const getOrderData = () =>
  request({
    'url': `/workspace/overviewOrders`,
    'method': 'get'
  })
// 料理一覧
export const getOverviewDishes = () =>
request({
  'url': `/workspace/overviewDishes`,
  'method': 'get'
})
// セットメニュー一覧
export const getSetMealStatistics = () =>
request({
  'url': `/workspace/overviewSetmeals`,
  'method': 'get'
})
// 営業データ
export const getBusinessData= () =>
request({
  'url': `/workspace/businessData`,
  'method': 'get'
})
/**
 *
 * レポートデータ
 *
 **/
// 統計
// 当日の売上データを取得 -> トップデータ
// export const getDataes = (params: any) =>
//   request({
//     'url': `/report/amountCollect/${params.date}`,
//     'method': 'get'
//   })


// 売上統計
export const getTurnoverStatistics= (params: any) =>
  request({
    'url': `/report/turnoverStatistics`,
    'method': 'get',
    params
  })

// ユーザー統計
export const getUserStatistics= (params: any) =>
  request({
    'url': `/report/userStatistics`,
    'method': 'get',
    params
  })
  // 注文統計
export const getOrderStatistics= (params: any) =>
request({
  'url': `/report/ordersStatistics`,
  'method': 'get',
  params
})
  // 売上ランキングTOP10
  export const getTop= (params: any) =>
  request({
    'url': `/report/top10`,
    'method': 'get',
    params
  })
  // データ概要
  export const getDataOverView= (params: any) =>
  request({
    'url': `/report/dataOverView`,
    'method': 'get',
    params
  })
  // エクスポート
  export function exportInfor() {
    return request({
      url: '/report/export',
      method: 'get',
      responseType: "blob"
    })
  }
