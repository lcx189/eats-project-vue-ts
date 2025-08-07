import request from '@/utils/request'
// パスワードを変更
export const editPassword = (data: any) =>
  request({
    'url': '/employee/editPassword',
    'method': 'put',
    data
  })
  // 営業状態を取得
  export const getStatus = () =>
  request({
    'url': `/shop/status`,
    'method': 'get'
  })
    // 営業状態を設定
    export const setStatus = (data:any) =>
    request({
      'url': `/shop/`+data,
      'method': 'put',
      'data':data
    })
