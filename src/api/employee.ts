import request from '@/utils/request'
/**
 *
 * 员工管理
 *
 **/
// ログイン、
export const login = (data: any) =>
  request({
    'url': '/employee/login',
    'method': 'post',
    data
  })
  // 退出
 export const userLogout = (params: any) =>
 request({
   'url': `/employee/logout`, // 従業員管理インターフェース
   'method': 'post',
   params
 })

export const getEmployeeList = (params: any) => {
  return request({
    url: '/employee/page',
    method: 'get',
    params
  })
}

// 変更---有効無効インターフェース
export const enableOrDisableEmployee = (params: any) => {
  return request({
    url: `/employee/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
}

// 新規追加---従業員を追加
export const addEmployee = (params: any) => {
  return request({
    url: '/employee',
    method: 'post',
    data: { ...params }
  })
}

// 変更---従業員を変更
export const editEmployee = (params: any) => {
  return request({
    url: '/employee',
    method: 'put',
    data: { ...params }
  })
}

// 変更ページ逆検索詳細インターフェース
export const queryEmployeeById = (id: string | (string | null)[]) => {
  return request({
    url: `/employee/${id}`,
    method: 'get'
  })
}
