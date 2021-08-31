const propList = [
  { prop: 'name', label: '部门', minWidth: '100' },
  { prop: 'leader', label: '部门领导', minWidth: '100' },
  {
    prop: 'parentId',
    label: '部门分类',
    minWidth: '100',
    slotName: 'parentId'
  },
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
  title: '部门列表',
  propList,
  showIndexColumn: false,
  showSelectColumn: true
}
