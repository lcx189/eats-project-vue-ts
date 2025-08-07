import request from '@/utils/request';
/**
 *
 * 分類管理
 *
 **/

// 分類リストのクエリインターフェース
export const getCategoryPage = (params: any) => {
  return request({
    url: '/category/page',
    method: 'get',
    params
  });
};

// 現在の行の削除インターフェース
export const deleCategory = (ids: string) => {
  return request({
    url: '/category',
    method: 'delete',
    params: { id:ids }
  });
};

// 修正インターフェース
export const editCategory = (params: any) => {
  return request({
    url: '/category',
    method: 'put',
    data: { ...params }
  });
};

// 新規インターフェース
export const addCategory = (params: any) => {
  return request({
    url: '/category',
    method: 'post',
    data: { ...params }
  });
};

// 修正---有効/無効インターフェース
export const enableOrDisableEmployee = (params: any) => {
  return request({
    url: `/category/status/${params.status}`,
    method: 'post',
    params: { id:params.id }
  })
}
