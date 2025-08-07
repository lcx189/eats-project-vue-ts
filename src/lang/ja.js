import ja from 'element-ui/lib/locale/lang/ja'

export default {
  el: {
    ...ja.el,
    pagination: {
      goto: '前往',
      pagesize: '件/ページ',
      total: '総数 {total} 件',
      pageClassifier: 'ページ'
    },
    table: {
      emptyText: 'データなし',
      confirmFilter: '確認',
      resetFilter: 'リセット',
      clearFilter: 'すべて',
      sumText: '合計'
    },
    messagebox: {
      confirm: '確認',
      cancel: 'キャンセル',
      error: '入力エラー'
    },
    upload: {
      deleteTip: 'deleteキーを押して削除',
      delete: '削除',
      preview: 'プレビュー',
      continue: '続行'
    }
  }
}

