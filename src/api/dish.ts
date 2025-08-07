import request from '@/utils/request'
/**
 *
 * 料理管理
 *
 **/
// リストクエリインターフェース
export const getDishPage = (params: any) => {
  return request({
    url: '/dish/page',
    method: 'get',
    params
  })
}

// 削除インターフェース
export const deleteDish = (ids: string) => {
  return request({
    url: '/dish',
    method: 'delete',
    params: { ids }
  })
}

// 修正インターフェース
export const editDish = (params: any) => {
  return request({
    url: '/dish',
    method: 'put',
    data: { ...params }
  })
}

// 新規インターフェース
export const addDish = (params: any) => {
  return request({
    url: '/dish',
    method: 'post',
    data: { ...params }
  })
}

// 詳細クエリ
export const queryDishById = (id: string | (string | null)[]) => {
  return request({
    url: `/dish/${id}`,
    method: 'get'
  })
}

// 料理カテゴリリスト取得
export const getCategoryList = (params: any) => {
  return request({
    url: '/category/list',
    method: 'get',
    params
  })
}

// 料理リストクエリインターフェース
export const queryDishList = (params: any) => {
  return request({
    url: '/dish/list',
    method: 'get',
    params
  })
}

// ファイルダウンロードプレビュー
export const commonDownload = (params: any) => {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    url: '/common/download',
    method: 'get',
    params
  })
}

// 販売開始/停止---一括販売開始/停止インターフェース
export const dishStatusByStatus = (params: any) => {
  return request({
    url: `/dish/status/${params.status}`,
    method: 'post',
    params: { id: params.id }
  })
}

//料理カテゴリデータクエリ
export const dishCategoryList = (params: any) => {
  return request({
    url: `/category/list`,
    method: 'get',
    params: { ...params }
  })
}
