import request from '@/utils/request'
  // リストデータを取得
  export const getInformData = (params: any) => {
    return request({
      url: '/messages/page',
      method: 'get',
      params,
    },)
  }
  // 未読件数を取得
  export const getCountUnread = () => {
    return request({
      url: '/messages/countUnread',
      method: 'get'
    },)
  }
  // すべて既読にする
  export const batchMsg = (data: any) => {
    return request({
      url: '/messages/batch',
      method: 'put',
      data
    })
  }
    // 既読にする
    export const setStatus = (params: any) => {
      return request({
        url: `/messages/${params}`,
        method: 'PUT'
      })
    }
