const propList = [
  { prop: 'name', label: '分类名称', minWidth: '100' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '250',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '250',
    slotName: 'updateAt'
  },
  { label: '操作', minWidth: '200', slotName: 'handler' }
]

export const listTableConfig = {
  title: '分类列表',
  propList,
  showIndexColumn: true,
  showSelectColumn: false
}
