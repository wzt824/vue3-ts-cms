const propList = [
  { prop: 'name', label: '菜单名称', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '80', slotName: 'type' },
  { prop: 'url', label: '菜单url', minWidth: '100' },
  { prop: 'icon', label: '菜单icon', minWidth: '100' },
  { prop: 'permission', label: '按钮权限', minWidth: '100' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '220',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '220',
    slotName: 'updateAt'
  },
  { label: '操作', minWidth: '200', slotName: 'handler' }
]

export const listTableConfig = {
  title: '菜单列表',
  propList,
  showIndexColumn: false,
  showSelectColumn: true,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
