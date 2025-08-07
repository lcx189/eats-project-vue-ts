import request from '@/utils/request'

// リストページクエリインターフェース
export const getOrderDetailPage = (params: any) => {
  return request({
    url: '/order/conditionSearch',
    method: 'get',
    params
  })
}

// 表示インターフェース
export const queryOrderDetailById = (params: any) => {
  return request({
    url: `/order/details/${params.orderId}`,
    method: 'get'
  })
}

// 配送インターフェース
export const deliveryOrder = (params: any) => {
  return request({
    url: `/order/delivery/${params.id}`,
    method: 'put' /*  */
  })
}
//完了インターフェース
export const completeOrder = (params: any) => {
  return request({
    url: `/order/complete/${params.id}`,
    method: 'put' /*  */
  })
}

//注文キャンセル
export const orderCancel = (params: any) => {
  return request({
    url: '/order/cancel',
    method: 'put' /*  */,
    data: { ...params }
  })
}

//受注
export const orderAccept = (params: any) => {
  return request({
    url: '/order/confirm',
    method: 'put' /*  */,
    data: { ...params }
  })
}

//拒否
export const orderReject = (params: any) => {
  return request({
    url: '/order/rejection',
    method: 'put' /*  */,
    data: { ...params }
  })
}

//処理待ち、配送待ち、配送中数量を取得
export const getOrderListBy = (params: any) => {
  return request({
    url: '/order/statistics',
    method: 'get' /*  */
  })
}
